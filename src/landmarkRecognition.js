import React, { useState, useEffect } from "react";
import storage from "./config";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import detectLandmarks from "./cloudVisionApi";
import { GetLocationData } from "./LocationDetails";
import BoldBetweenAsterisks from "./BoldBetweenAsterisks";

const LandmarkRecognition = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [landmarks, setLandmarks] = useState("Location not found");
  const [landmarkInfo, setLandmarkInfo] = useState("");
  const [modelData, setModelData] = useState("Uploading the image!");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // ...

      // ...
    }
  };
  const uploadImage = async () => {
    if (image) {
      setModelData("Uploading the image!");
      setModalVisible(true);
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + Date.now() + ".jpg");

      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      console.log("Image uploaded successfully!");
      const url = await getDownloadURL(storageRef);
      console.log("File available at", url);
      try {
        const landmarks = await detectLandmarks(url);
        console.log("Landmarks:", landmarks);
        setLandmarks(landmarks.join(", "));
      } catch (error) {
        console.error("Error detecting landmarks:", error);
      }
      setModalVisible(false);
    }
  };
  const getLandmarkInfo = async (location) => {
    setModelData("Finding location Info");
    setModalVisible(true);
    const info = await GetLocationData(location);
    setLandmarkInfo(info);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("./assets/home.jpg")}
      style={styles.outerContainer}
    >
      <View style={styles.container}>
        <ScrollView style={styles.ScrollView}>
          <Text>{"\n"}</Text>
          <Text style={styles.title}>TRAVEL mate</Text>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
          <Button title="Upload Image" onPress={uploadImage} />

          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{landmarks}</Text>
          </View>
          <View>
            {landmarks !== "Location not found" ? (
              <Button
                title="Get Info"
                onPress={() => getLandmarkInfo(landmarks)}
              />
            ) : null}
            <Text>
              <BoldBetweenAsterisks text={landmarkInfo} />
            </Text>
          </View>
        </ScrollView>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>{modelData}</Text>
            <Text>Please wait......</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(./assets/home.jpg)",
  },
  container: {
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 20,
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    width: "90%",
    height: "90%",
  },
  ScrollView: {
    width: "100%",
    padding: 20,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
    fontFamily: "sans-serif-condensed",
  },
  label: {
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 8,
  },
  input: {
    height: 50,
    paddingLeft: 20,
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 20,
    width: "100%",
    //padding: 20,
    borderRadius: 8,
  },
  picker: {
    height: 4,
    width: "200%",
  },
  resultContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    paddingLeft: 60,
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 20,
    padding: 20,
    width: "100%",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 25,
    backgroundColor: "blue", // Example background color
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default LandmarkRecognition;

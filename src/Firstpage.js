
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, StatusBar,ImageBackground,TouchableOpacity,Modal,ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Background from "./Background";
import planTrip from './api';
import BoldBetweenAsterisks from "./BoldBetweenAsterisks";

const Firstpage = () => {
  const [country, setCountry] = useState('');
  const [days, setDays] = useState('');
  const [plan, setPlan] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [people, setPeople] = useState('');
  const [budget, setBudget] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);  
  const [modalVisible, setModalVisible] = useState(false);

  
  async function handlePlanTrip() {
    setModalVisible(true);
    setIsButtonDisabled(true);
    const response = await planTrip(days, selectedMonth, people, budget); // Call the function from api.js
    setPlan("👋Hey there!\nI'm Travel mate tour guide✈️\n" + response + '\n\nEnjoy a wonderful trip!');
    setIsButtonDisabled(false);
    setModalVisible(false);
  }
  
    
return (
    //<Background/>
    
<ImageBackground source={require("./assets/home.jpg")} style={styles.outerContainer}>
<View style={styles.container}>
<ScrollView style={styles.ScrollView}>
    <Text>{'\n'}</Text>

    <Text style={styles.title}>TRAVEL mate</Text>
    <Text style={styles.label}>Numer of people:</Text>
    <TextInput
      style={styles.input}
      placeholder='Enter the number of people'
      onChangeText={(text) => setPeople(text)}
      keyboardType='numeric'
    
    />

    <Text style={styles.label}>budget:</Text>
    <TextInput
      style={styles.input}
      placeholder='Enter the per person budget in USD'
      onChangeText={(text) => setBudget(text)}
      keyboardType='numeric'
    />

    <Text style={styles.label}>Number of days:</Text>
    <TextInput
      style={styles.input}
      placeholder='Enter number of days'
      onChangeText={(text) => setDays(text)}
      keyboardType='numeric'
    />
    <Text style={styles.label}>Select a month:</Text>
    <Picker
      style={styles.picker}
      selectedValue={selectedMonth}
      onValueChange={(itemValue) => setSelectedMonth(itemValue)}
    >
      <Picker.Item label='January' value='January' />
      <Picker.Item label='February' value='February' />
      <Picker.Item label='March' value='March' />
      <Picker.Item label='April' value='April' />
      <Picker.Item label='May' value='May' />
      <Picker.Item label='June' value='June' />
      <Picker.Item label='July' value='July' />
      <Picker.Item label='August' value='August' />
      <Picker.Item label='September' value='September' />
      <Picker.Item label='October' value='October' />
      <Picker.Item label='November' value='November' />
      <Picker.Item label='December' value='December' />

      {/* Add the rest of the months */}
    </Picker>
    <StatusBar style='auto' />
    
    <TouchableOpacity 
  style={styles.button}
  onPress={handlePlanTrip}
  disabled={isButtonDisabled}
>
  <Text style={styles.buttonText}>Plan the trip</Text>
</TouchableOpacity>
    <Text></Text>
      
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}><BoldBetweenAsterisks text={plan} /></Text>
      </View>
      </ScrollView>
  </View>
  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#0000ff"/>
            <Text>Travel request is processing!</Text>
            <Text>Please wait......</Text>
          </View>
        </View>
      </Modal>
  
</ImageBackground>

  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(./assets/home.jpg)',
  },
  container: {
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 20,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    width: '90%',
    height: '90%',
    
  },
  ScrollView: {
    width: '100%',
    padding: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    fontFamily: 'sans-serif-condensed',
  },
  label: {
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 8,
  },
  input: {
    height: 50,
    paddingLeft: 20,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 20,
    width: '100%',
    //padding: 20,
    borderRadius: 8,
  },
  picker: {
    height: 4,
    width: '200%',
  },
  resultContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    paddingLeft: 60,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 20,
    padding: 20,
    width: '100%',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'blue', // Example background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  
});

export default Firstpage;

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkgreen } from "./Constants";

const Home = (props) => {
    return (
        <Background>
            <View style={{ marginHorizontal: 15, marginVertical: 200 }}>
                <Text style={{ color: 'black', fontSize: 50, fontWeight: "bold" }}>Let's Find</Text>
                <Text style={{ color: 'black', fontSize: 50, fontWeight: "bold", marginBottom: 20 }}>Your Travel Plan</Text>
                <Btn
                    bgColor={darkgreen} textColor='white' btnLabel="Start Here" Press={() => props.navigation.navigate("Login")} />
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({})

export default Home;

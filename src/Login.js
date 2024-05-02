import React from "react";
import { View, Text } from "react-native";
import Background from "./Background";
import { darkgreen } from "./Constants";
import Field from "./Field";
import Btn from "./Btn";

const Login = (props) => {
    return (
        <Background>
            <View style={{ marginHorizontal: 20, marginVertical: 60, alignItems: "center", width: 400 }} />
            <Text style={{ color: "black", paddingLeft: 130, paddingBottom: 20, fontSize: 64, fontWeight: 'bold' }}>Login</Text>
            <View style={{
                backgroundColor: 'white',
                height: 700,
                width: 400,
                borderTopLeftRadius: 120,
                paddingTop: 80,
                alignItems: 'center',

            }}>
                <Text style={{ fontSize: 40, color: darkgreen, fontWeight: 'bold' }}>
                    Welcome Back</Text>
                <Text style={{ fontSize: 19, color: "gray", fontWeight: 'bold', marginBottom: 20 }}>
                    Login to your account</Text>
                <Field placeholder="Email/ Username" keyboardType={"email-address"} />
                <Field placeholder="Password" secureTextEntry={true} />
                <View style={{ alignItems: "flex-end", width: '78%', paddingRight: 16 , marginBottom:50}}>
                    <Text style={{ color: darkgreen, fontWeight: 'bold', fontSize: 16 }}>Forgot Password</Text>
                </View>
                <Btn textColor='white' bgColor={darkgreen} btnLabel="Login"  Press={() => props.navigation.navigate("LandmarkRecognition")}/>
           
            </View>
            
           


        </Background >
    );
};


export default Login;
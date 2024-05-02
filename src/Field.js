import React from "react";
import { TextInput } from "react-native";
import { darkgreen } from "./Constants";

const Field = props => {
    return (
        <TextInput
            {...props}
            style={{ borderRadius: 100, color: darkgreen, paddingHorizontal:20, width:'80%',
        backgroundColor:'rgb(220,220,220)', marginVertical:10}}
            
            placeholderTextColor={darkgreen}
        />
    );
};

export default Field;

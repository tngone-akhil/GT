import React from "react";
import { Text, TouchableOpacity } from "react-native";


export const ButtonComponent = ({
    buttonStyle,
    textStyle,
    title,
    onPresscomponent,
  }) => {
    return (
      <TouchableOpacity style={buttonStyle} onPress={onPresscomponent}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  
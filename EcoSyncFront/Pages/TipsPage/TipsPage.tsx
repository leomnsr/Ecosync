import React from "react";
import { Pressable, Text, View } from "react-native";
import { StyleTipsPage as STP } from "./StyleTipsPage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";

export const TipsPage = () => {
  return (
    <View style={[STP.container]}>
      <Text style={[STP.title, SFC.title, SFC.textPrimaryL]}> Tips Page </Text>
    </View>
  );
};

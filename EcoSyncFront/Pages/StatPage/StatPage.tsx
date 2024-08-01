import React from "react";
import { Pressable, Text, View } from "react-native";
import { StyleStatPage as SSP } from "./StyleStatPage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import { Icon } from "@iconify/react";

export const StatPage = () => {
  return (
    <View style={[SSP.container]}>
      <Text style={[SSP.title, SFC.title, SFC.textPrimaryL]}> Stat Page </Text>
    </View>
  );
};

import React from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import { StyleTrashTab as STT } from "./StyleProfilePage";

export const TrashTab = () => (
  <View style={[SG.borderRad, SG.dropShadow, SFC.bgSecondaryL, SG.center, {height: 300}]}>
    <Text style={[SFC.title, SFC.textPrimaryL]}>Prochainement</Text>
  </View>
);
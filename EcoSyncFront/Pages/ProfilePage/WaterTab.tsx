import React, { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { UserData } from "../../SyncData/UserData";

import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import { StyleWaterTab as SWT } from "./StyleProfilePage";
import { StyleElectricityTab as SET } from "./StyleProfilePage";
import { StyleProfilePage as SPP } from "./StyleProfilePage";

import OcrIcon from "../../assets/icons/ocr.svg";
import CameraIcon from "../../assets/icons/camera.svg";

export const WaterTab = () => {
  const [inputValue, setInputValue] = useState("");
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      const consumption =
        UserData.getInstance().getConsumptionAttribute("water");
      setInputValue(consumption.toString());
      firstUpdate.current = false;
      return;
    }

    handleAddConsoWater();
    setInputValue(inputValue);
  }, [inputValue]);

  const handleAddConsoWater = async () => {
    const water = Number(inputValue);
    if (!isNaN(water)) {
      const status = UserData.getInstance().setConsumptionAttribute(
        "water",
        water
      );
    } else {
      console.log("Invalid input");
    }
  };

  return (
    <View
      style={[
        SG.borderRad,
        SG.dropShadow,
        SFC.bgSecondaryL,
        { paddingHorizontal: 12 },
      ]}
    >
      <Text
        style={[
          SFC.subtitle,
          SFC.textPrimaryL,
          { marginStart: 12, marginTop: 12 },
        ]}
      >
        Mes infos <Text style={[SFC.textSecondaryL, SFC.bold]}>eau</Text>
      </Text>
      <View style={[SWT.conso]}>
        <Text style={[SFC.textSecondaryL, SFC.text, SPP.label]}>
          Consommation -{" "}
          <Text style={[SFC.textPrimaryL, SFC.text, SPP.label]}>(L/an)</Text>
        </Text>
        <View style={[SWT.row]}>
          <TextInput
            style={SG.textInput}
            keyboardType="numeric"
            placeholderTextColor={"#FFF6F0"}
            selectionColor={"#FBD3B7"}
            onChangeText={setInputValue}
            value={inputValue.toString()}
          />
          <Pressable
            style={({ pressed }) => [
              SG.borderRad,
              !pressed ? SG.button : SG.buttonPressed,
              SG.center,
              SET.actionBtn,
            ]}
            onPress={() => console.log("OCR water")}
          >
            <OcrIcon width={24} height={24} fill={"#1F4D4D"} />
          </Pressable>
        </View>
      </View>
      <View style={[SWT.ecoWatch]}>
        <Text style={[SFC.textSecondaryL, SFC.text]}>
          EcoWatch{" "}
          <Text style={[SFC.textPrimaryL, SFC.text, SPP.label]}>
            (prochainement)
          </Text>
        </Text>
        <View style={[SWT.row]}>
          <TextInput
            style={SG.textInput}
            keyboardType="numeric"
            placeholderTextColor={"#FFF6F0"}
            selectionColor={"#FBD3B7"}
          />
          <Pressable
            style={({ pressed }) => [
              SG.borderRad,
              !pressed ? SG.button : SG.buttonPressed,
              SG.center,
              SET.actionBtn,
            ]}
            onPress={() => console.log("eco watch water")}
          >
            <CameraIcon width={24} height={24} fill={"#1F4D4D"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

import React, { useEffect, useState } from "react";
import { Pressable, Text, View, TextInput, Image } from "react-native";
import { UserData } from "../../SyncData/UserData";

import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import { StyleElectricityTab as SET } from "./StyleProfilePage";
import { StyleProfilePage as SPP } from "./StyleProfilePage";

import DeleteIcon from "../../assets/icons/delete.svg";
import OcrIcon from "../../assets/icons/ocr.svg";

export const ElectricityTab = () => {
  const [linkyNumber, setLinkyNumber] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleDeleteLinky = () => {
    UserData.getInstance().setHouseAttribute("linkyNumber", "");
    setLinkyNumber("");
  };

  const handleAddLinky = (value: string) => {
    UserData.getInstance().setHouseAttribute("linkyNumber", value);
    setLinkyNumber(value);
  };

  const handleAddConsoElec = (value: string) => {
    const electricity = Number(value);
    if (!isNaN(electricity)) {
      UserData.getInstance().setConsumptionAttribute(
        "electricity",
        electricity
      );
      setInputValue(value);
    } else {
      console.log("Invalid input");
    }
  };

  useEffect(() => {
    const fetchElecAttributes = () => {
      const consumption =
        UserData.getInstance().getConsumptionAttribute("electricity");
      const linkyNumber =
        UserData.getInstance().getHouseAttribute("linkyNumber");

      console.log(`elec attributes fetched: ${consumption}, ${linkyNumber}`);

      setInputValue(consumption.toString());
      setLinkyNumber(linkyNumber.toString());
    };

    fetchElecAttributes();
  }, []);

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
        Mes infos{" "}
        <Text style={[SFC.textSecondaryL, SFC.bold]}>électricité</Text>
      </Text>
      <View style={[SET.linky, SET.row]}>
        <View style={SET.leftContainer}>
          <View style={SET.row}>
            <Text style={[SFC.text, SFC.textSecondaryL, SPP.label]}>
              N° PRM -{" "}
            </Text>
            <Text style={[SFC.textPrimaryL, SFC.text]}>{linkyNumber}</Text>
            <Pressable
              style={({ pressed }) => [
                SG.borderRad,
                !pressed ? SG.button : SG.buttonPressed,
                SG.center,
                SET.actionBtn,
              ]}
              onPress={handleDeleteLinky}
            >
              <DeleteIcon width={24} height={24} fill={"#1F4D4D"} />
            </Pressable>
          </View>
          <View style={SET.row}>
            <TextInput
              style={SG.textInput}
              placeholder="Numéro PRM de Linky"
              keyboardType="numeric"
              placeholderTextColor={"#FFF6F0"}
              selectionColor={"#FBD3B7"}
              maxLength={14}
              onChangeText={handleAddLinky}
              value={linkyNumber}
            />
          </View>
        </View>
        <View style={SET.rightContainer}>
          <Image
            style={SET.image}
            source={require("../../assets/graphics/linky.png")}
          />
        </View>
      </View>
      <View style={[SET.conso]}>
        <Text style={[SFC.textSecondaryL, SFC.text, SPP.label]}>
          Consommation -{" "}
          <Text style={[SFC.textPrimaryL, SFC.text, SPP.label]}>(kWh/an)</Text>
        </Text>
        <View style={[SET.row]}>
          <TextInput
            style={SG.textInput}
            keyboardType="numeric"
            maxLength={14}
            selectionColor={"#FBD3B7"}
            onChangeText={handleAddConsoElec}
            value={inputValue}
          />
          <Pressable
            style={({ pressed }) => [
              SG.borderRad,
              !pressed ? SG.button : SG.buttonPressed,
              SG.center,
              SET.actionBtn,
            ]}
            onPress={() => console.log("OCR conso elec")}
          >
            <OcrIcon width={24} height={24} fill={"#1F4D4D"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

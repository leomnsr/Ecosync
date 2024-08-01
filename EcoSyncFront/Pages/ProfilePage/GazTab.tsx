import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { UserData } from "../../SyncData/UserData";

import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import { StyleGasTab as SGT } from "./StyleProfilePage";
import { StyleElectricityTab as SET } from "./StyleProfilePage";
import { StyleProfilePage as SPP } from "./StyleProfilePage";

import OcrIcon from "../../assets/icons/ocr.svg";
import UpIcon from "../../assets/icons/up.svg";
import DownIcon from "../../assets/icons/down.svg";

export const GazTab = () => {
  const [cityValue, setCityValue] = useState("");
  const [propaneValue, setPropaneValue] = useState("");
  const [bottleValue, setBottleValue] = useState("");
  const [bottleNbrValue, setBottleNbrValue] = useState("");

  const handleAddConsoCityGaz = (value: string) => {
    const gaz = Number(value);
    if (!isNaN(gaz)) {
      UserData.getInstance().setConsumptionAttribute("cityGas", gaz);
      setCityValue(value);
    } else {
      console.log("Invalid input");
    }
  };

  const handleAddConsoPropaneGaz = (value: string) => {
    const gaz = Number(value);
    if (!isNaN(gaz)) {
      UserData.getInstance().setConsumptionAttribute("propaneGas", gaz);
      setPropaneValue(value);
    } else {
      console.log("Invalid input");
    }
  };

  const handleAddConsoBottleGaz = (value: string) => {
    const gaz = Number(value);
    if (!isNaN(gaz)) {
      UserData.getInstance().setConsumptionAttribute("bottleQuantity", gaz);
      setBottleValue(value);
    } else {
      console.log("Invalid input");
    }
  };

  const handleAddConsoBottleNbr = (value: string) => {
    const gaz = Number(value);
    if (!isNaN(gaz)) {
      UserData.getInstance().setConsumptionAttribute("bottleGas", gaz);
      setBottleNbrValue(value);
    } else {
      console.log("Invalid input");
    }
  };

  useEffect(() => {
    const fetchGasAttributes = () => {
      const cityGas = UserData.getInstance().getConsumptionAttribute("cityGas");
      const propaneGas =
        UserData.getInstance().getConsumptionAttribute("propaneGas");
      const bottleQuantity =
        UserData.getInstance().getConsumptionAttribute("bottleQuantity");
      const bottleGas =
        UserData.getInstance().getConsumptionAttribute("bottleGas");

      console.log(
        `gas attributes fetched: cityGas=${cityGas}, propaneGas=${propaneGas}, bottleQuantity=${bottleQuantity}, bottleGas=${bottleGas}`
      );

      setCityValue(cityGas.toString());
      setPropaneValue(propaneGas.toString());
      setBottleValue(bottleQuantity.toString());
      setBottleNbrValue(bottleGas.toString());
    };

    fetchGasAttributes();
  }, []);

  const increment = () => {
    let value = Number(bottleNbrValue);
    if (!isNaN(value)) {
      value++;
      handleAddConsoBottleNbr(value.toString());
    } else {
      console.log("Invalid input");
    }
  };

  const decrement = () => {
    let value = Number(bottleNbrValue);
    if (!isNaN(value)) {
      value--;
      handleAddConsoBottleNbr(value.toString());
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
        Mes infos <Text style={[SFC.textSecondaryL, SFC.bold]}>gaz</Text>
      </Text>
      <View style={[SGT.conso]}>
        <Text style={[SFC.textSecondaryL, SFC.text, SPP.label]}>
          Conso. Gaz de ville -{" "}
          <Text style={[SFC.textPrimaryL, SFC.text, SPP.label]}>(KWh/an)</Text>
        </Text>
        <View style={[SGT.row]}>
          <TextInput
            style={SG.textInput}
            keyboardType="numeric"
            placeholderTextColor={"#FFF6F0"}
            selectionColor={"#FBD3B7"}
            onChangeText={handleAddConsoCityGaz}
            value={cityValue}
          />
          <Pressable
            style={({ pressed }) => [
              SG.borderRad,
              !pressed ? SG.button : SG.buttonPressed,
              SG.center,
              SET.actionBtn,
            ]}
            onPress={() => console.log("OCR gaz")}
          >
            <OcrIcon width={24} height={24} fill={"#1F4D4D"} />
          </Pressable>
        </View>
      </View>
      <View style={[SGT.conso]}>
        <Text style={[SFC.textSecondaryL, SFC.text, SPP.label]}>
          Conso. Propane -{" "}
          <Text style={[SFC.textPrimaryL, SFC.text, SPP.label]}>(KWh/an)</Text>
        </Text>
        <View style={[SGT.row]}>
          <TextInput
            style={SG.textInput}
            keyboardType="numeric"
            placeholderTextColor={"#FFF6F0"}
            selectionColor={"#FBD3B7"}
            onChangeText={handleAddConsoPropaneGaz}
            value={propaneValue}
          />
          <Pressable
            style={({ pressed }) => [
              SG.borderRad,
              !pressed ? SG.button : SG.buttonPressed,
              SG.center,
              SET.actionBtn,
            ]}
            onPress={() => console.log("OCR gaz")}
          >
            <OcrIcon width={24} height={24} fill={"#1F4D4D"} />
          </Pressable>
        </View>
      </View>
      <View style={[SGT.row, { justifyContent: "space-around" }]}>
        <View style={[SGT.conso]}>
          <Text style={[SFC.textSecondaryL, SFC.text, SPP.label]}>
            Nb. de bouteilles
          </Text>
          <View style={[SGT.row]}>
            <TextInput
              style={SG.textInput}
              keyboardType="numeric"
              placeholderTextColor={"#FFF6F0"}
              selectionColor={"#FBD3B7"}
              onChangeText={handleAddConsoBottleNbr}
              value={bottleNbrValue}
            />
            <Pressable
              style={({ pressed }) => [
                SG.borderRad,
                !pressed ? SG.button : SG.buttonPressed,
                SG.center,
                SET.actionBtn,
              ]}
              onPress={increment}
            >
              <UpIcon width={20} height={20} fill={"#1F4D4D"} />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                SG.borderRad,
                !pressed ? SG.button : SG.buttonPressed,
                SG.center,
                SET.actionBtn,
              ]}
              onPress={decrement}
            >
              <DownIcon width={20} height={20} fill={"#1F4D4D"} />
            </Pressable>
          </View>
        </View>
        <View style={[SGT.conso]}>
          <Text style={[SFC.textSecondaryL, SFC.text, SPP.label]}>
            <Text style={[SFC.textPrimaryL, SFC.text, SPP.label]}>L</Text> par
            bouteille
          </Text>
          <View style={[SGT.row]}>
            <TextInput
              style={SG.textInput}
              keyboardType="numeric"
              placeholderTextColor={"#FFF6F0"}
              selectionColor={"#FBD3B7"}
              onChangeText={handleAddConsoBottleGaz}
              value={bottleValue}
            />
            <Pressable
              style={({ pressed }) => [
                SG.borderRad,
                !pressed ? SG.button : SG.buttonPressed,
                SG.center,
                SET.actionBtn,
              ]}
              onPress={() => console.log("OCR gaz")}
            >
              <OcrIcon width={24} height={24} fill={"#1F4D4D"} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

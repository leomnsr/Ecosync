import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";

import { StyleMainPage as SMP } from "./StyleMainPage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";

import HouseIcon from "../../assets/icons/houseSetting.svg";

import { SyncResultModal } from "./SyncPopup";
import { UserData } from "../../SyncData/UserData";

export const MainPage = ({ navigation }: { navigation: any }) => {
  const globalgrade = UserData.getInstance().getSyncAttribute("grade");
  const [grade, setGrade] = useState(globalgrade ? Number(globalgrade) : 100); // initial value

  // needed for sync result popup
  const [modalVisible, setModalVisible] = useState(false); // not visible by default

  const handleSync = async () => {
    try {
      await UserData.getInstance().updateSync();
    } catch (error) {
      console.error("Failed to update sync", error);
    }
    const newGrade = UserData.getInstance().getSyncAttribute("grade");
    setGrade(Number(newGrade));
    setModalVisible(true);
  };

  return (
    <View style={[SMP.container]}>
      <View style={[SMP.textBgContainer]}>
        <Text style={[SFC.title, SFC.textPrimaryD, SMP.textBg]}>EcoSync</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          SMP.profileButton,
          !pressed ? SG.button : SG.buttonPressed,
          SG.center,
          SG.innerShadow,
        ]}
        onPress={async () => {
          try {
            await UserData.getInstance().updateProfile();
            navigation.navigate("ProfilePage");
          } catch (error) {
            console.error("Failed to update profile", error);
          }
        }}
      >
        <HouseIcon width={48} height={48} fill={"#023636"} />
      </Pressable>
      <View style={[SMP.bgImage, SG.center]}>
        <Image
          source={require("../../assets/graphics/appt.png")}
          style={{ width: "95%", height: "80%" }}
        />
      </View>
      <SyncResultModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        grade={grade}
      />
      <View style={[SMP.bottomSection]}>
        <Pressable
          style={({ pressed }) => [
            SMP.syncBtn,
            SG.borderRad,
            !pressed ? SG.button : SG.buttonPressed,
            SG.center,
          ]}
          onPress={() => {
            console.log("Sync");
            handleSync();
          }}
        >
          <Text style={[SFC.title, SMP.syncBtnText, SFC.textPrimaryD]}>
            Sync
          </Text>
        </Pressable>
        <View style={[SMP.SyncResult]}>
          <View
            style={[
              SG.borderRad,
              SG.dropShadow,
              SFC.bgTertiaryL,
              SMP.gradeContainer,
              SG.center,
              SG.bottom,
            ]}
          >
            <Text style={[SFC.title, SMP.grade, SFC.textPrimaryL]}>
              {grade}
            </Text>
          </View>
          <View
            style={[
              SG.borderRad,
              SG.dropShadow,
              SFC.bgSecondaryL,
              SMP.tipsContainer,
            ]}
          >
            <Text style={[SFC.text, SMP.tips, SFC.textPrimaryL]}>
              Les ampoules basse consommation vous permettraient d'améliorer
              votre score.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

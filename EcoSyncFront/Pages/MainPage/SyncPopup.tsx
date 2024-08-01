import { Modal, View, Text, Pressable, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { StyleMainPage as SMP, StyleSyncPopup as SSP } from "./StyleMainPage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";

import CloseIcon from "../../assets/icons/close.svg";
import ElecIcon from "../../assets/icons/elec.svg";
import WaterIcon from "../../assets/icons/water.svg";
import GasIcon from "../../assets/icons/gaz.svg";
import { StatusBar } from "expo-status-bar";
import { UserData } from "../../SyncData/UserData";

export const SyncResultModal = ({
  modalVisible,
  setModalVisible,
  grade,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  grade: number;
}) => {
  const [elecGrade, setElecGrade] = useState<number | null>(null);
  const [waterGrade, setWaterGrade] = useState<number | null>(null);
  const [gasGrade, setGasGrade] = useState<number | null>(null);

  useEffect(() => {
    if (modalVisible) {
      const fetchGrades = async () => {
        const elec =
          UserData.getInstance().getSyncAttribute("electricityGrade");
        const water = UserData.getInstance().getSyncAttribute("waterGrade");
        const gas = UserData.getInstance().getSyncAttribute("gasGrade");
        setElecGrade(Number(elec));
        setWaterGrade(Number(water));
        setGasGrade(Number(gas));
      };

      fetchGrades();
    }
  }, [modalVisible]);

  const otherGrades = [elecGrade, waterGrade, gasGrade];

  // custom slide in anim from top cuz react native is weak
  const slideInAnim = useRef(new Animated.Value(-1000)).current;
  const slideOutAnim = useRef(new Animated.Value(0)).current;
  const backgroundFadeAnim = useRef(new Animated.Value(0)).current;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      setIsAnimating(true);
      Animated.parallel([
        Animated.timing(slideInAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setIsAnimating(true);
      Animated.parallel([
        Animated.timing(slideOutAnim, {
          toValue: -1000,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundFadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // reset anim position
        setIsAnimating(false);
        setModalVisible(false);
        slideInAnim.setValue(-1000);
        slideOutAnim.setValue(0);
      });
    }
  }, [modalVisible, slideInAnim, slideOutAnim]);

  return (
    <>
      <StatusBar
        backgroundColor={modalVisible || isAnimating ? "rgba(0,0,0,0.75)" : ""}
        style="light"
      ></StatusBar>
      {modalVisible || isAnimating ? (
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible || isAnimating}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable style={SSP.modalBg} onPress={() => setModalVisible(false)}>
            <Animated.View
              style={[SSP.modalOverlay, { opacity: backgroundFadeAnim }]}
            />
            <Animated.View
              style={[
                SSP.modalView,
                SG.borderRad,
                SG.dropShadow,
                SFC.bgSecondaryL,
                {
                  transform: [
                    { translateY: slideInAnim },
                    { translateX: slideOutAnim },
                  ],
                },
              ]}
            >
              <Text style={[SFC.subtitle, SFC.textPrimaryL, SSP.headerLabel]}>
                Votre note :
              </Text>
              <Pressable
                style={({ pressed }) => [
                  SSP.closeButton,
                  !pressed ? SG.button : SG.buttonPressed,
                  SG.center,
                ]}
                onPress={() => setModalVisible(false)}
              >
                <CloseIcon width={16} height={16} fill={"#1F4D4D"} />
              </Pressable>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "baseline",
                }}
              >
                <Text style={[SFC.title, SSP.gradeText, SFC.textPrimaryL]}>
                  {grade}
                </Text>
                <Text style={[SFC.subtitle, SFC.textSecondaryL]}>/100</Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={[SSP.gradeIcon, SG.center]}>
                  <ElecIcon width={32} height={32} fill={"#FFF6F0"} />
                </View>
                <View style={[SSP.gradeIcon, SG.center]}>
                  <WaterIcon width={32} height={32} fill={"#FFF6F0"} />
                </View>
                <View style={[SSP.gradeIcon, SG.center]}>
                  <GasIcon width={32} height={32} fill={"#FFF6F0"} />
                </View>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                {otherGrades.map((g, i) => (
                  <Text key={i} style={[SSP.otherGrades, SFC.textSecondaryL]}>
                    {g !== null ? g : "-"}
                  </Text>
                ))}
              </View>
              <Pressable
                style={({ pressed }) => [
                  !pressed ? SG.button : SG.buttonPressed,
                  SG.center,
                  SSP.okButton,
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[SFC.textPrimaryD, SFC.subtitle]}>Compris !</Text>
              </Pressable>
            </Animated.View>
          </Pressable>
        </Modal>
      ) : null}
    </>
  );
};

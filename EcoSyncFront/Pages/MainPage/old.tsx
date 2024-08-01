import React from "react";
import { Pressable, Text, View } from "react-native";
import { StyleMainPage as SMP } from "./StyleMainPage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import { Icon } from "@iconify/react";
import Svg, { Path } from "react-native-svg";

import { ProfilePage } from "../ProfilePage/ProfilePage";

export const MainPage = ({ navigation }: { navigation: any }) => {
  return (
    <View style={SMP.container}>
      <View style={[SG.top]}>
        <View style={SG.left}>
          <Text style={[SFC.title, SFC.textPrimaryD, SMP.textBg]}>EcoSync</Text>
        </View>
        {/** Profile btn*/}
        <View style={SG.right}>
          <Pressable
            style={[SMP.profileButton, SG.borderRad, SG.button, SG.center]}
            onPress={() => {
              console.log("Profile");
              navigation.navigate("ProfilePage");
            }}
          >
            <Icon icon="mdi-light:account" style={{ fontSize: "58px" }} />
          </Pressable>
        </View>
      </View>
      <View style={[SG.bottom, SMP.dataTable]}>
        {/** Sync btn */}
        <View style={SG.right}>
          <Pressable
            style={[SMP.syncBtn, SG.borderRad, SG.button, SG.center]}
            onPress={() => {
              console.log("Sync");
              navigation.navigate("ProfilePage");
            }}
          >
            <Text style={[SFC.title, SFC.textPrimaryD]}>Sync</Text>
          </Pressable>
        </View>
        {/** Grade & tips */}
        <View style={SMP.dataRow}>
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
            <Text style={[SFC.title, SMP.grade, SFC.textPrimaryL]}>87</Text>
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
        {/** navBar*/}
        <View style={SMP.footerContainer}>
          <View style={[SMP.footer, { justifyContent: "space-evenly" }]}>
            <Pressable onPress={() => console.log("stats")} style={SG.center}>
              <Icon
                icon="mdi-light:chart-line"
                style={{ fontSize: "30px", color: "#807873" }}
              />
              <Text style={[SFC.text, { color: "#807873" }]}>Ma Conso.</Text>
            </Pressable>
            <Pressable onPress={() => console.log("Home")} style={SG.center}>
              <Icon
                icon="mdi-light:home"
                style={{ fontSize: "44px", color: "#FFF6F0" }}
              />
            </Pressable>

            <Pressable onPress={() => console.log("Tips")} style={SG.center}>
              <Icon
                icon="mdi-light:view-dashboard"
                style={{ fontSize: "30px", color: "#807873" }}
              />
              <Text style={[SFC.text, { color: "#807873" }]}>Mes Conseils</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

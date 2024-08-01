import React, { useEffect, useState } from "react";
import { Pressable, Text, View, TextInput, Image } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

import { StyleProfilePage as SPP } from "./StyleProfilePage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import { StyleOptionsMenu as SOM } from "./StyleProfilePage";
import { StyleElectricityTab as SET } from "./StyleProfilePage";
import { optionStyles } from "./StyleProfilePage";
import { lastOptionStyle } from "./StyleProfilePage";

import { ElectricityTab } from "./ElectricityTab";
import { WaterTab } from "./WaterTab";
import { GazTab } from "./GazTab";
import { TrashTab } from "./TrashTab";

import { logout } from "../../Requests/auth";

import DotsIcon from "../../assets/icons/dots.svg";
import CloseIcon from "../../assets/icons/close.svg";
import DownIcon from "../../assets/icons/down.svg";
import UpIcon from "../../assets/icons/up.svg";
import LeftIcon from "../../assets/icons/left.svg";
import RightIcon from "../../assets/icons/right.svg";
import HumanIcon from "../../assets/icons/human.svg";
import MeterIcon from "../../assets/icons/meter.svg";
import IotIcon from "../../assets/icons/iot.svg";
import CheckIcon from "../../assets/icons/check.svg";

import WaterIcon from "../../assets/icons/water.svg";
import GazIcon from "../../assets/icons/gaz.svg";
import ElectricityIcon from "../../assets/icons/elec.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { HouseType } from "../../SyncData/House";
import { UserData } from "../../SyncData/UserData";
import { Use } from "react-native-svg";

const DetailMenu = ({ navigation }: { navigation: any }) => {
  const { SlideInMenu } = renderers;

  return (
    <Menu renderer={SlideInMenu}>
      <MenuTrigger>
        <View style={[SPP.details, SG.button, SG.center]}>
          <DotsIcon width={26} height={26} fill={"#1F4D4D"} />
        </View>
      </MenuTrigger>

      <MenuOptions customStyles={SOM}>
        <MenuOption onSelect={() => console.log("Langue")}>
          <Text
            style={[SFC.textLarge, SFC.textPrimaryL, { alignSelf: "center" }]}
          >
            Changer de langue
          </Text>
        </MenuOption>
        <MenuOption onSelect={() => console.log("Nous contacter")}>
          <Text
            style={[SFC.textLarge, SFC.textPrimaryL, { alignSelf: "center" }]}
          >
            Nous contacter
          </Text>
        </MenuOption>
        <MenuOption onSelect={() => console.log("Légal")}>
          <Text
            style={[SFC.textLarge, SFC.textPrimaryL, { alignSelf: "center" }]}
          >
            Légal
          </Text>
        </MenuOption>
        <MenuOption onSelect={() => navigation.navigate("RegisterPage")}>
          <Text
            style={[SFC.textLarge, SFC.textPrimaryL, { alignSelf: "center" }]}
          >
            À propos (register Page)
          </Text>
        </MenuOption>
        <MenuOption
          onSelect={async () => {
            const response = await logout();
            if (response === 200) {
              navigation.navigate("LoginPage");
            }
          }}
          customStyles={lastOptionStyle}
        >
          <Text style={[SFC.textLarge, { color: "red", alignSelf: "center" }]}>
            Se déconnecter
          </Text>
        </MenuOption>
        <MenuOption
          onSelect={() => console.log("Fermer")}
          customStyles={optionStyles}
        >
          <Text
            style={[SFC.textLarge, SFC.textPrimaryL, { alignSelf: "center" }]}
          >
            Fermer
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export const ProfilePage = ({ navigation }: { navigation: any }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "electricity", title: "Electricity" },
    { key: "water", title: "Water" },
    { key: "gaz", title: "Gaz" },
    { key: "trash", title: "Trash" },
  ]);

  const tabColors: {
    [key: string]: { backgroundColor: string; focusedBackgroundColor: string };
  } = {
    electricity: {
      backgroundColor: SFC.bgTertiaryL.backgroundColor,
      focusedBackgroundColor: SFC.bgSecondaryL.backgroundColor,
    },
    water: {
      backgroundColor: SFC.bgTertiaryL.backgroundColor,
      focusedBackgroundColor: SFC.bgSecondaryL.backgroundColor,
    },
    gaz: {
      backgroundColor: SFC.bgTertiaryL.backgroundColor,
      focusedBackgroundColor: SFC.bgSecondaryL.backgroundColor,
    },
    trash: {
      backgroundColor: SFC.bgTertiaryL.backgroundColor,
      focusedBackgroundColor: SFC.bgSecondaryL.backgroundColor,
    },
  };

  const renderScene = SceneMap({
    electricity: ElectricityTab,
    water: WaterTab,
    gaz: GazTab,
    trash: TrashTab,
  });

  const tabIcons: Record<string, any> = {
    electricity: ElectricityIcon,
    water: WaterIcon,
    gaz: GazIcon,
    trash: TrashIcon,
  };

  const [surfaceValue, setSurfaceValue] = useState<number | null>(null);
  const [habitantsValue, setHabitantsValue] = useState<number | null>(null);
  const [houseType, setHouseType] = useState<HouseType | null>(null);

  function fetchHouseAttributes() {
    const type = UserData.getInstance().getHouseAttribute("houseType");
    const area = UserData.getInstance().getHouseAttribute("houseArea");
    const inhabitants = UserData.getInstance().getHouseAttribute("inhabitants");

    setHouseType(
      type.toString() === "House" ? HouseType.House : HouseType.Appartement
    );
    setSurfaceValue(
      area === null || area.toString() === "0" ? null : Number(area)
    );
    setHabitantsValue(
      inhabitants === null || inhabitants.toString() === "0"
        ? null
        : Number(inhabitants)
    );
  }
  useEffect(() => {
    fetchHouseAttributes();
  }, []);

  const handleValidate = async () => {
    if (surfaceValue !== null) {
      UserData.getInstance().setHouseAttribute("houseArea", surfaceValue);
    }
    if (habitantsValue !== null) {
      UserData.getInstance().setHouseAttribute("inhabitants", habitantsValue);
    }
    if (houseType !== null) {
      UserData.getInstance().setHouseAttribute(
        "houseType",
        houseType === HouseType.House ? 1 : 0
      );
    }

    try {
      await UserData.getInstance().sendProfileUpdates();
    } catch (e) {
      console.error(e);
    }
    navigation.navigate("MainPage");
  };

  const switchOption = () => {
    if (houseType === HouseType.House) {
      setHouseType(HouseType.Appartement);
    } else if (houseType === HouseType.Appartement) {
      setHouseType(HouseType.House);
    }
  };

  const imagePaths: Record<HouseType, any> = {
    [HouseType.House]: require("../../assets/graphics/house.png"),
    [HouseType.Appartement]: require("../../assets/graphics/appt.png"),
  };

  const imgPath = houseType !== null ? imagePaths[houseType] : null;

  // for habitants arrows

  const increment = () => {
    if (habitantsValue !== null && habitantsValue < 99) {
      setHabitantsValue(habitantsValue + 1);
    }
  };

  const decrement = () => {
    if (habitantsValue !== null && habitantsValue > 0) {
      setHabitantsValue(habitantsValue - 1);
    }
  };

  return (
    <MenuProvider>
      <View style={[SPP.container]}>
        <View style={SPP.header}>
          <DetailMenu navigation={navigation} />
          <Text style={[SPP.title, SFC.title, SFC.textPrimaryL]}>
            Mon Habitation
          </Text>
          <Pressable
            style={({ pressed }) => [
              SPP.close,
              !pressed ? SG.button : SG.buttonPressed,
              SG.center,
            ]}
            onPress={() => navigation.navigate("MainPage")}
          >
            <CloseIcon width={16} height={16} fill={"#1F4D4D"} />
          </Pressable>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: 100 }}
          animationEnabled={false}
          swipeEnabled={false}
          style={[SPP.energies]}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={[SPP.tabBg]}
              renderLabel={({ route, focused }) => (
                <View
                  style={[
                    focused ? SPP.focusedTab : SPP.tab,
                    {
                      backgroundColor: focused
                        ? tabColors[route.key].focusedBackgroundColor
                        : tabColors[route.key].backgroundColor,
                    },
                  ]}
                >
                  {tabIcons[route.key]({
                    width: 28,
                    height: 28,
                    fill: "#FFF6F0",
                  })}
                </View>
              )}
              indicatorStyle={{ backgroundColor: "transparent" }}
            />
          )}
        />

        <View
          style={[SPP.logement, SG.borderRad, SG.dropShadow, SFC.bgSecondaryL]}
        >
          <Text style={[SFC.subtitle, SFC.textPrimaryL, { marginLeft: 10 }]}>
            Mon logement
          </Text>
          <View style={SPP.row}>
            <View style={SPP.column}>
              <View style={SPP.row}>
                <MeterIcon width={32} height={32} fill={"#FFF6F0"} />
                <Text style={[SFC.text, SFC.textSecondaryL, SPP.label]}>
                  Surface
                </Text>
              </View>
              <TextInput
                style={SPP.textInput}
                keyboardType="numeric"
                placeholder="Surface en m²"
                placeholderTextColor={"#FFF6F0"}
                maxLength={4}
                selectionColor={"#FBD3B7"}
                onChangeText={(text) =>
                  setSurfaceValue(text ? parseInt(text) : null)
                }
                value={surfaceValue?.toString()}
              />
            </View>
            <View style={SPP.column}>
              <View style={SPP.row}>
                <HumanIcon width={32} height={32} fill={"#FFF6F0"} />
                <Text style={[SFC.text, SFC.textSecondaryL, SPP.label]}>
                  Habitants
                </Text>
              </View>
              <View style={SPP.row}>
                <TextInput
                  style={SPP.textInput}
                  keyboardType="numeric"
                  value={habitantsValue?.toString()}
                  onChangeText={(text) =>
                    setHabitantsValue(text ? parseInt(text) : null)
                  }
                  maxLength={2}
                  selectionColor={"#FBD3B7"}
                />
                <Pressable
                  onPress={increment}
                  style={[SG.borderRad, SG.button, SG.center, SET.actionBtn]}
                >
                  <UpIcon width={20} height={20} fill={"#1F4D4D"} />
                </Pressable>
                <Pressable
                  onPress={decrement}
                  style={[
                    SG.borderRad,
                    SG.button,
                    SG.center,
                    SET.actionBtn,
                    { padding: 0 },
                  ]}
                >
                  <DownIcon width={20} height={20} fill={"#1F4D4D"} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={[SPP.footer]}>
          <View
            style={[
              SPP.typeDeLogement,
              SG.borderRad,
              SG.dropShadow,
              SFC.bgSecondaryL,
            ]}
          >
            <Text style={[SPP.typeLabel, SFC.subtitle, SFC.textPrimaryL]}>
              Type de logement
            </Text>

            <View style={[SPP.selectorContainer]}>
              <Pressable
                style={({ pressed }) => [
                  SPP.arrow,
                  SPP.left,
                  SG.borderRad,
                  !pressed ? SG.button : SG.buttonPressed,
                  SG.center,
                ]}
                onPress={() => switchOption()}
              >
                <LeftIcon width={20} height={20} fill={"#1F4D4D"} />
              </Pressable>

              <Image
                source={imgPath}
                style={{ width: 105, height: 100, resizeMode: "contain" }}
              />

              <Pressable
                style={({ pressed }) => [
                  SPP.arrow,
                  SPP.right,
                  SG.borderRad,
                  !pressed ? SG.button : SG.buttonPressed,
                  SG.center,
                ]}
                onPress={() => switchOption()}
              >
                <RightIcon width={20} height={20} fill={"#1F4D4D"} />
              </Pressable>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              SPP.itemsButton,
              SG.borderRad,
              !pressed ? SG.button : SG.buttonPressed,
              SG.center,
            ]}
            onPress={handleValidate}
          >
            <CheckIcon width={48} height={248} fill={"#1F4D4D"} />
          </Pressable>
        </View>
      </View>
    </MenuProvider>
  );
};

import React, { useEffect } from "react";
import { StyleSheet, StatusBar, Platform } from "react-native";

// Icons stuff
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeIcon from "./assets/icons/home.svg";
import TipsIcon from "./assets/icons/tips.svg";
import ConsoIcon from "./assets/icons/conso.svg";

import { MainPage } from "./Pages/MainPage/MainPage";
import { StatPage } from "./Pages/StatPage/StatPage";
import { TipsPage } from "./Pages/TipsPage/TipsPage";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { RegisterPage } from "./Pages/RegisterPage/RegisterPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import * as Font from "expo-font";
import { render } from "react-dom";
import { Dimensions, Text, View } from "react-native";

import {
  Quicksand_700Bold,
  Quicksand_500Medium,
} from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";

const windowWidth = Dimensions.get("window").width;

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Ma Maison"
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          // hide label when focused
          return focused ? null : (
            <Text
              style={{
                fontFamily: "Quicksand_500Medium",
                fontSize: 14,
                color: "#807873",
              }}
            >
              {route.name}
            </Text>
          );
        },
        tabBarIndicatorStyle: { backgroundColor: "#091717" },
        tabBarStyle: {
          backgroundColor: "#091717",
          borderTopColor: "#FBD3B7",
          borderTopWidth: 1,
          height: 73,
        },
      })}
    >
      <Tab.Screen
        name="Ma Conso."
        component={StatPage}
        options={{
          tabBarIcon: ({ focused }) => {
            let size = focused ? 32 : 21;
            let color = focused ? "#FFF6F0" : "#807873";
            return (
              <View style={{ justifyContent: "bottom", alignItems: "center" }}>
                <ConsoIcon width={size} height={size} fill={color} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Ma Maison"
        component={MainPage}
        options={{
          tabBarIcon: ({ focused }) => {
            let size = focused ? 36 : 24;
            let color = focused ? "#FFF6F0" : "#807873";
            return (
              <View style={{ justifyContent: "bottom", alignItems: "center" }}>
                <HomeIcon
                  width={size}
                  height={size}
                  fill={color}
                  strokeWidth={1.5}
                  stroke={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Mes Conseils"
        component={TipsPage}
        options={{
          tabBarIcon: ({ focused }) => {
            let size = focused ? 32 : 21;
            let color = focused ? "#FFF6F0" : "#807873";
            return (
              <View style={{ justifyContent: "bottom", alignItems: "center" }}>
                <TipsIcon width={size} height={size} fill={color} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_500Medium,
  });
  if (!fontsLoaded) {
    return null;
  }

  // Setup of the status bar color and style (the bar at the top of the screen, battery, time, etc.)
  const statusBar = () => {
    // should fix the warnings
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0C1F1F");
      StatusBar.setBarStyle("#FBD3B7");
    } else if (Platform.OS === "ios") {
      StatusBar.setBarStyle("light-content");
    }
  };
  statusBar();

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MainPage"
          component={TabNavigator}
          options={{
            // Animation for the transition between pages
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            // Animation for the transition between the pages
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

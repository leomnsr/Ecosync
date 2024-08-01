import React from "react";
import { Pressable, Text, View, TextInput, Alert, Image } from "react-native";
import { StyleStatPage as SLP } from "./StyleLoginPage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@iconify/react";
import { loginUser } from "../../Requests/auth";

export const LoginPage = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={[SLP.container]}>
      <View style={[SG.row, SLP.header]}> 
        <Image style={SLP.logo} source={require("../../assets/graphics/logo.png")} />
        <Text style={[SFC.title, SFC.textPrimaryL, SLP.logoTitle]}> </Text>
      </View>
      <View
        style={[
          SLP.loginContainer,
          SG.borderRad,
          SG.dropShadow,
          SFC.bgSecondaryL,
        ]}
      >
        <Text style={[SFC.title, SFC.textPrimaryL, SLP.loginTxt]}>Bon retour chez vous ! </Text>

        <TextInput
          style={[SG.textInput, SG.borderRad]}
          placeholderTextColor="#FFF6F0"
          placeholder="Adresse Email"
          inputMode="email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[SG.textInput, SG.borderRad]}
          placeholderTextColor="#FFF6F0"
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={[SLP.forgotPassword]}
          onPress={() => console.log("forgot password")}
        >
          <Text style={{ color: "#FFF6F0", textDecorationLine: "underline" }}>Mot de passe oublié ?</Text>
        </Pressable>
      </View>

      <Pressable
        style={[SLP.button, SG.borderRad, SG.button, SG.center]}
        onPress={async () => {
          const response = await loginUser(email, password);
          if (response === 200) {
            navigation.navigate("MainPage");
          }
        }}
      >
        <Text style={[SFC.title, SLP.buttonText, SFC.textPrimaryD]}>Connexion</Text>
      </Pressable>
      <Text style={[SFC.textLarge, SFC.textPrimaryL]}>Pas de compte ?</Text>
      <Pressable
        style={[SLP.button, SG.borderRad, SG.button, SG.center]}
        onPress={() => navigation.navigate("RegisterPage")}
      >
        <Text style={[SFC.subtitle, SLP.buttonText, SFC.textPrimaryD]}>
          Créer un compte
        </Text>
      </Pressable>
    </View>
  );
};

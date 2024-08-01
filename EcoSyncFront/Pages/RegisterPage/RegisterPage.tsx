import React from "react";
import { Pressable, Text, View, TextInput, Image, Alert } from "react-native";
import { StyleStatPage as SRP } from "./StyleRegisterPage";
import { StyleFontColor as SFC } from "../StyleFontColor";
import { StyleGraphic as SG } from "../StyleGraphic";

import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../Requests/auth";

export const RegisterPage = ({ navigation }: { navigation: any }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <View style={[SRP.container]}>
      <View style={[SG.row, SRP.header]}> 
        <Image style={SRP.logo} source={require("../../assets/graphics/logo.png")} />
        <Text style={[SFC.title, SFC.textPrimaryL, SRP.logoTitle]}> </Text>
      </View>
      <View
        style={[
          SRP.loginContainer,
          SG.borderRad,
          SG.dropShadow,
          SFC.bgSecondaryL,
        ]}
      >
        <Text style={[SFC.title, SFC.textPrimaryL, SRP.registerTxt]}>Bienvenue chez vous ! </Text>
       
        <TextInput
          style={[SG.textInput, SG.borderRad]}
          placeholderTextColor="#FFF6F0"
          placeholder="Nom d'utilisateur"
          inputMode="text"
          value={name}
          onChangeText={setName}
        />

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

        <TextInput
          style={[SG.textInput, SG.borderRad]}
          placeholderTextColor="#FFF6F0"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <Pressable
        style={[SRP.button, SG.borderRad, SG.button, SG.center]}
        onPress={async () => {
          const response = await registerUser(name, email, password);
          if (response === 201) {
            navigation.navigate("LoginPage");
          }
        }}
      >
        <Text style={[SFC.title, SRP.buttonText, SFC.textPrimaryD]}>
          S'inscrire
        </Text>
      </Pressable>


      <Text style={[SFC.textLarge, SFC.textPrimaryL]}>Déjà un compte ?</Text>
      <Pressable
        style={[SRP.button, SG.borderRad, SG.button, SG.center]}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Text style={[SFC.subtitle, SRP.buttonText, SFC.textPrimaryD]}>Se connecter</Text>
      </Pressable>
    </View>
  );
};

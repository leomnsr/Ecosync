import { StyleSheet } from "react-native";

export const StyleStatPage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1F1F",
    justifyContent: "center",
    alignItems: "center",
  },

  loginContainer: {
    height: 270,
    width: 300,
    margin: 30,
    padding: 12,
  },

  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    color: "#FFF6F0",
    paddingLeft: 10,
  },

  button: {
    backgroundColor: "#153636",
    color: "#FFF6F0",
    margin: 12,
  },

  buttonText: {
    margin: 10,
  },

  forgotPassword: {
    alignSelf: "center",
    margin: 5,
  },

  loginTxt: {
    margin: 10,
  },

  header: {
    width: 300,
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 200,
    position: "absolute",
  },
  
  logoTitle: {
    fontSize: 70,
  },
});

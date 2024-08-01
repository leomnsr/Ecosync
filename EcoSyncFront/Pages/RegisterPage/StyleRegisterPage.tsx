import { StyleSheet } from "react-native";

export const StyleStatPage = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0C1F1F",
    paddingTop: 100,
  },


  loginContainer: {
    height: 350,
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
    alignSelf: "center",
    justifyContent: "center",
    margin: 12,
  },

  header: {
    width: 300,
    alignItems: "center",
  },

  registerTxt: {
    margin: 10,
  },

  buttonText: {
    margin: 10,
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

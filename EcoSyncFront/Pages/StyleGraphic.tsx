import { StyleSheet } from "react-native";

export const StyleGraphic = StyleSheet.create({
  // Dropshadow
  dropShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  // Border radius
  borderRad: {
    borderRadius: 25,
  },

  // Buttons
  button: {
    backgroundColor: "#FBD3B7",
    color: "#023636",
    borderWidth: 3,
    borderColor: "#CCAB95",
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  buttonPressed: {
    backgroundColor: "#CCAB95",
    color: "#023636",
    borderWidth: 1,
    borderColor: "#CCAB95",
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },

  innerShadow: {
    shadowColor: "#998170",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
  },

  picker: {
    backgroundColor: "#FBD3B7",
    marginRight: 10,
    color: "#023636",
    height: 50,
    width: 200,
    borderRadius: 25,
  },

  // Text input
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#0C1F1F",
    backgroundColor: "#1F4D4D",
    color: "#FFF6F0",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    marginVertical: 5,
  },

  // Alignments
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  right: {
    alignItems: "flex-end",
  },
  left: {
    alignItems: "flex-start",
  },
  top: {
    justifyContent: "flex-start",
  },
  bottom: {
    justifyContent: "flex-end",
  },
});

import { StyleSheet } from "react-native";

export const StyleProfilePage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1F1F",
  },

  // header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },

  close: {
    width: 40,
    height: 40,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  details: {
    width: 50,
    height: 50,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderCurve: "continuous",
  },

  title: {
    textAlign: "left",
  },

  // tab view
  energies: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 12,
  },

  tabLayout: {
    width: 100,
  },

  tabView: {
    flex: 1,
  },

  tabBg: {
    backgroundColor: "transparent",
    marginHorizontal: 18,
  },

  tab: {
    borderRadius: 10,
    padding: 12,
    width: 76,
    alignItems: "center",
  },

  focusedTab: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    padding: 12,
    width: 76,
    height: 70,
  },

  tabTitle: {
    textAlign: "center",
    fontFamily: "Quicksand_700Bold",
  },

  // logement
  column: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  textInput: {
    flex: 1,
    borderColor: "#0C1F1F",
    backgroundColor: "#1F4D4D",
    color: "#FFF6F0",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
  logement: {
    margin: 12,
    padding: 12,
  },

  // footer
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 24,
    marginHorizontal: 12,
  },

  itemsButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginStart: 25,
    marginEnd: 10,
    maxWidth: 70,
    height: 70,
  },

  typeDeLogement: {
    flex: 2,
    minHeight: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  selectorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },

  arrow: {
    flex: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    justifyContent: "flex-start",
    marginStart: 24,
  },
  right: {
    justifyContent: "flex-end",
    marginEnd: 24,
  },

  typeLabel: {
    marginTop: 10,
    marginStart: 13,
    fontFamily: "Quicksand_700Bold",
  },

  // Style for the options menu
  modalBg: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

export const StyleOptionsMenu = StyleSheet.create({
  optionsContainer: {
    backgroundColor: "#1F4D4D",
    marginHorizontal: 12,
    // cheesing the bottom margin
    margin: -78,
    height: 238,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionsWrapper: {
    height: 48,
  },
  optionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#153636",
    alignContent: "center",
    justifyContent: "center",
    height: 48,
  },
});

export const optionStyles = {
  optionWrapper: {
    backgroundColor: "#1F4D4D",
    marginTop: 12,
    borderRadius: 15,
    height: 48,
    elevation: 3,
    paddingTop: 8,
  },
};

export const lastOptionStyle = {
  optionWrapper: {
    borderBottomWidth: 0,
    marginBottom: 12,
    paddingTop: 8,
  },
};

export const StyleElectricityTab = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  linky: {
    margin: 12,
  },
  conso: {
    margin: 12,
    flexDirection: "column",
  },
  consoLabel: {
    flex: 1,
  },
  consoInput: {
    flex: 1,
  },
  leftContainer: {
    flex: 3,
  },
  rightContainer: {
    flex: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
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
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginLeft: 50,
  },

  actionBtn: {
    marginLeft: 12,
    marginVertical: 6,
    height: 36,
    width: 36,
    borderRadius: 10,
  },
});

export const StyleWaterTab = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  conso: {
    margin: 10,
    flexDirection: "column",
  },
  consoLabel: {
    flex: 1,
  },
  consoInput: {
    flex: 1,
  },

  ecoWatch: {
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
  },
});

export const StyleGasTab = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  conso: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "column",
  },
  consoLabel: {
    flex: 1,
  },
  consoInput: {
    flex: 1,
  },

  ecoWatch: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
  },
});

export const StyleTrashTab = StyleSheet.create({
  conso: {
    margin: 10,
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
  },
});

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const StyleMainPage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C1F1F",
  },

  bgImage: {
    zIndex: -1,
  },

  // profile button
  profileButton: {
    backgroundColor: "#153636",
    color: "#FFF6F0",
    position: "absolute", // position it absolutely
    top: 100, // slight margin from the top
    right: 20, // slight margin from the right
    justifyContent: "center", // center the icon vertically
    alignItems: "center", // center the icon horizontally
    height: 80,
    width: 80,
    borderRadius: 28,
  },

  // background "EcoSync" container
  textBgContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  // background "EcoSync"
  textBg: {
    writingDirection: "rtl",
    transform: [{ rotate: "-90deg" }],
    fontSize: 80,
    position: "absolute", // position it absolutely
    top: 160, // align it to the top
    left: -130, // align it to the left
  },

  // bottom section with sync button, grade and tips
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end", // align children to the bottom
  },

  // sync button
  syncBtn: {
    backgroundColor: "#153636",
    color: "#FFF6F0",
    alignSelf: "flex-end", // align it to the right
    width: 0.45 * width, // 40% of the screen width
    margin: 12,
    height: 80,
  },

  // sync button text
  syncBtnText: {
    fontSize: 42,
    marginBottom: 10,
  },

  // grade & tips bottom container
  SyncResult: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 12,
  },

  // grade
  grade: {
    fontSize: 78,
    justifyContent: "flex-end",
  },
  gradeContainer: {
    height: 143,
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
    padding: 10,
  },

  // tips
  tips: {
    fontSize: 17,
    color: "grey",
  },
  tipsContainer: {
    height: 143,
    flex: 2,
    marginLeft: 6,
    marginRight: 12,
    padding: 24,
  },

  dataTable: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  dataRow: {
    flexDirection: "row",
    width: "100%",
  },

  footerContainer: {
    justifyContent: "flex-end",
    width: "100%",
    height: 73,
    backgroundColor: "#091717",
    borderTopColor: "#FBD3B7",
    borderTopWidth: 1,
    marginTop: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});

export const StyleSyncPopup = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "65%",
    height: "40%",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  okButton: {
    width: 150,
    height: 45,
    margin: 20,
    borderRadius: 16,
    paddingBottom: 5,
  },
  gradeText: {
    fontSize: 50,
    marginBottom: 20,
    marginTop: 20,
  },
  otherGrades: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginHorizontal: 21,
  },
  modalBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.75)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  headerLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 24,
    marginTop: 16,
    fontSize: 26,
  },
  gradeIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 12,
  },
});

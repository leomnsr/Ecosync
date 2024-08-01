import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import getEnvVars from "../config";

const { BACKEND_IP } = getEnvVars();

// Get Sync result
// path: /api/calculations/sync
// response: {
//  "userid": 1,
//  "electricityimpact": 0,
//  "electricitygrade": 100,
//  "waterimpact": 0,
//  "watergrade": 100,
//  "gasimpact": 0,
//  "gasgrade": 100,
//  "grade": 100,
//  "readingdate": "2024-06-10T19:13:46.335Z"
//}
export const requestSync = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const response = await fetch(
      `http://${BACKEND_IP}:8000/api/calculation/sync`,
      {
        method: "GET",
        headers: {
          "Content-Type": "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Error, response not ok:");
      console.error(response);
      return "";
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    console.error("Error", "Something went wrong. Please try again later.");
    return "";
  }
};

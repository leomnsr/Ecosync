import AsyncStorage from "@react-native-async-storage/async-storage";
import getEnvVars from "../config";
import { House } from "../SyncData/House";

const { BACKEND_IP } = getEnvVars();

// House object structure:
// {
//     "userId": 0,
//     "houseArea": 0,
//     "houseType": 0,
//     "inhabitants": 0,
//     "linkyNumber": "string"
//  }

// Get House object
export const requestHouse = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const response = await fetch(`http://${BACKEND_IP}:8000/api/data/House`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Error, response not ok:");
      console.error(response);
      return 0;
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    console.error("Error", "Something went wrong. Please try again later.");
    return 0;
  }
};

// Patch new House object
export const patchHouse = async (house: House) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const response = await fetch(`http://${BACKEND_IP}:8000/api/data/House`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(house),
    });

    if (!response.ok) {
      console.error("Error, response not ok:");
      console.error(response);
    }

    return response;
  } catch (error) {
    console.error(error);
    console.error("Error", "Something went wrong. Please try again later.");
    return 0;
  }
};

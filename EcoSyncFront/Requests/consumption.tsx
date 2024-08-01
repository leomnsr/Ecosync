import AsyncStorage from "@react-native-async-storage/async-storage";
import getEnvVars from "../config";
import { Consumption } from "../SyncData/Consumption";

const { BACKEND_IP } = getEnvVars();

// Consumption object structure:
// {
//     "userId": 0,
//     "electricity": 0,
//     "water": 0,
//     "cityGas": 0,
//     "propaneGas": 0,
//     "bottleGas": 0,
//     "bottleQuantity": 0
//   }

// Get consumption
export const requestConsumption = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const response = await fetch(
      `http://${BACKEND_IP}:8000/api/data/Consumption/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    return null;
  }
};

// Patch new consumption
export const patchConsumption = async (consumption: Consumption) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    const response = await fetch(
      `http://${BACKEND_IP}:8000/api/data/Consumption/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(consumption),
      }
    );

    if (!response.ok) {
      console.error("Error, response not ok:");
      console.error(response);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    console.error("Error", "Something went wrong. Please try again later.");
    return false;
  }
};

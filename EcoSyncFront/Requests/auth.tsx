import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import getEnvVars from "../config";

const { BACKEND_IP } = getEnvVars();

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(
      `http://${BACKEND_IP}:8000/api/data/Auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          email: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      Alert.alert("Registration Failed", response.status.toString());
    }

    return response.status;
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Something went wrong. Please try again later.");
    return 500;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `http://${BACKEND_IP}:8000/api/data/Auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      // Save JWT and refresh token to AsyncStorage
      await AsyncStorage.setItem("jwtToken", data.jwt);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    } else {
      Alert.alert("Login Failed", data.detail);
    }

    return response.status;
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    console.log(error);
    return 500;
  }
};

export const refreshToken = async () => {
  try {
    // Get refresh token from AsyncStorage
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    const response = await fetch(
      `http://${BACKEND_IP}:8000/api/data/Auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Save new JWT to AsyncStorage
      await AsyncStorage.setItem("jwtToken", data.jwtToken);
    } else {
      Alert.alert(
        "Token Refresh Failed",
        "Unable to refresh token. Please login again."
      );
      // Clear JWT and refresh token from AsyncStorage
      await AsyncStorage.removeItem("jwtToken");
      await AsyncStorage.removeItem("refreshToken");

      //we'll have to navigate back to the login page

      return response.status;
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    console.log(error);
    return 500;
  }
};

export const logout = async () => {
  try {
    // Get JWT from AsyncStorage
    const jwtToken = await AsyncStorage.getItem("jwtToken");

    const response = await fetch(
      `http://${BACKEND_IP}:8000/api/data/Auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.ok) {
      // Clear JWT and refresh token from AsyncStorage
      await AsyncStorage.removeItem("jwtToken");
      await AsyncStorage.removeItem("refreshToken");
    } else if (response.status === 401) {
      // JWT is expired, refresh the token
      const res = await refreshToken();

      if (res === 200) {
        // Try to logout again
        await logout();
      } else {
        console.log("Error refreshing token. login again");
        return 200;
      }
    } else {
      Alert.alert(
        "Logout Failed",
        "Something went wrong. Please try again later."
      );
    }

    return response.status;
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    console.log(error);
    return 500;
  }
};

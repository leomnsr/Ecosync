import { Consumption } from "./Consumption";
import { House, HouseType } from "./House";
import { Sync } from "./Sync";
import { requestSync } from "../Requests/sync";
import { requestConsumption, patchConsumption } from "../Requests/consumption";
import { requestHouse, patchHouse } from "../Requests/house";

export class UserData {
  private static instance: UserData;
  private consumption: Consumption;
  private house: House;
  private sync: Sync;

  constructor() {
    this.consumption = {
      userId: 0,
      electricity: 0,
      water: 0,
      cityGas: 0,
      propaneGas: 0,
      bottleGas: 0,
      bottleQuantity: 0,
    };

    this.house = {
      userId: 0,
      houseArea: 0,
      houseType: HouseType.House,
      inhabitants: 0,
      linkyNumber: "",
    };

    this.sync = {
      userId: 0,
      electricityImpact: 0,
      electricityGrade: 100,
      waterImpact: 0,
      waterGrade: 100,
      gasImpact: 0,
      gasGrade: 100,
      grade: 100,
      readingDate: new Date(),
    };
  }

  getConsumption(): Consumption {
    return this.consumption;
  }

  setConsumption(consumption: Consumption): void {
    this.consumption = consumption;
  }

  getConsumptionAttribute(attribute: string): number {
    switch (attribute) {
      case "electricity":
        return this.consumption.electricity;
      case "water":
        return this.consumption.water;
      case "cityGas":
        return this.consumption.cityGas;
      case "propaneGas":
        return this.consumption.propaneGas;
      case "bottleGas":
        return this.consumption.bottleGas;
      case "bottleQuantity":
        return this.consumption.bottleQuantity;
      default:
        return 0;
    }
  }

  setConsumptionAttribute(attribute: string, value: number): void {
    switch (attribute) {
      case "electricity":
        this.consumption.electricity = value;
        break;
      case "water":
        this.consumption.water = value;
        break;
      case "cityGas":
        this.consumption.cityGas = value;
        break;
      case "propaneGas":
        this.consumption.propaneGas = value;
        break;
      case "bottleGas":
        this.consumption.bottleGas = value;
        break;
      case "bottleQuantity":
        this.consumption.bottleQuantity = value;
        break;
      default:
        break;
    }
  }

  getHouse(): House {
    return this.house;
  }

  setHouse(house: House): void {
    this.house = house;
  }

  getHouseAttribute(attribute: string): number | string {
    switch (attribute) {
      case "houseArea":
        return this.house.houseArea;
      case "houseType":
        return this.house.houseType;
      case "inhabitants":
        return this.house.inhabitants;
      case "linkyNumber":
        return this.house.linkyNumber;
      default:
        return "";
    }
  }

  setHouseAttribute(attribute: string, value: number | string): void {
    switch (attribute) {
      case "houseArea":
        this.house.houseArea = value as number;
        break;
      case "houseType":
        this.house.houseType = value as HouseType;
        break;
      case "inhabitants":
        this.house.inhabitants = value as number;
        break;
      case "linkyNumber":
        this.house.linkyNumber = value as string;
        break;
      default:
        break;
    }
  }

  getSync(): Sync {
    return this.sync;
  }

  setSync(sync: Sync): void {
    this.sync = sync;
  }

  getSyncAttribute(attribute: string): number | string {
    switch (attribute) {
      case "electricityImpact":
        return this.sync.electricityImpact;
      case "electricityGrade":
        return this.sync.electricityGrade;
      case "waterImpact":
        return this.sync.waterImpact;
      case "waterGrade":
        return this.sync.waterGrade;
      case "gasImpact":
        return this.sync.gasImpact;
      case "gasGrade":
        return this.sync.gasGrade;
      case "grade":
        return this.sync.grade;
      case "readingDate":
        return this.sync.readingDate.toString(); // Convert Date to string
      default:
        return "";
    }
  }

  public static getInstance(): UserData {
    if (!UserData.instance) {
      UserData.instance = new UserData();
    }
    return UserData.instance;
  }

  public async updateSync(): Promise<void> {
    const syncData = await requestSync();
    if (syncData) {
      this.sync = {
        userId: syncData.userid,
        electricityImpact: syncData.electricityimpact,
        electricityGrade: syncData.electricitygrade,
        waterImpact: syncData.waterimpact,
        waterGrade: syncData.watergrade,
        gasImpact: syncData.gasimpact,
        gasGrade: syncData.gasgrade,
        grade: syncData.grade,
        readingDate: new Date(syncData.readingdate),
      };
    } else {
      console.error("Error", "syncData was nul");
    }
  }

  public async updateConsumption(): Promise<void> {
    const consumptionData = await requestConsumption();
    if (consumptionData) {
      this.consumption = {
        userId: consumptionData.userId,
        electricity: consumptionData.electricity,
        water: consumptionData.water,
        cityGas: consumptionData.cityGas,
        propaneGas: consumptionData.propaneGas,
        bottleGas: consumptionData.bottleGas,
        bottleQuantity: consumptionData.bottleQuantity,
      };
    } else {
      console.error("Error", "consumptionData was nul");
    }
  }

  public async updateHouse(): Promise<void> {
    const houseData = await requestHouse();
    if (houseData) {
      this.house = {
        userId: houseData.userId,
        houseArea: houseData.houseArea,
        houseType: houseData.houseType,
        inhabitants: houseData.inhabitants,
        linkyNumber: houseData.linkyNumber,
      };
    } else {
      console.error("Error", "houseData was nul");
    }
  }

  public async updateProfile(): Promise<void> {
    await Promise.all([this.updateConsumption(), this.updateHouse()]);
  }

  public async sendConsumption(): Promise<void> {
    const response = await patchConsumption(this.consumption);
    if (!response) {
      console.error("Error", "Failed to update consumption data.");
    }
  }

  public async sendHouse(): Promise<void> {
    const response = await patchHouse(this.house);
    if (!response) {
      console.error("Error", "Failed to update house data.");
    }
  }

  public async sendProfileUpdates(): Promise<void> {
    await this.sendConsumption();
    await this.sendHouse();
    console.log("Profile updated with:", this.consumption, this.house);
  }
}

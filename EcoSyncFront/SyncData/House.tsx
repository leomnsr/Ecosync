export enum HouseType {
  Appartement = 0,
  House = 1,
}

export interface House {
  userId: number;
  houseArea: number;
  houseType: HouseType;
  inhabitants: number;
  linkyNumber: string;
}

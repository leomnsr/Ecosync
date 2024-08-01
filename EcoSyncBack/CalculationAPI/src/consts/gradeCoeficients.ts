const electricityCoeficient = -0.378;
const gasCoeficient = -0.061;
const waterCoeficient = -0.016;

export type coefType = "electricity" | "gas" | "water";
type Coeficients = {
  electricity: number;
  gas: number;
  water: number;
};

export const coeficients: Coeficients = {
  electricity: electricityCoeficient,
  gas: gasCoeficient,
  water: waterCoeficient,
};

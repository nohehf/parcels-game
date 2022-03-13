type costElem = IComposable | number;

export interface Composable {
  tokenId: number;
  name: string;
  kind: number;
  level: number;
  price: number;
  boost: number;
  maximum: number;
}

export interface IComposable {
  name: string;
  income: number;
  img: string;
  cost: costElem[];
}

export const farm: IComposable = {
  name: "Farm",
  income: 50,
  img: "./farm.png",
  cost: [100],
};

export const castle: IComposable = {
  name: "Castle",
  income: 100,
  img: "./castle.png",
  cost: [100, farm],
};

export enum action {
  BUILD = "Build",
  CRAFT = "Craft",
  REMOVE = "Remove",
  NONE = "",
}

export enum display {
  FULL = "full",
  MIN = "min",
}

export interface Parcel {
  posX: number;
  posY: number; //Parcel posY  `8`
  // fixed, contract logic
  tokenId: number;
  // mutable, user logic
  name: string; //Parcel name `my_super_parcel`
  // mutable, contract logic
  dna: number; //Parcel dna `22_22`
  lastClaimTime: number; //Parcel lastClaimTime : 1646771741 timestamp
  productionRate: number; //Parcel production_rate : $10Res/timestamp

  owner: string;
  metadata: any;
}

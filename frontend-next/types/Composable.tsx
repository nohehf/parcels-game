type costElem = IComposable | number;

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
}

export enum display {
  FULL = "full",
  MIN = "min",
}

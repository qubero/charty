import { Point } from "../types";

const getRandomIntInclusive = (min = 0, max = Date.now()) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export type GeneratePointsArgs = {
  min: number;
  max: number;
  length: number;
};

export type GeneratePoints = (
  arg0: GeneratePointsArgs,
  getRandom: typeof getRandomIntInclusive
) => Point[];

const generatePoints: GeneratePoints = ({ min, max, length }, getRandom) => {
  return [...new Array(length)]
    .map((item: Point) => (item = [getRandom(), getRandom(min, max)]))
    .sort((a, b) => a[0] - b[0]);
};

export { generatePoints, getRandomIntInclusive };

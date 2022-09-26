export type Point = [number, number];

export interface ChartData {
  id: string;
  dataProvider: string;
  type: string;
  title: string;
  color: string;
  data: Point[];
}

export type Filters = Record<string, number>;

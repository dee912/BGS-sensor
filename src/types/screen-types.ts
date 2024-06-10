type ObservationsItem = {
  "@iot.id": string;
  result: number;
  resultTime: number;
  phenomenonTime: Date;
  resultQuality: {};
};

type ObservationsData = {
  value: ObservationsItem[];
};

type FoiItem = {
  "@iot.id": string;
  name: string;
  "Observations@iot.navigationLink": RequestInfo | URL;
};

type FoiData = {
  value: FoiItem[];
};

type ItemClickDetails = {
  id: string;
};

export type {
  ObservationsItem,
  ObservationsData,
  FoiItem,
  FoiData,
  ItemClickDetails,
}
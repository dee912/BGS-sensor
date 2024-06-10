import { FoiData, ItemClickDetails, ObservationsData } from "./screen-types";

type FoiDropdownProps = FoiData & {
  onClick: (event: CustomEvent<ItemClickDetails>) => Promise<void>;
  name: string;
};

type ObservationDropdownProps = ObservationsData & {
  onClick: (event: CustomEvent<ItemClickDetails>) => Promise<void>;
  name: string;
};

export type { FoiDropdownProps, ObservationDropdownProps };

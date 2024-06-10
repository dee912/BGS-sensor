import './component.css';
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import { FoiDropdownProps } from "../types/component-types";

export const FeatureOfInterestDropdown = ({
  onClick,
  name,
  value,
}: FoiDropdownProps) => {
  return (
    <div className="dropdown">
      <p className='dropdown-title'>Feature of interest</p>
      <ButtonDropdown
        onItemClick={onClick}
        items={value.map((item) => ({
          text: item.name,
          id: item["@iot.id"],
          disabled: false,
        }))}
      >
        {name}
      </ButtonDropdown>
    </div>
  );
};

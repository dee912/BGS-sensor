import './component.css';
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import { ObservationDropdownProps } from "../types/component-types";

export const ObservationDropdown = ({
  onClick,
  name,
  value,
}: ObservationDropdownProps) => {
  return (
    <div className="dropdown">
      <p className='dropdown-title'>Sensors</p>
      <ButtonDropdown
        onItemClick={onClick}
        items={value.map((item) => ({
          text: item["@iot.id"],
          id: item["@iot.id"],
          disabled: false,
        }))}
      >
        {name}
      </ButtonDropdown>
    </div>
  );
};

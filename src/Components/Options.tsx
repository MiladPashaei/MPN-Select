import React from "react";
type Iprops = {
  value: string | number;
  title: string | number;
  disable?: boolean;
  handleClick?: any;
  displayValue?: [];
  children?: any;
  searchValue?: any;
};
export default function Options({
  value,
  title,
  disable,
  handleClick,
  displayValue,
  searchValue,

  ...props
}: Iprops) {
  let condition = displayValue?.some(
    (x: any) => x.id.toString() === value.toString()
  );
  console.log(displayValue);

  let showCondition = () => {
    let showingCondition = title
      ?.toString()
      .toLowerCase()
      .includes(searchValue.toString().toLowerCase());
    if (showingCondition) {
      return (
        <div
          className={
            condition ? "CustomSelectOption active" : "CustomSelectOption"
          }
          onClick={() => handleClick({ id: value, title })}
        >
          <span>{title}</span>
          {props.children}
          {condition && (
            <span className="CustomSelectOption--icon"> {">"} </span>
          )}
        </div>
      );
    } else {
      return null;
    }
  };
  return showCondition();
}

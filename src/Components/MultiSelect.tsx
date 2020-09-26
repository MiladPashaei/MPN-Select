import React, { useEffect, useRef, useState } from "react";
type TOptions = { id: string | number; title: string };
type IProps = {
  options?: TOptions[] | null;
  value?: number[] | string;
  placeholder?: string;
  onChange?: (id: any) => void;
  children?: any;
};

export default function MultiSelect(props: IProps) {
  const [displayValue, setDisplayValue] = useState<TOptions[]>([]);
  const [recivedProps, setRecivedProps] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [inputClick, setInputClick] = useState(false);
  const wrapperRef: any = useRef();
  const searchRef: any = useRef();

  useEffect(() => {
    const { children } = props;
    let newValues: any[] = [];
    React.Children.forEach(children, (child) => {
      let newObj: TOptions = {
        id: child.props.value,
        title: child.props.title,
      };
      console.log("render");
      newValues.push(newObj);
      // setDisplayValue([...displayValue, newObj]);

      return;
    });
    if (props.value) {
      let selectedValues: any = [];
      if (typeof props.value === "string") {
        let valueprops = props.value.split(",");
        selectedValues = newValues.filter((x) =>
          valueprops.some((y) => y?.toString() === x?.id?.toString())
        );
      } else {
        let valueprops = props.value;
        selectedValues = newValues.filter((x) =>
          valueprops.some((y) => y?.toString() === x?.id?.toString())
        );
      }
      if (selectedValues.length > 0) {
        setDisplayValue(selectedValues);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (wrapperRef.current) {
        if (!wrapperRef.current.contains(event.target)) {
          setInputClick(false);
          setSearchValue("");
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef]);

  function childGenerator() {
    const { children } = props;
    let childrenWithProps = React.Children.map(children, (child) => {
      let newObj: TOptions = { id: child.value, title: child.title };
      // setDisplayValue([...displayValue, newObj]);

      return React.cloneElement(child, {
        handleClick,
        displayValue,
        searchValue,
      });
    });

    return childrenWithProps;
  }

  function handleClick(item: TOptions, e: any) {
    setSearchValue("");
    searchRef.current.focus();
    if (
      displayValue.findIndex((x) => x.id.toString() === item.id.toString()) ===
      -1
    ) {
      if (props.onChange) {
        const ids = displayValue.map((value) => value.id.toString());

        props.onChange([...ids, item.id.toString()]);
      }
      // setInputClick(false);
      setDisplayValue([...displayValue, item]);
    } else {
      clearItem(item.id.toString(), e);
    }
  }
  // make
  function handleInputClick() {
    setInputClick((prev) => {
      !prev && searchRef.current.focus();
      return !prev;
    });
  }
  // changing value of input
  function handleInputChange(e: any) {
    setSearchValue(e.target.value);
  }

  // this function will recive selected item id to find and delete it from allItems
  function clearItem(itemId: string | number, e?: any) {
    e && e.stopPropagation();
    const newdisplayValues = displayValue.filter(
      (x) => x.id.toString() !== itemId.toString()
    );
    setDisplayValue([...newdisplayValues]);
    if (props.onChange) {
      const ids = newdisplayValues.map((value) => value.id.toString());

      props.onChange(ids);
    }
  }
  return (
    <bdo dir="rtl">
      <div className="CustomSelectContainer " ref={wrapperRef}>
        <div
          className={
            inputClick ? "CustomSelectInput active" : "CustomSelectInput"
          }
          onClick={handleInputClick}
        >
          <div className="select__item--wrapper">
            {displayValue &&
              displayValue.map((value: TOptions) => {
                if (
                  recivedProps &&
                  recivedProps.indexOf(value?.id?.toString()) !== -1
                ) {
                  return (
                    <div
                      onClick={(e) => clearItem(value.id, e)}
                      key={value.id}
                      className="select__item--box"
                    >
                      <span
                        onClick={(e) => clearItem(value.id, e)}
                        className="select__item--box-name"
                      >
                        {value.title}
                      </span>
                      <span
                        className="select__item-clearSelect"
                        onClick={(e) => clearItem(value.id, e)}
                      >
                        x
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={value.id} className="select__item--box">
                    <span className="select__item--box-name">
                      {value.title}
                    </span>
                    <span
                      className="select__item-clearSelect"
                      onClick={(e) => clearItem(value.id, e)}
                    >
                      x
                    </span>
                  </div>
                );
              })}
            <input
              tabIndex={1}
              onChange={handleInputChange}
              ref={searchRef}
              maxLength={10}
              value={searchValue}
              // style={{ width: 8 * (searchValue.length + 1) + "px" }}
            />
            {!displayValue ? (
              <span className="selectPlaceholder"> {props.placeholder} </span>
            ) : null}
          </div>
        </div>
        <div
          className={
            inputClick
              ? "CustomSelectOptions"
              : "CustomSelectOptions CustomSelectOptionshide"
          }
        >
          <div className="select__items--wrapper">{childGenerator()}</div>
        </div>
      </div>
    </bdo>
  );
}

// useEffect(() => {
//     if (props.value && props.options) {
//         const selectedValues: TOptions[] = props.options.filter((x) =>
//             props.value?.some((y) => x.id.toString() === y.toString()),
//         );
//         if (selectedValues.length > 0) {
//             setDisplayValue(selectedValues);
//         }
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [props.value, props.options]);

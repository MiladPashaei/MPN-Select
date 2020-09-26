import React from "react";
import "./App.scss";
import MultiSelect from "./Components/MultiSelect";
import Options from "./Components/Options";

function App() {
  let test = [
    { id: 1, title: "milad" },
    { id: 2, title: "mehran" },
  ];
  function handleChange(e: any) {
    console.log(e);
  }
  return (
    <div className="App">
      <MultiSelect onChange={handleChange} value={[2]}>
        {test.map((item) => {
          let condition = item.id === 1;
          return (
            <Options
              disable={condition}
              key={item.id}
              title={item.title}
              value={item.id}
            />
          );
        })}
      </MultiSelect>
    </div>
  );
}

export default App;

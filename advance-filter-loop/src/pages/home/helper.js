import { Checkbox } from "antd";
import { useContext, useMemo, useState } from "react";
import { List } from "react-virtualized";
import { DataContext } from "../../DataContext";

export function CustomFilter({ mod }) {
  const { data, filteredRows, setFilteredRows } = useContext(DataContext);
  const [checkedOptions, setCheckedOptions] = useState([]);

  const filterValues = useMemo(() =>
    new Array(mod).fill().map((value, ind) => ind)
  );
  const handleCheck = (e) => {
    let arr1 = [...checkedOptions];
    let modType = e.target.name;
    let modValue = e.target.value;
    if (e.target.checked) {
      arr1.push({ modType, modValue });
      console.log(arr1);
      setCheckedOptions([...arr1]);
    }
  };

  const handleFiltering = () => {
    let result = [...filteredRows];
    checkedOptions.forEach((option) => {
      const { modType, modValue } = option;
      console.log(modType, modValue);
      const response = result.length
        ? result.filter((row) => row[modType] == modValue)
        : data.filter((row) => row[modType] == modValue);
      result=response;
    });
    setFilteredRows([...result]);
  };

  const renderCustomFilter = ({ index, key, style }) => (
    <Checkbox
      key={key}
      style={style}
      name={`mod${mod}`}
      value={filterValues[index]}
      onChange={handleCheck}
    >
      {filterValues[index]}
    </Checkbox>
    // <Checkbox.Group key={key} style={style} onChange={handleCheck} options={filterValues}/>
  )
  console.log("result", filteredRows);
  return (
    <div>
      <List
        width={100}
        height={200}
        rowRenderer={renderCustomFilter}
        rowCount={filterValues.length}
        rowHeight={30}
      />
      <footer>
        <button onClick={handleFiltering}>OK</button>
      </footer>
    </div>
  );
}

export const columns = [
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Modolus 350",
    dataIndex: "mod350",
    key: "mod350",
    onFilter: (value, record) => record.mod3 === value,
    filterDropdown: <CustomFilter mod={350} />,
  },
  {
    title: "Modolus 8000",
    dataIndex: "mod8000",
    key: "mod8000",
    filterDropdown: <CustomFilter mod={8000} />,
    onFilter: (value, record) => record.mod4 === value,
  },
  {
    title: "Modolus 20002",
    dataIndex: "mod20002",
    key: "mod20002",
    filterDropdown: <CustomFilter mod={20002} />,
    onFilter: (value, record) => record.mod5 === value,
  },
  //   {
  //     title: "Modolus 6",
  //     dataIndex: "mod6",
  //     key: "mod6",
  //     filters: generateFilterValues(6),
  //     onFilter: (value, record) => record.mod6 === value,
  //   },
];

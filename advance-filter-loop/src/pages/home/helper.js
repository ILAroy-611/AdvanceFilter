import { Checkbox } from "antd";
import { useContext, useMemo, useState } from "react";
import { List } from "react-virtualized";
import { DataContext } from "../../DataContext";
import ButtonAntd from "../../components/button/ButtonAntd";
import './home.css';


export function CustomFilter({ mod }) {

  const { data, filteredRows, setFilteredRows } = useContext(DataContext);
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [search, setSearch] = useState("");
  const initialFilterValues = new Array(mod).fill().map((value, ind) => ind)
  const [filterValues, setFilterValues] =  useState(initialFilterValues);

  const handleCheck = (e) => {
    let arr1 = [...checkedOptions];
    let modType = e.target.name;
    let modValue = e.target.value;
    if (e.target.checked) {
      arr1.push({ modType, modValue });
      console.log(arr1);
      setCheckedOptions([...new Set(arr1)]);
    }
    else if(!e.target.checked && arr1.includes(modValue)){
      console.log(!e.target.checked , arr1.includes(modValue))
      arr1.splice(arr1.indexOf(modValue),1);
      setCheckedOptions([...arr1]);
    }
  };

  const handleFiltering = () => {
    let result = [...filteredRows];
    let arr2=[];
    checkedOptions.forEach((option) => {
      const { modType, modValue } = option;
      console.log(modType, modValue);
      const response = result.length
        ? result.filter((row) => row[modType] == modValue)
        : data.filter((row) => row[modType] == modValue);
      arr2.push(...response);
      console.log('result',arr2)
    });
    setFilteredRows([...arr2]);
  };

  const handleSearch=(e)=>{
    setSearch(e.target.value);
    const allSearchedFiltervalues= initialFilterValues.filter(opt=>opt.toString().includes(e.target.value));
    console.log(allSearchedFiltervalues);
    setFilterValues([...allSearchedFiltervalues]);
  }

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
  )
  
  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} className="filter-search"/>
      <List
        width={160}
        height={200}
        rowRenderer={renderCustomFilter}
        rowCount={filterValues.length}
        rowHeight={30}
        className="virtual-list"
      />

      <footer className="filter-footer">
        <ButtonAntd handleClick={handleFiltering}>OK</ButtonAntd>
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

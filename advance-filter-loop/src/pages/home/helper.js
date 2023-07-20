import { Checkbox } from "antd";
import { useContext, useMemo } from "react";
import { List } from "react-virtualized";
import { DataContext } from "../../DataContext";

export function CustomFilter({ mod }) {

  const { data,setData } = useContext(DataContext);
  const filterValues = useMemo(() =>
    new Array(mod).fill().map((value, ind) => ind)
  );
  const handleCheck=(e)=>{
    if(e.target.checked){
      console.log(e.target.value);
      console.log(data[0])
      console.log(data.filter(obj=>obj.mod350===e.target.value.toString()))
    }
    
  };

  const handleFiltering=()=>{

  }
  const renderCustomFilter = ({ index, key, style }) => (
    <Checkbox key={key} style={style} value={filterValues[index]} onChange={handleCheck}>
      {filterValues[index]}
    </Checkbox>
    // <Checkbox.Group key={key} style={style} onChange={handleCheck} options={filterValues}/>
  );

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

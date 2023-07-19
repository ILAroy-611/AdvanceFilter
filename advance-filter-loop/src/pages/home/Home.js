import { useContext, useEffect, useMemo } from "react";
import { DataContext } from "../../DataContext";
// import DataSetSmall from "../../data/dataset_small.csv";
import DataSetLarge from "../../data/dataset_large.csv";
import Papa from "papaparse";
import DataTable from "../../components/dataTable/DataTable";
import { columns } from "./helper";

function Home() {
  const { data, setData } = useContext(DataContext);

  const generateFilterValues = (mod) => {
    let filterValues = [];
    for (let i = 0; i < mod; i++) {
      filterValues.push({ text: i.toString(), value: i.toString() });
    }
    return filterValues;
  };
  
  const memoGenerateFilterValues350= useMemo(()=>generateFilterValues(350),[]);
  const memoGenerateFilterValues8000= useMemo(()=>generateFilterValues(8000),[]);
  const memoGenerateFilterValues20002= useMemo(()=>generateFilterValues(20002),[]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(DataSetLarge);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  columns.forEach(col=>{
    if(col.key="mod350")col["filters"]=memoGenerateFilterValues350
    if(col.key="mod8000")col["filters"]=memoGenerateFilterValues8000
    if(col.key="mod20002")col["filters"]=memoGenerateFilterValues20002
    
  })
  //   console.log(data)
  return (
    <>{data !== null ? <DataTable columns={columns} data={data} /> : <></>}</>
  );
}

export default Home;

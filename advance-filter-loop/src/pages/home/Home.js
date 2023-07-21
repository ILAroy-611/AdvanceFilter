import { useContext, useEffect } from "react";
import { DataContext } from "../../DataContext";
// import DataSetSmall from "../../data/dataset_small.csv";
import DataSetLarge from "../../data/dataset_large.csv";
import Papa from "papaparse";
import DataTable from "../../components/dataTable/DataTable";
import { columns } from "./helper";

function Home() {
  const { data, filteredRows, setData } = useContext(DataContext);

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

  // console.log(data)
  return (
    <>
      {data?.length ? (
        <DataTable
          columns={columns}
          data={filteredRows.length == 0 ? data : filteredRows}
          pagination={{ pageSize: 100, total: filteredRows.length == 0 ? data?.length : filteredRows?.length  }}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Home;

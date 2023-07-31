import { createContext, useState } from "react";

export const DataContext = createContext();
const { Provider } = DataContext;

const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [filteredRows, setFilteredRows] = useState([]);
  return (
    <Provider value={{ data, setData, filteredRows, setFilteredRows }}>
      {children}
    </Provider>
  );
};

export default DataProvider;

import { createContext, useState } from "react";

export const DataContext = createContext();
const { Provider } = DataContext;

const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  return (
  <Provider value={{data,setData}}>
    {children}
</Provider>);
};

export default DataProvider;

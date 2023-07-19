import { useMemo } from "react";
// import { FiFilter } from "react-icons/fi";


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
  },
  {
    title: "Modolus 8000",
    dataIndex: "mod8000",
    key: "mod8000",
    // filters: generateFilterValues(8000),
    onFilter: (value, record) => record.mod4 === value,
  },
  {
    title: "Modolus 20002",
    dataIndex: "mod20002",
    key: "mod20002",
    // filters: generateFilterValues(20002),
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

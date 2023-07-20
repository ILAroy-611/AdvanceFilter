import { Table } from "antd";

function DataTable({ columns, data, pagination }) {
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={pagination} />;
    </div>
  );
}

export default DataTable;

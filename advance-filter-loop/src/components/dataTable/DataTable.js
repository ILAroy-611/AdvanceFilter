import { Table } from 'antd'


function DataTable({columns,data}) {
  return (
    <div>
        <Table columns={columns} dataSource={data} />;
    </div>
  )
}

export default DataTable
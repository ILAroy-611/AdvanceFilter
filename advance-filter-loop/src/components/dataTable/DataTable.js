import { Table } from "antd";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import "./datatable.css";

function DataTable({ columns, data, pagination }) {
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);
  const [records, setrecords] = useState(itemsPerPage);

  const loadMore = () => {
    if (records === data.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setrecords(records + itemsPerPage);
      }, 100);
    }
  };

  const showItems = (data) => {
    let newArr = [...data];
    let visibleData = newArr.slice(0, records);
    return (
      <Table
        columns={columns}
        dataSource={visibleData}
        pagination={pagination}
        scroll={{ scrollToFirstRowOnChange: true }}
      />
    );
  };

  return (
    <div className="data-table">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        // loader={<h4 className="loader">Loading...</h4>}
      >
        {showItems(data)}
      </InfiniteScroll>
    </div>
  );
}

export default DataTable;

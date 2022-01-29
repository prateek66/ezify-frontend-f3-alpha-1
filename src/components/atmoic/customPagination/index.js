import React from "react";
import { Pagination } from "react-bootstrap";

import "./customPagination.scss";

const CustomPagination = ({ records, pageSize, page, setPage }) => {
  return (
    <Pagination className="customPagination">
      {records.map((_, index) => {
        if (index % pageSize === 0) {
          return (
            <Pagination.Item key={index + 1} active={index / pageSize + 1 === page} onClick={() => setPage(index === 0 ? 1 : index / pageSize + 1)}>
              {index === 0 ? 1 : index / pageSize + 1}
            </Pagination.Item>
          );
        }
      })}
    </Pagination>
  );
};

export default CustomPagination;

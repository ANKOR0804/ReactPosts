import React from 'react';
import {getPagesArray} from "../../../utils/pagination";

const Pagination = ({totalPages, page, changePage}) => {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className="pagination">
      {pagesArray.map(item =>
        <span className={page === item ? 'pagination__item pagination__item--active' : 'pagination__item'}
              onClick={() => changePage(item)}
              key={item}>
            {item}
          </span>
      )}
    </div>
  );
};

export default Pagination;
import {useMemo} from 'react';

export const usePagination = (totalPages) => {
  const pagesArray = useMemo(() => {
    let pagesArray = [];

    for (let i = 0; i < totalPages; i++) {
      pagesArray.push(i + 1);
    }

    console.log(pagesArray)
  }, [totalPages]);

  return pagesArray
}
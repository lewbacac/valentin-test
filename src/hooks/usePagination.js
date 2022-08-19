import { useEffect, useState } from "react";

function usePagination(dataLength, itemsPerPageCount) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
 
  useEffect(() => {
    if(dataLength && itemsPerPageCount) {
      setPagesCount(Math.ceil(dataLength / itemsPerPageCount));
      setCurrentPage(1);
    }
  } , [dataLength, itemsPerPageCount]);
  
  const [startIndex, setStartIndex] = useState(0 + itemsPerPageCount * (currentPage - 1));
  const [endIndex, setEndIndex] = useState(itemsPerPageCount * currentPage);
  useEffect(() => {
    setStartIndex(0 + itemsPerPageCount * (currentPage - 1));
    setEndIndex(itemsPerPageCount * currentPage);
  } , [currentPage, itemsPerPageCount]);

  const setPreviousPage = i => setCurrentPage(currentPage - 1);
  const setPage = i => setCurrentPage(i);
  const setNextPage = i => setCurrentPage(currentPage + 1);
  const nextEnabled = currentPage < pagesCount;
  const previousEnabled = currentPage > 1;
  return {
    currentPage, pagesCount, startIndex, endIndex, setPage, setNextPage, 
    setPreviousPage, nextEnabled, previousEnabled
  };
}

export default usePagination;
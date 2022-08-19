import { useEffect, useState } from "react";
import "./peopleList.css";
import usePagination from "../hooks/usePagination";

function PeopleList({ data }) {
  const [itemsPerPageCount, setItemsPerPageCount] = useState(3);
  const [filteredData, setFilteredData] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const {
     currentPage, 
     setNextPage, 
     setPreviousPage, 
     setPage, 
     pagesCount, 
     nextEnabled, 
     previousEnabled,
     startIndex,
     endIndex
 } = usePagination(filteredData?.length, itemsPerPageCount);

  useEffect(() => {
    if(searchValue) {
      const filtered = data.filter(person => person.firstName.toUpperCase().includes(searchValue.toUpperCase()) || person.lastName.toUpperCase().includes(searchValue.toUpperCase()));
      if(JSON.stringify(filtered) !== JSON.stringify(filteredData)) setFilteredData(filtered);
    } else if(searchValue === "") {
      setFilteredData(data);
    }
  }, [data, filteredData, searchValue]);
  return (
    <div className="people-list">
      <div className="people-list-header">
        <input type="text" placeholder="Enter Keyword" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
        <div className="pagination">
          { filteredData && filteredData.length > 0 && Array(pagesCount).fill().map((_, i) => (
          <button key={i} className={(i + 1 === currentPage ? "button active" : "button")} onClick={() => setPage(i + 1)}>{i + 1}
          </button>)
          )}
          { previousEnabled && (
          <button className="button switch-page" onClick={setPreviousPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>
          </button>)}
          { nextEnabled && (
          <button className="button switch-page" onClick={setNextPage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
          </button>)}
        </div>
        <label htmlFor="perPage">Per Page</label>
        <select name="perPage" id="perPage" defaultValue={"3"} onChange={
          (e) => e.target.value === "all" ? setItemsPerPageCount(filteredData.length) : setItemsPerPageCount(Number(e.target.value))
        }>
          <option value="1">--- 1 ---</option>
          <option value="3">--- 3 ---</option>
          <option value="5">--- 5 ---</option>
          <option value="all">--- All ---</option>
        </select>
      </div>
      { (filteredData && filteredData.length > 0 ) 
      ? (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Department</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            { filteredData && filteredData.slice(startIndex, endIndex).map(person => (
              <tr key={person.id}>
                <td><img className="avatar" alt={person.firstName} src={`http://apis.chromeye.com:9191${person.avatar.formats.thumbnail.url}`} /></td>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td><a href={`mailto: ${person.email}`}>{person.email}</a></td>
                <td>{person.company.name}</td>
                <td>{person.company.department}</td>
                <td>{person.company.startDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>No matched people found</p>}
    </div>
  );
}

export default PeopleList;
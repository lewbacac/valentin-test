import PeopleList from "./components/peopleList";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://apis.chromeye.com:9191/people")
      .then(response => response.json())
      .then(people => setData(people));
  }, []);

  return (
    <div className="container">
      <PeopleList data={data}/>
    </div>
  );
}

export default App;

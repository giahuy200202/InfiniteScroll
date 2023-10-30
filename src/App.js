import React, { useState, useEffect } from "react";
const App = () => {
  const accessKey = "fZPvD5cHD-hbV_rtKL2VhKs-DR9BJRki1PhgenaDl0U";
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [dataSubmit, setDataSubmit] = useState("");

  const submit = () => {
    fetchRequest();
    setDataSubmit(img);
  };

  const fetchRequest = async () => {
    setIsSearchDone(false);
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${accessKey}&per_page=10000`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    setIsSearchDone(true);
    console.log(result);
    setRes(result);
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="container">
      <div className="nav">
        <div className="title">Infinite Scroll</div>
        <div className="search-container">
          <input
            className="input-container"
            type="text"
            placeholder="Search..."
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
            }}
          />  
          <button className="button-container" type="submit" onClick={submit}>
            Search
          </button>
        </div>
      </div>
      {isSearchDone ? (
        <div className="img-containter">
          {dataSubmit!=="" ? (
            <div className="result-title">Results for "{dataSubmit}"</div>
          ) : (
            <div></div>
          )}
          {res.map((val, index) => {
            return (
              <img
                key={index}
                className="each-img"
                src={val.urls.small}
                alt="val.alt_description"
              />
            );
          })}
        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
};
export default App;

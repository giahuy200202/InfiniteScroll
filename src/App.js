import React, { useState, useEffect } from "react";
const App = () => {
  const accessKey = "fZPvD5cHD-hbV_rtKL2VhKs-DR9BJRki1PhgenaDl0U";
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);

  const submit = () => {
    fetchRequest();
    setImg("");
  };

  const fetchRequest = async () => {
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${accessKey}&per_page=20`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    console.log(result);
    setRes(result);
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="container">
      <div className="nav">
        <div>Infinite Scroll</div>
        <div className="search-container">
          <input
            className="input-container"
            type="text"
            placeholder="Search..."
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <button className="button-container" type="submit" onClick={submit}>
            Search
          </button>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-evenly flex-wrap">
        {res.map((val) => {
          return (
            <>
              <img
                className="col-3 img-fluid img-thumbnail"
                src={val.urls.small}
                alt="val.alt_description"
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
export default App;

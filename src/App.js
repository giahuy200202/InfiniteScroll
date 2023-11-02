import React, { useState, useEffect, useRef, useCallback } from "react";

const App = () => {
  const accessKey = "fZPvD5cHD-hbV_rtKL2VhKs-DR9BJRki1PhgenaDl0U";
  const [img, setImg] = useState("random");
  const [res, setRes] = useState([]);
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [dataSubmit, setDataSubmit] = useState("random");
  const [page, setPage] = useState(1);

  const submit = () => {
    fetchRequest(1);
    setDataSubmit(img);
  };

  const fetchRequest = async (page) => {
    setIsSearchDone(false);
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${img}&client_id=${accessKey}&per_page=10`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    setIsSearchDone(true);
    console.log('res: ', res);
    console.log('result: ', result);
    page === 1 ? setRes(result) : setRes(current => [...current, ...result]);
  };

  useEffect(() => {
    fetchRequest(page);
  }, [page]);

  const loadMore = () =>{
    setPage(prevPage => prevPage + 1)
  }

  console.log(page);

  let num = 1;  

  const intersectionObserver = useRef();

  const lastRef = useCallback((element)=>{
    if (!isSearchDone) return;
    if (intersectionObserver.current) intersectionObserver.current.disconnect();
    intersectionObserver.current = new IntersectionObserver((el) => {
      if (el[0].isIntersecting) {
        loadMore();
      }
    });
    if (element) intersectionObserver.current.observe(element);
  }, [isSearchDone, loadMore]);


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
          {dataSubmit !== "random" ? (
            <div className="result-title">Results for "{dataSubmit}"</div>
          ) : (
            <div></div>
          )}
          {res.map((val, index) => {
            if (index + 1 == res.length) {
              return <img key={index} ref={lastRef} className="each-img" src={val.urls.small} alt={val.alt_description} />
            }
            return (
              <img
                key={index}
                className="each-img"
                src={val.urls.small}
                alt="val.alt_description"
              />
            );
          })}
          <div className="spinner"></div>
        </div>
        
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
};
export default App;

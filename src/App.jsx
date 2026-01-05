import React, { useEffect, useState } from "react";
import axios from "axios";
const App =() => {
  const [userData, setUserData] = useState([])
  const [index,setIndex] = useState(1)

  const getData = async () => {
   const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=20`)
    setUserData(response.data)
    console.log(response.data);
  }

  useEffect(function(){
    getData()
  },[index])

  function prevPage(){
    if (index>0)   
    setIndex(index-1);
    setUserData([]);
  }

  function nextPage(){
    setIndex(index+1);
    setUserData([]);
  }

 return (
   <div>

      <div style={{ display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "2px",
    padding: "20px" }}>
        {userData.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",  
              width: "100%",
              height: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          <h2 style={{ color: "black" }}>loading...</h2>
        </div>
          ) : (
          userData.map((elem) => (
            <div key={elem.id}>
              <a href={elem.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={elem.download_url}
                  alt="pic"
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: "10px",
                    borderRadius: "10px",
                  }}
                />
              </a>
            </div>
            
          ))
        )}
      </div>
      <span style={{display:"flex",gap:"20px",justifyContent:"center"}}>
        <button style={{backgroundColor:"yellowgreen",padding:"10px",font:"-moz-initial"}} onClick={prevPage}>Prev</button>
        <button style={{backgroundColor:"yellowgreen",padding:"10px",font:"-moz-initial"}} onClick={nextPage}>Next</button>
      </span>
    </div>
  );
};

export default App;
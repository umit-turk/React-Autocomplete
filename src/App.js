import React, { useEffect, useRef, useState } from "react";

/* const data = [
  {
    id: 1,
    title: "test 1",
  },
  {
    id: 2,
    title: "Test 2",
  },
  {
    id: 3,
    title: "test 3",
  },
  {
    id: 4,
    title: "Test 4",
  },
]; */

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false)
  const searchRef = useRef();

  const isTyping = search.replace(/\s+/, "").length > 0;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
   if(searchRef.current && !searchRef.current.contains(e.target)){
     setSearch('')
   }
  };

  const getResultItem = (item) => {
    console.log(item)
  }

  useEffect(() => {
    console.log(loading)
  }, [loading])

  useEffect(() => {
    if (isTyping) {
    /*   const filteredResult = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setResult(filteredResult.length > 0 ? filteredResult : false);
 */
      setLoading(true)

      const getData = setTimeout(() => {
        fetch(`https://jsonplaceholder.typicode.com/users?q=${search}`)
        .then(res => res.json())
        .then(data => {
          setResult(data.length > 0 ? data: false)
          setLoading(false)
        })
          
      }, 500);
    
      return () => {
        clearTimeout(getData)
        setLoading(false)
      }

    } else {
      setResult(false);
    }


    

  }, [search]);





  return (
    <>
      <div className="search" ref={searchRef}>
        <input
          value={search}
          type="text"
          className={isTyping ? "typing" : null}
          placeholder="I am looking for..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {isTyping && (
          <div className="search-result">
            {result &&
              result.map((item) => (
                <div onClick={() => getResultItem(item)} key={item.id} className="search-result-item">
                  <div className="item-name">{item.name}</div>
                  <div className="item-phone">{item.phone}</div>
                  
                </div>
              ))}
            {!result && loading === false && (
              <div className="result-not-found">
                "{search}" has not been found yet!
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

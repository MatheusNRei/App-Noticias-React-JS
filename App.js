import React, {Component,useState,useEffect} from "react";

const  App = () => {
  //state
  const[url,setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react') // https://newsapi.org/v2/top-headlines?country=br&apiKey=API_KEY API Brasilieira
  const [news,setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react') // testar com datetime para noticias da data atual
  const [loading,setLoading] = useState(false);
  // fetch news
  const fetchNews = () => {
    setLoading(true);
    fetch(url)
    .then (result => result.json())
    .then (data => (setNews(data.hits),setLoading(false)))
    .catch(error => console.log(error))
  }
  useEffect(() => {
    fetchNews();
  
  }, [url]);
 const handleSubmit = (e) => {
   e.preventDefault();
   setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
 }
  const handleChange = (e) => {
   setSearchQuery(e.target.value)
  }
  const showLoading = () => (loading ? <h2>Loading...</h2> : "")
  
  const searchForm = () => (   <form onSubmit={handleSubmit}>
  <input type="text" value= {searchQuery} onChange= {handleChange}/>
  <button>Search</button>
  </form>)

  
  const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>)

  return (
    <div>
    <h2>News</h2>
    {showLoading()}
    {searchForm()}
    {showNews()}
    </div>
      )
    }

export default App;

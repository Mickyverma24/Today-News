import React,{useEffect,useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
    const [articles,setArticles] = useState([])
    const [loading,setLoading ] = useState(true)  
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)
    const  capitalzer = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
  const updateNews= async (props) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    setArticles(parsedData.articles)
  };
  useEffect(()=>
  {updateNews()
    // document.title = `${capitalzer(props.category)}-Today News`;
  },[])

 const fetchMoreData =async () => {
   
   setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${
     page
    }&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
  }
       return (
      <>
        <div className="text-center">
        <h2 style={{margin:'35px'}}>
          <i>News Today- Top {capitalzer(props.category)} Headlines</i>
        </h2>
        {loading &&<Spinner/>}
        </div>
        <div className="row">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
          {articles.map((element,index) => {
            return (
              <div className="col md-3" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      key = {index}
                      imageUrl={
                        element.urlToImage
                        ? element.urlToImage
                        : "https://images.unsplash.com/photo-1657979411054-6c619224e281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=440&q=80"
                      }
                      newsUrl={element.url}
                      author = {element.author}
                      date = {element.publishedAt}
                      source = {element.source.name}
                      />
                  </div>
                );
              })}
              </div>
              </div>
              </InfiniteScroll>
        </div>
      </>
    );
  
}         

export default News;

 News.defaultProps = {
  country:'in',
  pageSize:12,
  category:'general'
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
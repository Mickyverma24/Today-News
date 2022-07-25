import React,{useEffect,useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ()=> {
  const [articles,setArticles] = useState([])
  const [loading,setLoading ] = useState(true)  
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)
  // document.title = `${this.capitalzer(props.category)}-Today News`;
  capitalzer = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  }
 const updateNews= async (props) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${
      this.state.page
    }&pageSize=${props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
  };
  useEffect(()=>{this.updateNews()},[])
  
  const componentDidMount=async()=> {
   this.updateNews()
  }
  fetchMoreData =async () => {
   
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${
     page
    }&pageSize=${props.pageSize}`;
    setState({page:page+1})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles:this.state.articles.concat( parsedData.articles),totalResults:parsedData.totalResults });
  };

    return (
      <>
        <div className="text-center">
        <h2 style={{margin:'35px'}}>
          <i>News Today- Top {this.capitalzer(props.category)} Headlines</i>
        </h2>
        {this.state.loading &&<Spinner/>}
        </div>
        <div className="row">
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
          {this.state.articles.map((element,index) => {
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
 News.defaultPros ={
  country:'in',
  pageSize:12,
  category:'general'
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultPros ={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number
  }
  capitalzer = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalzer(this.props.category)}-Today News`;
  }
  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92a9f9ce229748a38b95d057fc3d10bc&page=${
      this.state.page
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page: this.state.page, articles: parsedData.articles,loading:false });
  };
  
  async componentDidMount() {
   this.updateNews()
  }
  handleOnPrev = async () => {
    this.setState({ page: this.state.page - 1});
    this.updateNews();
  };
  handleOnNext = async () => {
      this.setState({
        page: this.state.page + 1,
      });
      this.updateNews();

  };  
  render() {
    return (
      <div className="container">
        <div className="text-center">
        <h2 style={{margin:'35px'}}>
          <i>News Today- Top {this.capitalzer(this.props.category)} Headlines</i>
        </h2>
        {this.state.loading &&<Spinner/>}
        </div>
        <div className="row">
          {!this.state.articles
            ? null
            : this.state.articles.map((element) => {
                return (
                !this.state.loading &&  <div className="col md-3" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
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
        <div className="container d-flex justify-content-between my-2">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handleOnPrev}
          >
            {" "}
            &larr; Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleOnNext}
            disabled={Math.ceil(this.state.totalResults / this.props.pageSize) < this.state.page + 1}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

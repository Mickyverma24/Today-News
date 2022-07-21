import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl,newsUrl,author,date,source } = this.props;
    return (
      <div>
        <span className="badge rounded-pill text-bg-danger">{source}</span>
        <div className="card" style={{width:'18rem'}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">{!author?'unknown':author} On {new Date(date).toDateString()}</small></p>
            <a href={newsUrl} target="true" className="btn btn-sm btn-dark">
              <i>Read more</i>
            </a>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Newsitem;

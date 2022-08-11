import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;

    return (
      <div className='col-md-4 mb-4'>
        <div className="card h-100">
          <img src={ imageUrl } className="card-img-top" alt={ title } />
          <div className="card-body">
            <h5 className="card-title">{ title }</h5>
            <p className="card-text">{ description }</p>
          </div>
          <div className="card-footer">
            <a href={ newsUrl } target="_blank" rel='noreferrer' className="btn btn-dark btn-sm">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <div className='container-fluid py-5 bg-dark bg-opacity-10'>
        <div className="container-xl">
          <div className="row">
            <div className="col-12 mb-5">
              <h2>This is news Component..!</h2>
            </div>
            <NewsItem title="Title" description="Description of the news" />
            <NewsItem title="Title" description="Description of the news" />
            <NewsItem title="Title" description="Description of the news" />
            <NewsItem title="Title" description="Description of the news" />
            <NewsItem title="Title" description="Description of the news" />
            <NewsItem title="Title" description="Description of the news" />
          </div>
        </div>
      </div>
    )
  }
}

export default News

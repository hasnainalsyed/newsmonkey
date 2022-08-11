import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=b5a3192bd39941aebb960b27a5f8d5a0&page=1&pageSize=20';
    let data = await fetch(url);
    let parsData = await data.json();
    // console.log(parsData);
    this.setState({
      articles: parsData.articles,
      totalArticles: parsData.totalResults
    });
  }

  handleNextClick = async () => {
    // console.log('Next');
    if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 20)) {} else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b5a3192bd39941aebb960b27a5f8d5a0&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsData = await data.json();
      this.setState({
        articles: parsData.articles,
        page: this.state.page + 1
      });
    }
  }
  
  handlePrevClick = async () => {
    // console.log('Previous');
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=b5a3192bd39941aebb960b27a5f8d5a0&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      articles: parsData.articles,
      page: this.state.page - 1
    });
  }

  render() {
    return (
      <div className='container-fluid py-5'>
        <div className="container-xl">
          <div className="row">
            <div className="col-12 mb-5">
              <h2>NewsMonkey - Top Headlines</h2>
            </div>
            {this.state.articles.map(element => {
              return (
                <NewsItem
                  key={element ? element.url : ''}
                  title={element ? element.title.slice(0, 45) : ''}
                  description={element ? element.description : ''}
                  imageUrl={element ? element.urlToImage : 'https://picsum.photos/200/300/?blur'}
                  newsUrl={element ? element.url : ''} />
              );
            })}
            <div className="col-12">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item"><button disabled={this.state.page <= 1} className="page-link" onClick={this.handlePrevClick}>&larr; Previous</button></li>
                  <li className="page-item"><button className="page-link" onClick={this.handleNextClick}>Next &rarr;</button></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default News

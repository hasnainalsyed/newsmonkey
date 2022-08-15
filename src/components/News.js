import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'us',
    category: 'general',
    pageSize: 6
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  }

  captlizeLetter = string => {
    string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
    document.title = `${this.captlizeLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b5a3192bd39941aebb960b27a5f8d5a0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      articles: parsData.articles,
      totalArticles: parsData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  }

  render() {
    return (
      <div className='container-fluid py-5'>
        <div className="container-xl">
          <div className="row">
            <div className="col-12 mb-5">
              <h2 className="text-center">NewsMonkey - Top {this.captlizeLetter(this.props.category)} Headlines</h2>
              {this.state.loading && <Spinner />}
            </div>
            {!this.state.loading && this.state.articles.map(element => {
              return (
                <NewsItem
                  key={element.url ? element.url : ''}
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage ? element.urlToImage : 'https://picsum.photos/200/300/?blur'}
                  author={element.author ? element.author : 'Unknown'}
                  date={element.publishedAt ? element.publishedAt : ''}
                  source={element.source.name ? element.source.name : 'Unknown'}
                  newsUrl={element.url ? element.url : ''} />
              );
            })}
            <div className="col-12">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <button
                      disabled={this.state.page <= 1}
                      className="page-link"
                      onClick={this.handlePrevClick}>
                      &larr; Previous
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)}
                      className="page-link"
                      onClick={this.handleNextClick}>
                      Next &rarr;
                    </button>
                  </li>
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

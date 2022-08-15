import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

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
      page: 1,
      totalResults: 0
    }
    document.title = `${this.captlizeLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsData.articles,
      totalResults: parsData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
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

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsData.articles),
      totalResults: parsData.totalResults,
      loading: false
    });
  };

  render() {
    return (
      <div className='container-fluid py-5'>
        <div className="container-xl">
          <div className="row">
            <div className="col-12 mb-5">
              <h2 className="text-center">NewsMonkey - Top {this.captlizeLetter(this.props.category)} Headlines</h2>
              {this.state.loading && <Spinner />}
            </div>
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner />} >
            <div className="row">
            {this.state.articles.map(element => {
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
            </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    )
  }
}

export default News

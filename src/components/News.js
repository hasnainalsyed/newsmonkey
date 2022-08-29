import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const captlizeLetter = string => {
    string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parsData = await data.json();
    props.setProgress(60);
    setArticles(parsData.articles);
    setTotalResults(parsData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  // useEffect(() => {
  //   updateNews();
  //   document.title = `${captlizeLetter(props.category)} - NewsMonkey`;
  //   /* eslint-enable */
  // }, [])

  useEffect(() => {
    const updateNews = async () => {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      props.setProgress(40);
      let parsData = await data.json();
      props.setProgress(60);
      setArticles(parsData.articles);
      setTotalResults(parsData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsData = await data.json();
    setArticles(articles.concat(parsData.articles));
    setTotalResults(parsData.totalResults);
    setLoading(false);
  };

  return (
    <section id='news'>
      <div className='container-fluid py-5'>
      <div className="container-xl">
        <div className="row">
          <div className="col-12 mb-5">
            <h2 className="text-center">NewsMonkey - Top {captlizeLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}
          </div>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />} >
            <div className="row">
              {articles.map(element => {
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
    </section>
  )
}

News.defaultProps = {
  country: 'us',
  category: 'general',
  pageSize: 6
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default News

import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className='col-md-4 mb-4'>
      <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span className="position-absolute top-0 end-0 mt-2 me-2 badge rounded-pill bg-success">
            {source}
          </span>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By: {author}, At: {new Date(date).toGMTString()}</small></p>
        </div>
        <div className="card-footer">
          <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-dark btn-sm">Read more</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem

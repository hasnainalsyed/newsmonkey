import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Spinner
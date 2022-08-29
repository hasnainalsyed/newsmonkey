import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 12;
  // const apiKey = process.env.REACT_APP_NEWS_API;
  const apiKey1 = '2f642aeeb0734d6da8f86a2bdcc4e291';
  const apiKey2 = 'b5a3192bd39941aebb960b27a5f8d5a0';

  const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <NavBar />
        <LoadingBar
          color='#fff'
          progress={progress} />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey1} key='general' pageSize={pageSize} country='in' category='general' />}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey1} key='business' pageSize={pageSize} country='in' category='business' />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey1} key='entertainment' pageSize={pageSize} country='in' category='entertainment' />}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey1} key='health' pageSize={pageSize} country='in' category='health' />}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey1} key='science' pageSize={pageSize} country='in' category='science' />}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey1} key='sports' pageSize={pageSize} country='in' category='sports' />}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey1} key='technology' pageSize={pageSize} country='in' category='technology' />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

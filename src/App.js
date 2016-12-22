import React, { Component } from 'react';
import './App.css';
import images from './data.json';
import ImageComparison from './components/ImageComparison/ImageComparison';

class App extends Component {

  renderImages(images) {
    if (!images || !Array.isArray(images)) {
      return null;
    }

    return images.map((image, idx) => <ImageComparison key={idx} {...image}/>)
  }

  render() {
    return (
      <div className="App">
        { this.renderImages(images) }
      </div>
    );
  }
}

export default App;

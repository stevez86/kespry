import React, { Component, PropTypes } from 'react';
import './ImageComparison.css';
import ReactBootstrapSlider from 'react-bootstrap-slider';

export default class ImageComparison extends Component {

  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
    overlaySrc: PropTypes.string.isRequired,
    showOpacitySlider: PropTypes.bool,
  };

  static defaultProps = {
    showOpacitySlider: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      xPos: 0,
      opacity: 1,
    };

    this.handleTouch = this.handleTouch.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
  }

  handleTouch(evt) {
    if (!evt) {
      return false;
    }

    const targetWidth = evt.nativeEvent.target.width;
    const xPos = Math.min(evt.nativeEvent.pageX || evt.nativeEvent.touches[0].pageX, targetWidth);

    if (!Number.isNaN(xPos) && xPos !== this.state.xPos) {
      this.setState({ xPos });
    }
  }

  handleSlideChange(evt) {
    if (!evt) {
      return false;
    }

    const opacity = evt.target.value;

    if (opacity !== this.state.opacity) {
      this.setState({ opacity });
    }
  }

  render() {
    const { imageSrc, overlaySrc, showOpacitySlider } = this.props;
    const { xPos: width, opacity } = this.state;
    return (
      <div>
        <div className="box title-container">
          <div>Image Comparison (touch or click image to compare):</div>
          <div>{imageSrc}</div>
          <div>{overlaySrc}</div>
        </div>
        { showOpacitySlider &&
          <div className="box slider-container">
            <label htmlFor="slider">Overlay Opacity:</label>
            <ReactBootstrapSlider
              id="slider"
              value={opacity}
              change={this.handleSlideChange}
              slideStop={this.handleSlideChange}
              step={0.01}
              max={1}
              min={0}
            />
          </div>
        }
        <div onClick={this.handleTouch} onTouchMove={this.handleTouch} onTouchStart={this.handleTouch}>
          <div className="overlay-container" style={{width, opacity}}>
            <img role="presentation" src={overlaySrc} />
          </div>
          <img role="presentation" src={imageSrc} />
        </div>
      </div>
    )
  }
}

import React, { useState } from "react";
import "./Slider.scss";
const Slider = ({ images }) => {
  console.log(images);
  const [imageIndex, setImageIndex] = useState(null);

  const increaseImageIndex = () => {
    if (images.length > imageIndex + 1) {
      setImageIndex(imageIndex + 1);
    }
  };
  const decreaseImageIndex = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };
  return (
    <div className="slider">
      {imageIndex != null && (
        <div className="fullSlider">
          <div className="arrow" onClick={decreaseImageIndex}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={increaseImageIndex}>
            <img className="right" src="/arrow.png" alt="" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((img, index) => (
          <img src={img} key={index} onClick={() => setImageIndex(index + 1)} />
        ))}
      </div>
    </div>
  );
};

export default Slider;

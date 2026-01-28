import { useState, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  // Optimized Unsplash images
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80"
  ];

  const captions = [
    {
      title: "Discover Nature's Beauty",
      subtitle: "Explore stunning landscapes and wildlife"
    },
    {
      title: "Capture Life's Moments",
      subtitle: "Find the perfect image for your story"
    },
    {
      title: "Unleash Your Creativity",
      subtitle: "Millions of images at your fingertips"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-slider">
      <div className="slider-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === current ? "active" : ""}`}
            style={{
              backgroundImage: `url(${image})`
            }}
          >
            <div className="slide-overlay" />
            <div className="slide-content">
              <h1 className="slide-title">{captions[index].title}</h1>
              <p className="slide-subtitle">{captions[index].subtitle}</p>

              <div className="slide-cta">
                <button className="cta-btn primary">Explore Images</button>
                <button className="cta-btn secondary">Learn More</button>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${current === index ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          className="slider-arrow prev"
          onClick={() =>
            setCurrent((prev) => (prev - 1 + images.length) % images.length)
          }
        >
          ‹
        </button>
        <button
          className="slider-arrow next"
          onClick={() =>
            setCurrent((prev) => (prev + 1) % images.length)
          }
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;

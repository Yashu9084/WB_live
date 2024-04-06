import LightGallery from "lightgallery/react";
import styled from "styled-components";
import React, { useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function Gallery({ images }) {
  images = images ? images.split(",") : [];
  const [visibleImages, setVisibleImages] = useState(9);

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const itemData = images.map((url, i) => ({
    img: `${process.env.NEXT_PUBLIC_MEDIA_PREFIX}/${url}`,
    rows: i % 2 ? 1 : 2,
  }));

  const showViewLess = visibleImages === images.length && visibleImages > 9;

  return (
    <Wrapper className="section info-section">
      <div className="container">
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          {itemData.slice(0, visibleImages).map((item, i) => (
            <a key={i} href={item.img}>
              <img
                style={{ width: `100%` }}
                src={item.img}
                alt="venue-img"
                loading="lazy" // Add lazy loading here
              />
            </a>
          ))}
        </LightGallery>
        {showViewLess && (
          <div className="btn">
            <button className="view-button" onClick={() => setVisibleImages(9)}>
              View Less
            </button>
          </div>
        )}
        {!showViewLess && visibleImages < images.length && (
          <div className="btn">
            <button
              className="view-button"
              onClick={() =>
                setVisibleImages(Math.min(images.length, visibleImages + 9))
              }
            >
              View More
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default Gallery;

const Wrapper = styled.div`
  margin-top: -40px;
  .lg-react-element {
    column-count: 3;
  }

  img {
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.5s;
    margin-top: 10px;
  }
  img:hover {
    transform: scale(1.05);
  }
  .container {
    .btn {
      display: flex;
      justify-content: center;
    }
    .view-button {
      background-color: #870808;
      color: white;
      font-weight: 600;
      border-radius: 10px;
      padding: 10px 20px;
      margin-top: 30px;
      cursor: pointer;
    }
  }

  @media (min-width: 768px) {
    .lg-react-element {
      gap: 15px;
    }
  }

  @media (max-width: 500px) {
    .lg-react-element {
      column-count: 2;
    }
  }
`;

import Gallery from "@/components/vendor/vendordetailspage/gallery/Gallery";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const TabsComponent = ({ images }) => {
  const [activeTab, setActiveTab] = useState("photos");

  const slidingAnimation = useSpring({
    to: { opacity: 1, transform: "translateX(0)" },
    from: { opacity: 0, transform: "translateX(-100%)" },
    reset: true,
  });

  return (
    <Wrapper className="section info-section">
      <div className="box container">
        <div className="tab-titles">
          <button
            className={`tab-button ${activeTab === "photos" ? "active" : ""}`}
            onClick={() => setActiveTab("photos")}
          >
            Media
          </button>
          {/* <button
            className={`tab-button ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button> */}
        </div>

        <div className="tab-content">
          {activeTab === "photos" ? (
            <animated.div style={slidingAnimation}>
              <Gallery images={images} />
            </animated.div>
          ) : (
            <animated.div style={slidingAnimation}>
              Video Gallery Here
            </animated.div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default TabsComponent;

const Wrapper = styled.div`
  background-color: var(--bg-color);
  .box {
    background-color: white;
    ${"" /* width: 800px; */}
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    ${"" /* margin-left: 8.5rem; */}
  }
  .tab-titles {
    border-bottom: 2px solid lightGray;
  }
  .tab-button {
    padding: 20px;
    margin-right: 5px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 25px;
    color: #870808;
    font-weight: 600;
  }

  .tab-button.active {
    border-bottom: 3px solid #870808;
  }

  .tab-content {
    ${"" /* margin-top: 10px; */}
    padding: 0px 20px;
    height: auto;
    ${"" /* width: 800px; */}
  }
`;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import axios from "axios";

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("비디오를 가져오지 못했습니다.");
      }
    });
  }, []);

  const renderCard = Videos.map((item, index) => {
    return (
      <div key={index}>
        <a href={`video/detail/${item._id}`}>
          <img
            src={`http://localhost:5000/${item.thumbnail}`}
            alt={item.title}
          />
        </a>
        <span>{item.title}</span>
        <span></span>
      </div>
    );
  });

  return (
    <div className={styles.title}>
      <title>Recommended</title>
      <hr />
      {renderCard}
    </div>
  );
}

export default LandingPage;

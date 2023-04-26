import React, { useState, useEffect } from "react";
import axios from "axios";

function SideVideo() {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos);
      } else {
        alert("비디오를 가져오지 못했습니다.");
      }
    });
  }, []);

  const renderSideVideo = SideVideos.map((item, index) => {
    return (
      <div
        key={index}
        style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "80%", marginBotton: "1rem" }}>
          <a href={item._id}>
            <img
              style={{ width: "80%" }}
              src={`http://localhost:5000/${item.thumbnail}`}
              alt=""
            />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a href={item._id}>
            <span>{item.title}</span>
            <br />
            <span>{item.writer.name}</span>
            <br />
            <span>{item.views}</span>
            <br />
            <span>{item.duration}</span>
          </a>
        </div>
      </div>
    );
  });
  return <React.Fragment>{renderSideVideo}</React.Fragment>;
}

export default SideVideo;

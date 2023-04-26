import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage() {
  const [VideoDetail, setVideoDetail] = useState([]);

  const videoId = useParams();
  const variable = videoId;

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("비디오 로딩에 실패했습니다.");
      }
    });
  }, []);
  function renderVideo() {
    if (!VideoDetail.filePath) {
      return (
        <div
          style={{
            width: "70%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
          }}
        >
          Loading...
        </div>
      );
    } else {
      return (
        <div>
          <video
            style={{ width: "70%", height: "auto" }}
            src={`http://localhost:5000/${VideoDetail.filePath}`}
            controls
          />
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <List.Item
              style={{ display: "flex" }}
              actions={[
                <Subscribe
                  userTo={VideoDetail.writer?._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              {VideoDetail.writer && (
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={VideoDetail.writer.name}
                  description={VideoDetail.description}
                />
              )}
            </List.Item>
            {/* Commetns part */}
          </div>
        </div>
      );
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        {renderVideo()}
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  );
}

export default VideoDetailPage;

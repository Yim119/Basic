import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VisibilityOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "A" },
  { value: 1, label: "B" },
  { value: 2, label: "C" },
  { value: 3, label: "D" },
  { value: 4, label: "E" },
];

function VideoUploadPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [VideoTitle, setVideoTitle] = useState("");
  const [Discription, setDiscription] = useState("");
  const [Visibility, setVisibility] = useState(0);
  const [Category, setCategory] = useState(0);
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onVideoTitleHandler = (event) => {
    setVideoTitle(event.target.value);
  };

  const onDiscriptionHandler = (event) => {
    setDiscription(event.target.value);
  };

  const onVisivilityHandler = (event) => {
    setVisibility(event.target.value);
  };

  const onCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const body = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Discription,
      privacy: Visibility,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    axios.post("/api/video/uploadVideo", body).then((response) => {
      if (response.data.success) {
        // antd의 message method
        message.success("비디오를 업로드했습니다.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert("비디오 업로드에 실패했습니다.");
      }
    });
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/from-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let fileInfo = {
          url: response.data.url,
          fileName: response.data.fileName,
        };

        setFilePath(response.data.url);

        // generate thumbnail with this filepath

        axios.post("/api/video/thumbnail", fileInfo).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
            console.log(response.data.url);
          } else {
            alert("썸네일 생성에 실패하였습니다.");
          }
        });
      } else {
        alert("파일 업로드에 실패하였습니다.");
        console.log(response.data);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex" }}>
          <Dropzone onDrop={onDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "20rem",
                  height: "16rem",
                  border: "1px solid black",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined />
              </div>
            )}
          </Dropzone>

          {ThumbnailPath !== "" && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>
        <hr />
        <hr />
        <label>Title</label>
        <textarea value={VideoTitle} onChange={onVideoTitleHandler}></textarea>
        <hr />
        <hr />
        <label>Dscription</label>
        <textarea
          value={Discription}
          onChange={onDiscriptionHandler}
        ></textarea>
        <hr />
        <hr />
        <select value={Visibility} onChange={onVisivilityHandler}>
          {VisibilityOptions.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <hr />
        <hr />
        <select value={Category} onChange={onCategoryHandler}>
          {CategoryOptions.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default VideoUploadPage;

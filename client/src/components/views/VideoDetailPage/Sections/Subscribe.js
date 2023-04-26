import React, { useState, useEffect } from "react";
import axios from "axios";

function Subscribe(prop) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: prop.userTo };

    axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert("오류가 발생했습니다.");
      }
    });

    let subscribed = {
      userTo: prop.userTo,
      userFrom: prop.userFrom,
    };

    axios.post("/api/subscribe/subscribed", subscribed).then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert("오류가 발생했습니다.");
      }
    });
  }, []);

  const onSubscibe = () => {
    let subscirbeVariable = {
      userTo: prop.userTo,
      userFrom: prop.userFrom,
    };

    if (Subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscirbeVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("오류가 발생했습니다.");
          }
        });
    } else {
      axios
        .post("/api/subscribe/subscribe", subscirbeVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("오류가 발생했습니다.");
          }
        });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscibe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;

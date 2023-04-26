import axios from "axios";
import React, { useState } from "react";

function MemoPage() {
  const [Text, setText] = useState("");

  const onMemoHandler = (event) => {
    setText(event.target.value);
  };

  const onSubmitHandler = () => {
    const body = {
      text: Text,
    };
    axios.post("/api/memos/save", body).then((reponse) => reponse.data);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <textarea value={Text} onChange={onMemoHandler}></textarea>
        <button>Memo</button>
      </form>
    </div>
  );
}

export default MemoPage;

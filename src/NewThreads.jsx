import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const NewThreads = () => {
  const [title, setTitle] = useState("");

  const handleCreateThread = async () => {
    try {
      await axios.post(
        "https://railway.bulletinboard.techtrain.dev/threads",
        {
          title: title,
        },
        {
          mode: "no-cors",
        }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("スレッドの作成に失敗しました");
    }
  };
  return (
    <div className="mt-20">
      <h2 className="font-semibold text-2xl mb-10">スレッドを新規作成</h2>
      <input
        type="text"
        placeholder="スレッドタイトル"
        className="p-2 w-96 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex w-48 justify-between items-center">
        <Link to="/" className="underline">
          Topに戻る
        </Link>
        <button
          onClick={handleCreateThread}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          作成
        </button>
      </div>
    </div>
  );
};

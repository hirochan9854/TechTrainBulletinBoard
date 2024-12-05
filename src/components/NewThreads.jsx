import { useState, useEffect } from "react";

export const NewThreads = () => {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://railway.bulletinboard.techtrain.dev/threads"
        );
        if (!response.ok) {
          throw new Error(`レスポンスステータス: ${response.status}`);
        }

        const json = await response.json();
        setThreads(json);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    }

    getData();
  }, []);

  if (error) return <div>エラーが発生しました: {error}</div>;

  return (
    <div className="mt-20">
      <h2 className="font-semibold text-2xl mb-10">新着スレッド</h2>
      <div className="bg-white p-7">
        {threads.map((thread) => (
          <div className="border p-2 mb-2" key={thread.id}>
            {thread.title}
          </div>
        ))}
      </div>
    </div>
  );
};

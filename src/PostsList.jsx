import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [threadTitle, setThreadTitle] = useState("");
  const [error, setError] = useState(null);
  const { thread_id } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch thread details to get the thread title
        const threadResponse = await fetch(
          `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0&limit=10`
        );
        if (!threadResponse.ok) {
          throw new Error(
            `スレッド情報の取得に失敗しました: ${threadResponse.status}`
          );
        }
        const threadData = await threadResponse.json();
        setThreadTitle(threadData.title);

        // Fetch posts for the specific thread
        const postsResponse = await fetch(
          `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`
        );
        if (!postsResponse.ok) {
          throw new Error(`投稿の取得に失敗しました: ${postsResponse.status}`);
        }

        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    }

    fetchPosts();
  }, [thread_id]);

  const [post, setPost] = useState("");

  const handleCreatePost = async () => {
    try {
      await axios.post(
        `https://railway.bulletinboard.techtrain.dev//threads/${thread_id}/posts`,
        {
          post: post,
        },
        {
          mode: "no-cors",
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("スレッドの作成に失敗しました");
    }
  };

  if (error) return <div>エラーが発生しました: {error}</div>;

  if (!posts.posts) return <div>読み込み中...</div>;

  return (
    <div className="mt-20 flex gap-7">
      <div className="w-full">
        <h2 className=" font-semibold text-2xl mb-10">{threadTitle}</h2>
        <div className="bg-white p-7 overflow-scroll">
          {posts.posts.length === 0 ? (
            <div className="text-gray-500">投稿はありません</div>
          ) : (
            posts.posts.map((post) => (
              <div
                key={post.id}
                className="border p-4 mb-4 rounded-lg shadow-sm"
              >
                <p>{post.post}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <textarea
          className="p-4 resize-none w-96 h-48"
          onChange={(e) => setPost(e.target.value)}
          placeholder="投稿しよう！"
        ></textarea>
        <button
          className="bg-[#3ea8fe] text-white px-6 py-2 ml-auto block"
          onClick={handleCreatePost}
        >
          投稿
        </button>
      </div>
    </div>
  );
};

import { NewThreads } from "./NewThreads";
import { ThreadsList } from "./ThreadsList";
import { PostsList } from "./PostsList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="text-black ">
        <div className="fixed bg-white w-screen h-20 flex items-center justify-between px-9 ">
          <h1 className="font-semibold text-3xl">
            <Link to="/">TechTrainBulletinBoard</Link>
          </h1>
          <Link className="underline" to="/threads/new">
            スレッドをたてる
          </Link>
        </div>
        <div className="bg-paleBlue pt-20 px-10 min-h-screen">
          <Routes>
            <Route path="/threads/new" element={<NewThreads />} />
            <Route path="/threads/:thread_id" element={<PostsList />} />
            <Route path="/" element={<ThreadsList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import { Header } from "./components/Header";
import { NewThreads } from "./components/NewThreads";

function App() {
  return (
    <div className="text-black ">
      <Header />
      <div className="bg-paleBlue pt-20 px-10 h-screen">
        <NewThreads />
      </div>
    </div>
  );
}

export default App;

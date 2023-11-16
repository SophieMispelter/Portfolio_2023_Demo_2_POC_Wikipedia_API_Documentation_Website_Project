import "./App.css";
import ImagesListFromApi from "./components/ImagesListFromApi";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          POC - Get Images from the Wikipedia API for our Documentation Website
          Project
        </h1>
      </header>
      <main>
        <ImagesListFromApi />
      </main>
    </div>
  );
}

export default App;

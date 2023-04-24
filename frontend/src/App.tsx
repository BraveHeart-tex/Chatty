import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatsPage from "./pages/ChatsPage.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage />} path="/login" />
        <Route element={<ChatsPage />} path="/chats" />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<HomePage />} path='/' />
        <Route element={<ChatPage />} path='/chats' />
      </Routes>
    </div>
  );
}

export default App;

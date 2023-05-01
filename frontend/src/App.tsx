import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatsPage from './pages/ChatsPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<NotFoundPage />} path='*'></Route>
        <Route element={<Navigate replace to='/chats' />} path='/'></Route>
        <Route element={<HomePage />} path='/login' />
        <Route element={<ChatsPage />} path='/chats' />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/main/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;

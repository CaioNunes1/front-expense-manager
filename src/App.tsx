import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import SignIn from './pages/SignIn';
function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />{/*Esse path é para carregar o caminho do arquivo */}
          <Route path="SignIn" element={<SignIn />} />{/*Esse path é para carregar o caminho do arquivo */}
        </Routes>
    </Router>
  );
}

export default App

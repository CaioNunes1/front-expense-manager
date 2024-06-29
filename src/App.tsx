import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
function App() {

  return (
    <Router>
        <Routes>
          <Route path="FrontPage" element={<FrontPage />} />{/*Esse path é para carregar o caminho do arquivo */}
        </Routes>
    </Router>
  );
}

export default App

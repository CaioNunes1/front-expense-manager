import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import AddCategory from './pages/AddCategory';
function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<FrontPage />} />{/*Esse path é para carregar o caminho do arquivo */}
          <Route path="SignIn" element={<SignIn />} />{/*Esse path é para carregar o caminho do arquivo */}
          <Route path="SignUp" element={<SignUp />} />{/*Esse path é para carregar o caminho do arquivo */}
          <Route path="Home" element={<Home />} />{/*Esse path é para carregar o caminho do arquivo */}
          <Route path="AddCategory" element={<AddCategory/>}/>
        </Routes>
    </Router>
  );
}

export default App

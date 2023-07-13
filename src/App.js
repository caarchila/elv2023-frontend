import './App.css';
import DocumentInputPage from './pages/DocumentInputPage';
import Vote1 from './pages/Vote1';
import Vote2 from './pages/Vote2';
import Vote3 from './pages/Vote3';
import Final from './pages/Final';
import LoginPage from './pages/LoginPage';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route path="/document" element={<DocumentInputPage/>}/>
          <Route path="/vote1" element={<Vote1/>}/>
          <Route path="/vote2" element={<Vote2/>}/>
          <Route path="/vote3" element={<Vote3/>}/>
          <Route path="/final" element={<Final/>}/>
      </Routes>
    </Router>
  );
}

export default App;

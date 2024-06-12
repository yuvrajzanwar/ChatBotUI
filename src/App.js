import logo from './logo.svg';
import './App.css';
import Page from './components/Page';
import File from './components/File';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/page" element={<Page/>}/>
        <Route path="/" element={<File/>}/>
      </Routes>
    </Router>
      
    </>
  );
}

export default App;

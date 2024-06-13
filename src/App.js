import logo from './logo.svg';
import './App.css';
import Page from './components/Page';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainSection from './components/MainSection';
import About from './components/About';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainSection/>}/> 
        <Route path='/about' element={<About/>} />
        <Route path="/page" element={<Page/>}/>
      </Routes>
    </Router>
      
    </>
  );
}

export default App;

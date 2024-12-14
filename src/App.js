import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import ImageMask from './components/Body/ImageMask.jsx';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
    {/* Enter your Page Component here */}
    <Navbar/>
    <ImageMask/>
    <Footer/>
    </div>
  );
}

export default App;

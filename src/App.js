
import './App.css';
import GlobalContextProvider from './context/GlobalContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
      <NavBar/>
      <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/about' element={<AboutUs />}></Route>
      <Route path='/contact' element={<ContactUs />}></Route>
      <Route path='/gallery' element={<Gallery />}></Route>
      </Routes>
      <Footer />
      </GlobalContextProvider>
        
    </div>
  );
}

export default App;


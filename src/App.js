import cookies from "js-cookie";
import HeaderTop from './components/Static/HeaderTop';
import Header from './components/Static/Header';
import Footer from './components/Static/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts/fonts.css';
import './App.css';
import {useState} from "react";

function App() {
  if (!cookies.get("Authorization")) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authTime');
  }
    const [showRegParam, setShowRegParam] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      <HeaderTop />
      <Header showRegParam={showRegParam}
              setShowRegParam={setShowRegParam}
              showLogin={showLogin}
              setShowLogin={setShowLogin} />

      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;

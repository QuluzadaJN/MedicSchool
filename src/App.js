import cookies from "js-cookie";
import HeaderTop from './components/Static/HeaderTop';
import Header from './components/Static/Header';
import Footer from './components/Static/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/fonts/fonts.css';
import './App.css';

function App() {
  if (!cookies.get("Authorization")) {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authTime');
  }

  return (
    <div>
      <HeaderTop />
      <Header />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;

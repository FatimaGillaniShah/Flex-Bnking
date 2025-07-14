import './App.css';
import Home from './component/Home';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AddAccount from './component/AddAccount';
import Nav from './component/Nav';
import Accounts from './component/Accounts';
import Transfer from './component/Transfer';
import AboutUs from './component/AboutUs';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Dashboard from './component/Dashboard';
import Transactions from './component/Transactions';
import Footer from './component/Footer'; 

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <Nav />
      {isHomePage ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <div className="app-container">
          <Routes>
            <Route path="/addaccount" element={<ProtectedRoute element={AddAccount} />} />
            <Route path="/accounts" element={<ProtectedRoute element={Accounts} />} />
            <Route path="/transaction" element={<ProtectedRoute element={Transfer} />} />
            <Route path="/transactions" element={<ProtectedRoute element={Transactions} />} /> 
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          </Routes>
        </div>
      )}
      <Footer /> 
    </div>
  );
}

export default App;

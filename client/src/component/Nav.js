import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navigation">
      <div className="navigation-left">
        <img src='./logo.png' alt="Flex Bank Logo" className="logo" />
        <h2>Flex Bank</h2>
      </div>
      <div className="navigation-right">
        <ul>
          <li><Link to='/' className='text-link'>Home</Link></li>
          {isAuthenticated && (
            <>
          <li><Link to='/dashboard' className='text-link'>Dashboard</Link></li>
          <li><Link to='/addaccount' className='text-link'>Add Account</Link></li>
          <li><Link to='/accounts' className='text-link'>Accounts</Link></li>
          <li><Link to='/transaction' className='text-link'>Transfer</Link></li>
          <li><Link to='/transactions' className='text-link'>Transactions</Link></li> 
          </>
            )}
          <li><Link to='/aboutUs' className='text-link'>About Us</Link></li>
          {isAuthenticated ? (
            <li className='text-link' onClick={handleLogout}>Logout</li>
          ) : (
            <li><Link to='/login' className='text-link'>Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

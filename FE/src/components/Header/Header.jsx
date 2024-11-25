import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';

// styles
import './Header.css';

// assets
import Logoimg from '../../assets/Logo.png';

// icons
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleUserClick = () => {
    navigate('AdminDetails');
  };

  return (
    <div className='header-box' style={{ paddingLeft: '5%' }}>
      <div className='logo'>
        <img src={Logoimg} alt='logo' />
      </div>
      <div className='icons'>
        {showSearch && (
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search..." 
            style={{
              height: '30px',
              fontSize: '16px',
              paddingLeft: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginRight: '10px'
            }}
          />
        )}
        
        <Avatar 
          icon={<UserOutlined />} 
          className="user-avatar"
          onClick={handleUserClick}
        />
      </div>
    </div>
  );
};

export default Header;
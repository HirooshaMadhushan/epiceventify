
import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import './SideMenuButton.css';

const SideMenuButton = ({ toggleCollapsed, collapsed }) => {
  return (
    <div className='logo' onClick={toggleCollapsed}>
      <div className='logo-icon'>
        <MenuOutlined />
      </div>
    </div>
  );
};

export default SideMenuButton;

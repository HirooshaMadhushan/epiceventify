import React, { useState } from "react";

//styles
import "./AdminSideMenu.css";
import Logoimg from '../../assets/Logo.png'

//components
import SideMenuButton from "../SideMenuButton/SideMenuButton";

import {
  DashboardOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const AdminSideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="siderbar-container">
      
      <Layout style={{ backgroundColor: "white" }}>
        <Sider
          theme=""
          collapsed={collapsed}
          style={{ backgroundColor: "black", height: "100vh", position: "fixed" }}
        >
            
          <center>
            <SideMenuButton toggleCollapsed={toggleCollapsed} />
          </center>
          <Menu
            theme=""
            mode="inline"
            className="menu-bar"
            style={{
              backgroundColor: "black",
              color: "#fff",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
     
            <Menu.Item
              key="dashboard"
              icon={<DashboardOutlined />}
              className="elements"
            >
              <Link
                to="appstart"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Dashboard
              </Link>
            </Menu.Item>

            <Menu.SubMenu
              key="events"
              icon={<ProfileOutlined />}
              title="Events"
            >
              <Menu.Item key="completed-events" className="elements">
                <Link
                  to="Ticket"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Completed Events
                </Link>
              </Menu.Item>
              <Menu.Item key="pending-events" className="elements">
                <Link
                  to="PendingEvent"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Pending Events
                </Link>
              </Menu.Item>
              <Menu.Item key="pending-events" className="elements">
                <Link
                  to="InactiveEvent"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  Inactive Events
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item
              key="organizer"
              icon={<UsergroupAddOutlined />}
              className="elements"
            >
              <Link
                to="Organizer"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Organizer Details
              </Link>
            </Menu.Item>
           
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              className="elements"
            >
              <Link
                to="/"
                style={{ textDecoration: "none", color: "#fff" }}
              >
              Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
};

export default AdminSideMenu;

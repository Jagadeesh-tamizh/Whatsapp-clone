import React from 'react';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton, Avatar, Icon } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import { SidebarChat } from './SidebarChat';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://media.licdn.com/dms/image/C4E03AQG2OfnxezcrYA/profile-displayphoto-shrink_800_800/0/1619336003772?e=2147483647&v=beta&t=Gxv7A9i0eA3w4xxnIMaEcTsl-QvN5IMop9ljZfrrRqc" />

        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;

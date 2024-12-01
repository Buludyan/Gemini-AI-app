import AppBar from '@mui/material/AppBar';
import { drawerWidth } from '../../constants';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ChatListItem } from '../../interfaces/chat';
import { useActions, useAppSelector } from '../../store/store';

const TopBar = ({ currentChat }: { currentChat: ChatListItem | undefined }) => {
  const { setMobileSideBarOpen } = useActions();

  const isMobileSidebarOpen = useAppSelector(
    (state) => state.aiChat.isMobileSidebarOpen,
  );

  const handleDrawerToggle = () => {
    setMobileSideBarOpen(!isMobileSidebarOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {currentChat?.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

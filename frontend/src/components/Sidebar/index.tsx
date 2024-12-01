import Box from '@mui/material/Box';
import { drawerWidth } from '../../constants';
import Drawer from '@mui/material/Drawer';
import SidebarContent from '../../reusable/SidebarContent';
import React from 'react';
import { useActions, useAppSelector } from '../../store/store';

const Sidebar = () => {
  const { setMobileSideBarOpen } = useActions();

  const isMobileSidebarOpen = useAppSelector(
    (state) => state.aiChat.isMobileSidebarOpen,
  );

  const handleDrawerClose = () => {
    setMobileSideBarOpen(false);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={isMobileSidebarOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <SidebarContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
};

export default Sidebar;

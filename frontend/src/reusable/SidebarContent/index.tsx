import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ChatsList from '../../components/ChatsList';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip, useMediaQuery } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useActions } from '../../store/store';
import { mobileBreakPointInPx } from '../../constants';

const SidebarContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useMediaQuery(`(max-width:${mobileBreakPointInPx}px)`);

  const { setMobileSideBarOpen } = useActions();

  return (
    <Box>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">AI Chat</Typography>
        <Tooltip title="Start new chat">
          <IconButton
            onClick={() => {
              if (id) {
                navigate(`/`);
                if (isMobile) {
                  setMobileSideBarOpen(false);
                }
              }
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <ChatsList />
    </Box>
  );
};

export default SidebarContent;

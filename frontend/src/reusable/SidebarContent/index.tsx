import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ChatsList from '../../components/ChatsList';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
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
      <Toolbar>
        <Typography variant="body1" marginRight={1}>
          AI Chat
        </Typography>
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
            <CreateIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <ChatsList />
    </Box>
  );
};

export default SidebarContent;

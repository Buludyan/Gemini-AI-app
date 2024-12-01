import { ChatListItem } from '../../../interfaces/chat';
import { useNavigate, useParams } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import { mobileBreakPointInPx } from '../../../constants';
import { useActions } from '../../../store/store';

const ChatsListItem = ({ chatListItem }: { chatListItem: ChatListItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width:${mobileBreakPointInPx}px)`);

  const { setMobileSideBarOpen } = useActions();

  return (
    <ListItem
      onClick={() => {
        navigate(`/${chatListItem.id}`);
        if (isMobile) {
          setMobileSideBarOpen(false);
        }
      }}
      disablePadding
    >
      <ListItemButton selected={id === chatListItem.id}>
        <ListItemText primary={chatListItem.title.slice(0, 19)} />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatsListItem;

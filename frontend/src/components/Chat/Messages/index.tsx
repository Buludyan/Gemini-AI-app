import Box from '@mui/material/Box';
import { drawerWidth, mobileBreakPointInPx } from '../../../constants';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AssistantIcon from '@mui/icons-material/Assistant';
import { ChatListItem } from '../../../interfaces/chat';
import { useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../../store/store';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';

const Messages = ({
  currentChat,
}: {
  currentChat: ChatListItem | undefined;
}) => {
  const { id } = useParams();
  const isMobile = useMediaQuery(`(max-width:${mobileBreakPointInPx}px)`);
  const listRef = React.useRef<HTMLUListElement | null>(null);

  const chats = useAppSelector((state) => state.aiChat.chats);

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chats, id]);

  return (
    <Box
      sx={{
        paddingX: isMobile ? 0 : 10,
        paddingTop: 10,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        height: 'calc(100vh - 105px)',
        overflowY: 'scroll',
        display: 'flex',
        justifyContent: 'center',
      }}
      ref={listRef}
    >
      <List sx={{ width: isMobile ? '100%' : '60%' }}>
        {currentChat
          ? currentChat.messages.map((message) => {
              const { id, sender, content } = message;

              const htmlContent = marked(content) as string;

              const isUser = sender === 'user';

              return (
                <ListItem
                  key={id}
                  sx={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  {!isUser && (
                    <AssistantIcon
                      sx={{
                        marginRight: 1,
                        color: '#842029',
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      maxWidth: isMobile ? '80%' : '70%',
                      paddingX: 2,
                      borderRadius: 2,
                      backgroundColor: isUser ? '#d1e7dd' : '#EAD9EE',
                      color: isUser ? '#0f5132' : '#842029',
                      textAlign: isUser ? 'right' : 'left',
                      boxShadow: 1,
                      overflowX: 'auto',
                    }}
                  >
                    <Typography
                      variant="body1"
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  </Box>
                  {isUser && (
                    <PersonIcon
                      sx={{
                        marginLeft: 1,
                        color: '#0f5132',
                      }}
                    />
                  )}
                </ListItem>
              );
            })
          : null}
      </List>
    </Box>
  );
};

export default Messages;

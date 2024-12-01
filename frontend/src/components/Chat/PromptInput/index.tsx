import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate, useParams } from 'react-router-dom';
import { useActions, useAppSelector } from '../../../store/store';
import { drawerWidth, mobileBreakPointInPx } from '../../../constants';
import { sendMessage } from '../../../requests';
import StopIcon from '@mui/icons-material/Stop';

const PromptInput = () => {
  const { id } = useParams();
  const { setChats } = useActions();
  const navigate = useNavigate();

  const abortControllerRef = React.useRef<AbortController | null>(null);

  const isMobile = useMediaQuery(`(max-width:${mobileBreakPointInPx}px)`);

  const chats = useAppSelector((state) => state.aiChat.chats);

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = React.useCallback(async () => {
    abortControllerRef.current = new AbortController();
    setPrompt('');

    await sendMessage({
      id,
      prompt,
      chats,
      setChats,
      navigate,
      abortControllerRef,
      setIsLoading,
    });
  }, [chats, id, navigate, prompt, setChats]);

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSendMessage]);

  return (
    <Box
      sx={{
        position: 'fixed',
        width: isMobile ? '100%' : { sm: `calc(100% - ${drawerWidth}px)` },
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        p: 2,
        boxShadow: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid #ddd',
      }}
    >
      {isLoading && (
        <LinearProgress
          sx={{ position: 'absolute', width: '100%', top: 0, height: '1px' }}
        />
      )}
      <FormControl
        sx={{ m: 1, width: isMobile ? '100%' : '50%' }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Write prompt
        </InputLabel>
        <OutlinedInput
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          label="Write prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          sx={{ marginRight: 2 }}
          endAdornment={
            <InputAdornment position="end">
              {isLoading ? (
                <IconButton edge="end" onClick={cancelRequest}>
                  {<StopIcon />}
                </IconButton>
              ) : (
                <Tooltip title={!prompt ? `Can't send an empty prompt` : ''}>
                  <IconButton edge="end" onClick={handleSendMessage}>
                    {<ExpandLessIcon />}
                  </IconButton>
                </Tooltip>
              )}
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default PromptInput;

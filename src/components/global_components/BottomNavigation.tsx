import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 400 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction href= '/' label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction href = 'friends' label="Friends" icon={<GroupIcon />} />
        <BottomNavigationAction href = 'friends' label="Messages" icon={<ChatBubbleIcon />} />
        <BottomNavigationAction href = 'friends' label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}

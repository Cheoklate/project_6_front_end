import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 400, position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          href="allhabits"
          label="Home"
          icon={<HomeIcon sx={{ color: "secondary.main" }} />}
        />
        <BottomNavigationAction
          href="friends"
          label="Friends"
          icon={<GroupIcon sx={{ color: "secondary.main" }} />}
        />
        <BottomNavigationAction
          href="createhabit"
          label="Create"
          icon={<CreateIcon sx={{ color: "secondary.main" }} />}
        />
        <BottomNavigationAction
          href="signin"
          label="Logout"
          icon={<LogoutIcon sx={{ color: "secondary.main" }} />}
        />
        {/* <BottomNavigationAction href = 'friends' label="Settings" icon={<SettingsIcon />} /> */}
      </BottomNavigation>
    </Box>
  );
}

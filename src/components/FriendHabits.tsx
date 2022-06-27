import * as React from 'react';
import { useState, useEffect, Dispatch, SetStateAction  } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Input, MenuItem } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import Container from '@mui/material/Container';
import isWeekend from 'date-fns/isWeekend';

import RedoIcon from '@mui/icons-material/Redo';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { visuallyHidden } from '@mui/utils';
import {
	createTheme,
	SxProps,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { CommonProps } from '@mui/material/OverridableComponent';
import { SystemProps } from '@mui/system';
import SimpleBottomNavigation from './global_components/BottomNavigation';
import getCookieValue from './global_components/Cookies'




axios.defaults.withCredentials = true;

const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
	},
});


export default function AllHabits() {
	let navigate = useNavigate();
	const {userId, userName} = getCookieValue()
	const [allHabitDetails, setAllHabitDetails] = useState([])
	interface CustomizedState {
  	// userId: string,
		friendUserName: any,
	}

	const location = useLocation()

	React.useEffect(()=>{ 
		
		const state = location.state as CustomizedState
		const {friendUserName} = state
		console.log(friendUserName)
		axios
			.get('http://localhost:3004/friendhabits',{params: {userName: friendUserName}} )
			.then(res => {
        setAllHabitDetails(res.data)
        console.log(allHabitDetails, allHabitDetails.length)
			})
			.catch((error) => {
				console.log('get habit failed');
				console.log('error', error);
			});
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Friend Habits
					</Typography>
					<Box
						sx={{ mt: 1 }}
					> 
            {allHabitDetails.length >= 1 &&  allHabitDetails.map((details, index)=>{
              return (
                <React.Fragment key={index}>
            
              {/* <Box component="div" sx={{ display: 'inline' }}>{details.frequencyNumber === 0 ? null : details.frequencyNumber} times {details.frequencyUnit}</Box> */}
              <Box onClick={()=>{navigate("/viewhabit", {state:{userId:userId,habitId:details['userHabits_id']}})}}
							component="div" sx={{ display: 'block' }}>
                {details['habitName']} {details['frequencyUnit'] === "daily"? details['frequencyUnit']: `${details['frequencyNumber']}x ${details['frequencyUnit']}`} <br/>
                completed in this period: {details['habitStreak']['completedCount']}, rate: {details['habitStreak']['achievementRate']['$numberDecimal']*100}%, streak: {details['habitStreak']['streakCount']}</Box>
              
              <hr></hr>
              </React.Fragment>
              )
            })}
					</Box>
				</Box>
				<SimpleBottomNavigation />
			</Container>
		</ThemeProvider>
	);
}

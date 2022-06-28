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
import Header from "./global_components/Header";




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
	const state = location.state as CustomizedState
		const {friendUserName} = state
		console.log(friendUserName)

	React.useEffect(()=>{ 
		
		
		axios
      .get(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/friendhabits",
        { params: { userName: friendUserName } }
      )
      .then((res) => {
        setAllHabitDetails(res.data);
        console.log(allHabitDetails, allHabitDetails.length);
      })
      .catch((error) => {
        console.log("get habit failed");
        console.log("error", error);
      });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				
				<Box
					sx={{
						marginTop: 3,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Header />
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{friendUserName}'s habits
					</Typography>
					<Box
						sx={{ mt: 1 }}
					> 
						{allHabitDetails.length === 0 &&
							  <Box component="div" sx={{ display: 'inline' }}>No habits yet!</Box> 
						}

            {allHabitDetails.length >= 1 &&  allHabitDetails.map((details, index)=>{
              return (
                <React.Fragment key={index}>
            
            
              <Box 
							component="div" sx={{ display: 'block',justifyContent:'center', textAlign:'center' }}>
                {details['habitName']} {details['frequencyUnit'] === "daily"? details['frequencyUnit']: `${details['frequencyNumber']}x ${details['frequencyUnit']}`} <br/>
								<Typography variant="subtitle2"></Typography>
               Completed {details['habitStreak']['completedCount']},{" "}{Math.round(details["habitStreak"]["achievementRate"][
                        "$numberDecimal"
                      ] * 100)}%, streak #{details['habitStreak']['streakCount']}</Box>
              
              <hr></hr>
              </React.Fragment>
              )
            })}
					</Box>
				</Box>
				
			</Container>
			<SimpleBottomNavigation />
		</ThemeProvider>
	);
}

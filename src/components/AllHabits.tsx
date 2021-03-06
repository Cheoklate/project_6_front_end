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
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import IconButton from "@mui/material/IconButton";


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
import { useNavigate } from 'react-router-dom';
import { CommonProps } from '@mui/material/OverridableComponent';
import { SystemProps } from '@mui/system';
import SimpleBottomNavigation from './global_components/BottomNavigation';
import getCookieValue from './global_components/Cookies'
import Header from './global_components/Header'




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
	const [refresh, setRefresh] = useState(false)
  const [clicked, setClicked] = useState('')
	
	function HabitActionButtons(habitId: any){
	
  
	console.log('showing', habitId)
  const submitAction = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setClicked(event.currentTarget.value)
    event.currentTarget.style.backgroundColor= 'black'

		
    
    const habitUpdateData = {userId, habitId: habitId.habitId, action: event.currentTarget.value, actionDate: new Date()}
    axios
      .post(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/updatehabit",
        habitUpdateData
      )
      .then((res) => {
        setRefresh(!refresh)
        console.log(res)
      });
  }
	return (
    <Box component="div" sx={{ display: "flex", justifyContent:'center', textAlign:'center' }}>
      <Button
        variant="outlined"
        sx={{
          color: "black",
					textAlign:'center',
					paddingLeft:3,
          // backgroundColor: clicked === 'done' ? 'green' : 'grey',
          m: 1,
        }}
        value="done"
        onClick={
          submitAction
          
        }
        startIcon={<CheckIcon />}
      ></Button>
      <Button
        variant="outlined"
        sx={{
          color: 'black',
          // backgroundColor: clicked === 'undone' ? 'red' : 'grey',
          m: 1,
					paddingLeft:3,
        }}
        value="undone"
        onClick={submitAction}
        startIcon={<CloseIcon />}
      ></Button>
      
    </Box>
  );
}

	React.useEffect(()=>{ 
		axios

      .get(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/allhabits",
        { params: { userId } }
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
    },[refresh, setRefresh])
	return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
				
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
					<Header/>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AssignmentTurnedInIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            All My Habits
          </Typography>
          <Box sx={{ mt: 1 }}>
            {allHabitDetails.length >= 1 &&
              allHabitDetails.map((details, index) => {
                return (
                  <React.Fragment key={index}>
                    {/* <Box component="div" sx={{ display: 'inline' }}>{details.frequencyNumber === 0 ? null : details.frequencyNumber} times {details.frequencyUnit}</Box> */}
                    <Box
                      onClick={() => {
                        navigate("/viewhabit", {
                          state: {
                            userId: userId,
                            habitId: details["userHabits_id"],
                          },
                        });
                      }}
                      component="div"
                      sx={{ display: "block", justifyContent:'center', textAlign:'center' }}
                    >
                      {details["habitName"]}{" "}
                      {details["frequencyUnit"] === "daily"
                        ? details["frequencyUnit"]
                        : `${details["frequencyNumber"]}x ${details["frequencyUnit"]}`}{" "}
                      <br />
											<Typography variant="subtitle2">
                      Completed {" "}
                      {details["habitStreak"]["completedCount"]},{" "}
                      {Math.round(details["habitStreak"]["achievementRate"][
                        "$numberDecimal"
                      ] * 100)}
                      %, streak #{details["habitStreak"]["streakCount"]}
											</Typography>
                    </Box>
                    <HabitActionButtons
                      habitId={details["userHabits_id"]}
                    ></HabitActionButtons>
                    <hr></hr>
                  </React.Fragment>
                );
              })}
          </Box>
        </Box>
				  
      </Container>
			 
        <SimpleBottomNavigation />
				
    </ThemeProvider>
  );
}

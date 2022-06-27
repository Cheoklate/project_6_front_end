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
	
	function HabitActionButtons(habitId: any){
	
  const [clicked, setClicked] = useState('')
	console.log('showing', habitId)
  const submitAction = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setClicked(event.currentTarget.value)
		setRefresh(!refresh)
    
    const habitUpdateData = {userId, habitId: habitId.habitId, action: event.currentTarget.value, actionDate: new Date()}
    axios
      .post(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/updatehabit",
        habitUpdateData
      )
      .then((res) => console.log(res));
  }
	return (
    <Box component="div" sx={{ display: "flex" }}>
      <Button
        variant="outlined"
        sx={{
          color: "black",
          backgroundColor: clicked === "done" ? "green" : "none",
          m: 1,
        }}
        value="done"
        onClick={submitAction}
        startIcon={<CheckIcon />}
      ></Button>
      <Button
        variant="outlined"
        sx={{
          color: "black",
          backgroundColor: clicked === "undone" ? "red" : "none",
          m: 1,
        }}
        value="undone"
        onClick={submitAction}
        startIcon={<CloseIcon />}
      ></Button>
      {/* <Button variant="outlined" sx={{color: 'black', backgroundColor: clicked === 'skip'? 'gray':'none', m:1}} value="skip" onClick={submitAction} startIcon={<RedoIcon/>}></Button>            */}
      <IconButton
        sx={{
          color: "white",
          backgroundColor: clicked === "done" ? "green" : "secondary.main",
          m: 1,
        }}
        onClick={submitAction}
      >
        <CheckIcon />
      </IconButton>

      <IconButton
        sx={{
          color: "white",
          backgroundColor: clicked === "done" ? "red" : "secondary.main",
          m: 1,
        }}
        onClick={submitAction}
      >
        <CloseIcon />
      </IconButton>
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
    },[refresh])
	return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
				<Header/>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
                      sx={{ display: "block" }}
                    >
                      {details["habitName"]}{" "}
                      {details["frequencyUnit"] === "daily"
                        ? details["frequencyUnit"]
                        : `${details["frequencyNumber"]}x ${details["frequencyUnit"]}`}{" "}
                      <br />
                      completed in this period:{" "}
                      {details["habitStreak"]["completedCount"]}, rate:{" "}
                      {Math.round(details["habitStreak"]["achievementRate"][
                        "$numberDecimal"
                      ] * 100)}
                      %, streak: {details["habitStreak"]["streakCount"]}
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

import * as React from 'react';
import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { CommonProps } from '@mui/material/OverridableComponent';
import { SystemProps } from '@mui/system';

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


function HabitActionButtons(habitId: any){
  
  const [clicked, setClicked] = useState('')
	console.log('showing')
  const submitAction = (event: any) =>{
    setClicked(event.currentTarget.value)
    const userId = "62aae7c2fd55155e96803269"
    const habitUpdateData = {userId, habitId: habitId.habitId, action: event.currentTarget.value}
    axios
      .post("http://localhost:3004/updatehabit", habitUpdateData)
      .then(res=> console.log(res))
  }
	return (
		<Box component="div" sx={{ display: 'flex' }}>
              <Button variant="outlined" sx={{color: 'black', backgroundColor: clicked === 'done'? 'green':'none', m:1}}value="done" onClick={submitAction} startIcon={<CheckIcon/>} ></Button>
              <Button variant="outlined" sx={{color: 'black', backgroundColor: clicked === 'undone'? 'red':'none',m:1}} value="undone" onClick={submitAction} startIcon={<CloseIcon/>}></Button>
              <Button variant="outlined" sx={{color: 'black', backgroundColor: clicked === 'skip'? 'gray':'none', m:1}} value="skip" onClick={submitAction} startIcon={<RedoIcon/>}></Button>           
    </Box>
	)
}



export default function AllHabits() {

	let navigate = useNavigate();

  const [allHabitDetails, setAllHabitDetails] = useState([])

	// const allHabitDetails =  [{'name': 'veggie up', 'description': 'increase daily veg intake', 'frequencyUnit': 'daily' ,'frequencyNumber': 0, 'streak': 2, 'completionRate': 0.02}, {'name': 'water up', 'description': 'increase water intake', 'frequencyUnit': 'weekly' ,'frequencyNumber': 3, 'streak': 2, 'completionRate': 0.10}]
	// console.log(allHabitDetails)

	React.useEffect(()=>{
		// const userId = "62aae7c2fd55155e96803269"
    
		axios
			.get('http://localhost:3004/allhabits',{params: {userId: "62aae7c2fd55155e96803269"}} )
			.then(res => {
        setAllHabitDetails(res.data)
        console.log(allHabitDetails, allHabitDetails.length)

			})
			.catch((error) => {
				console.log('get habit failed');
				console.log('error', error);
			});
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
						All My Habits
					</Typography>
					<Box
						sx={{ mt: 1 }}
					> 
            {allHabitDetails.length >= 1 &&  allHabitDetails.map((details, index)=>{
              return (
                <React.Fragment key={index}>
            
              {/* <Box component="div" sx={{ display: 'inline' }}>{details.frequencyNumber === 0 ? null : details.frequencyNumber} times {details.frequencyUnit}</Box> */}
              <Box  component="div" sx={{ display: 'block' }}>
                {details['habitName']} <br/>
                streak: {details['habitStreak']['streakCount']}, completed: {details['habitStreak']['totalCompleted']}</Box>
              <HabitActionButtons habitId={details['userHabits_id']}></HabitActionButtons>
              <hr></hr>
              </React.Fragment>
              )
            })}
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

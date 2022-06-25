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
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment'
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
import RedoIcon from '@mui/icons-material/Redo';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import getCookieValue from  './global_components/Cookies'

axios.defaults.withCredentials = true;

const theme = createTheme();

function HabitActionButtons(habitId: any){
	const {userId, userName} = getCookieValue()
	
  const [clicked, setClicked] = useState('')
	console.log('showing', habitId)
  const submitAction = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setClicked(event.currentTarget.value)
		
    
    const habitUpdateData = {userId, habitId: habitId.habitId, action: event.currentTarget.value}
    axios
      .post("http://localhost:3004/updatehabit", habitUpdateData)
      .then(res=> console.log(res))
  }
	return (
		<Box component="div" sx={{ display: 'flex' }}>
              <Button variant="outlined" sx={{color: 'black', backgroundColor: clicked === 'done'? 'green':'none', m:1}}value="done" onClick={submitAction} startIcon={<CheckIcon/>} ></Button>
              <Button variant="outlined" sx={{color: 'black', backgroundColor: clicked === 'undone'? 'red':'none',m:1}} value="undone" onClick={submitAction} startIcon={<CloseIcon/>}></Button>
              {/* <Button variant="outlined" sx={{color: 'black', backgroundColor: clicked === 'skip'? 'gray':'none', m:1}} value="skip" onClick={submitAction} startIcon={<RedoIcon/>}></Button>            */}
    </Box>
	)
}

// function HabitActionButtons() {
// 	console.log('showing');
// 	return (
// 		<Box component='div' sx={{ display: 'flex' }}>
// 			<Button type='submit' color='primary' sx={{ borderRadius: 50 }}>
// 				Y
// 			</Button>
// 			<Button type='submit' color='primary' sx={{ borderRadius: 50 }}>
// 				N
// 			</Button>
// 			<Button type='submit' color='primary' sx={{ borderRadius: 50 }}>
// 				S
// 			</Button>{' '}
// 		</Box>
// 	);
// }

function StaticDatePickerLandscape (props:{startDate: Date}) {
	const [value, setValue] = React.useState<Date | null>(new Date());
	const [showAction, setShowAction] = React.useState<boolean>(false);

	return (
		<Box>
			{showAction ? <HabitActionButtons></HabitActionButtons> : null}
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<StaticDatePicker<Date>
					orientation='landscape'
					openTo='day'
					minDate={props.startDate}
					maxDate={new Date()}
					value={value}
					ToolbarComponent={() => <Box display='flex'></Box>}
					onChange={() => {
						console.log(value);
						setShowAction(true);
						setValue(value);
						console.log(showAction);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</Box>
	);
}

export default function ViewHabit() {
	const {userId, userName} = getCookieValue()
	let navigate = useNavigate();
	interface CustomizedState {
  	// userId: string,
		habitId: string,
	}


const location = useLocation();
const state = location.state as CustomizedState; 
const { habitId } = state;
	
console.log(userId, habitId, 'location')

const [habitDetails, setHabitDetails] = useState([])
const [startDate, setStartDate]=useState(new Date())
// const minDate = new Date()
 

	React.useEffect(()=>{

		axios
			.get('http://localhost:3004/viewhabit', {params: {userId, habitId}}) 
			.then(res => {
				console.log(res.data);				
				setHabitDetails(res.data.userHabits)				
				setStartDate(new Date(res.data.userHabits[0].habitStartDate))
				
			})
			.catch((error) => {
				console.log('get habit failed');
				console.log('error', error);
			});
			
			
			
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])//[habitDetails])
	console.log(startDate, habitDetails)
	

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
						View Habit
					</Typography>
					<Box sx={{ mt: 1 }}>
						{habitDetails.map((details)=>{
							
							return(
								<><Box key={`${details['userHabits_id']}name`} component='div' sx={{ display: 'inline' }}>
									{details['habitName']} <br/>
									Started on:{' '}
										{moment(details['habitStartDate']).format("LL")}
								</Box>
							</>
							)
						})}
						{/* <Box component='div' sx={{ display: 'inline' }}>
							{habitDetails[0].habitName}{' '}
						</Box> */}
						{/* <Box component='div' sx={{ display: 'inline' }}>
							{habitDetails.frequencyNumber === '0'
								? null
								: habitDetails.frequencyNumber}{' '}
						</Box>
						<Box component='div' sx={{ display: 'inline' }}>
							{habitDetails.frequencyUnit}
						</Box>
						<Box component='div' sx={{ display: 'block' }}>
							{habitDetails.description}
						</Box> */}
						<StaticDatePickerLandscape startDate={startDate}></StaticDatePickerLandscape>
					</Box>
				</Box>
				<SimpleBottomNavigation />
			</Container>
		</ThemeProvider>
	);
}

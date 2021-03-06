import * as React from 'react';

import { useState, Dispatch, SetStateAction } from 'react';
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
import { SystemProps, textAlign } from '@mui/system';
import SimpleBottomNavigation from './global_components/BottomNavigation';
import RedoIcon from '@mui/icons-material/Redo';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import getCookieValue from  './global_components/Cookies'
import { setDate } from 'date-fns';
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Header from "./global_components/Header";
import "./styles.css"; 
import NumbersIcon from '@mui/icons-material/Numbers';


axios.defaults.withCredentials = true;

const theme = createTheme();

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
const [actionHistory, setActionHistory] = useState([])
const [updatedAction, setUpdatedAction] = useState(false)
 const [clicked, setClicked] = useState('')
 const [actionDate, setActionDate] = React.useState<Date | null>(new Date());

 function checkColor(selectedDate: Date | null){
		if (!actionHistory.some(action => moment(action['date']).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD"))){
			console.log('no such date')
			setClicked('')
		} else {
		actionHistory.forEach((action)=>{
			if(moment(action['date']).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")){
				setClicked(action['action'])
			} 
		})
		console.log('date found')
		}
	}
	

// const minDate = new Date()
 

	React.useEffect(()=>{

		axios
      .get(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/viewhabit",
        { params: { userId, habitId } }
      )
      .then((res) => {
        console.log(res.data);
        setHabitDetails(res.data.userHabits);
        setStartDate(new Date(res.data.userHabits[0].habitStartDate));
        setActionHistory(res.data.userHabits[0].habitAction);
      })
      .catch((error) => {
        console.log("get habit failed");
        console.log("error", error);
      });

			
			
			
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updatedAction])//[habitDetails])
	console.log(startDate, habitDetails, actionHistory)
	
	
	
function StaticDatePickerLandscape () {
	
	const [showAction, setShowAction] = React.useState<boolean>(false);

	React.useEffect(()=>{
	if(moment(actionDate).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")){
		 checkColor(actionDate)
	 }
	}, [])
	
	
	
function HabitActionButtons(){

	
 	
  const submitAction = (event: React.MouseEvent<HTMLButtonElement>) =>{
    
		
		setClicked(event.currentTarget.value)
		
    const habitUpdateData = {userId, habitId, action: event.currentTarget.value, actionDate}
		console.log(habitUpdateData, 'habit update')
    axios
      .post(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/updatehabit",
        habitUpdateData
      )
      .then((res) => {
        console.log(res);
        setUpdatedAction(!updatedAction);
        console.log(updatedAction, "action");
      });

  }
	return (
		<Box component="div" sx={{ display: 'flex', justifyContent:'center' }}>
              <Button variant="outlined" sx={{ borderRadius: 50, color: 'black', backgroundColor: clicked === 'done'? 'green':'grey', m:1}}value="done" onClick={submitAction} startIcon={<CheckIcon/>} ></Button>
              <Button variant="outlined" sx={{ borderRadius: 50,color: 'black', backgroundColor: clicked === 'undone'? 'red':'none',m:1}} value="undone" onClick={submitAction} startIcon={<CloseIcon/>}></Button>
    </Box>
	)
}
	
	return (
		<Box>
			{showAction!== null ? <HabitActionButtons  ></HabitActionButtons> : null}
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<StaticDatePicker<Date>
					orientation='landscape'
					openTo='day'
					minDate={startDate}
					maxDate={new Date()}
					value={actionDate}
					ToolbarComponent={() => <Box display='flex'></Box>}
					onChange={(e) => {
						setActionDate(e);
						checkColor(e)
						setShowAction(true);
					}}
					renderInput={(params) => <TextField {...params} />
				}
				/>
			</LocalizationProvider>
		</Box>
	);
}
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
						justifyContent:"center",
						textAlign:'center'
          }}
        >
					<Header />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AssignmentTurnedInIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            
          </Typography>
          <Box sx={{ mt: 1 }}>
            {habitDetails.map((details) => {
              return (
                <>
                  <Box
                    key={`${details["userHabits_id"]}name`}
                    component="div"
                    sx={{ display: "inline" }}
                  >
										 <Typography component="h1" variant="h5">
                    {details["habitName"]}{" "}
                    {details["frequencyUnit"] === "daily"
                      ? details["frequencyUnit"]
                      : `${details["frequencyNumber"]}x ${details["frequencyUnit"]}`}</Typography>
                    {" "}
                    <br />Completed{" "}
                    {details["habitStreak"]["completedCount"]} times,{" "}
                    {Math.round(
                      details["habitStreak"]["achievementRate"][
                        "$numberDecimal"
                      ] * 100
                    )}
                    %, streak #{details["habitStreak"]["streakCount"]} <br/>
                    Started on {moment(details["habitStartDate"]).format("LL")}
										 <Tooltip
                      title={
                        "Stats are displayed over the frequency unit of your habit. e.g. daily, weekly or monthly"
                      }
                    >
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip> <br/>
                  </Box>
                </>
              );
            })}
					</Box>
            <StaticDatePickerLandscape></StaticDatePickerLandscape>
          
        </Box>
        
      </Container>
			<SimpleBottomNavigation />
    </ThemeProvider>
  );
}

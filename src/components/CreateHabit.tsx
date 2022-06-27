import * as React from 'react';
import "./styles.css"; 
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ToggleButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import getCookieValue from './global_components/Cookies';

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
import CreateIcon from "@mui/icons-material/Create";
import Header from "./global_components/Header";

axios.defaults.withCredentials = true;

const theme = createTheme();

export default function CreateHabit() {
	let navigate = useNavigate();
  const {userId, userName} = getCookieValue()
	const [habitName, setHabitName] = useState('');
	const [habitDesc, setHabitDesc] = useState('');
	const [frequencyUnit, setFrequencyUnit] = useState('');
	const [frequencyNumber, setFrequencyNumber] = useState('1');
	const [isPublic, setIsPublic] = React.useState(true);
	const [reminderFrequencyUnit, setReminderFrequencyUnit] = useState('');
	const [reminderFrequencyNumber, setReminderFrequencyNumber] = useState('1');
	const [reminderTime, setReminderTime] = useState("09:00");
	// const [userId, setUserId] = useState("62aaf10473badbb263ba660b")
	const [reminderMethod, setReminderMethod] = useState('email')
	const [reminderMethodContact, setReminderMethodContact] = useState('')

	const handleSubmit = (event: {
		preventDefault: () => void;
		currentTarget: HTMLFormElement | undefined;
	}) => {
		event.preventDefault();
		
		let habitDetails = {userId, habitName, habitDesc, frequencyUnit, frequencyNumber, isPublic, reminderFrequencyUnit, reminderFrequencyNumber, reminderTime, reminderMethod, reminderMethodContact};
		axios
      .post(
        "http://ec2-13-250-95-186.ap-southeast-1.compute.amazonaws.com:3004/createhabit",
        habitDetails
      )
      .then((res) => {
        let path = "/allhabits";
        console.log("succesful habitcreation");
        console.log("data", res);
        // const { id, email } = res.data;
        navigate(path);
      })
      .catch((error) => {
        console.log("create habit failed");
        console.log("error", error);
      });
		console.log(habitDetails);
	};

	return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Header />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Habit
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              className="inputRounded"
              margin="normal"
              required
              fullWidth
              id="habitName"
              label="Name"
              name="habitName"
              autoComplete="name"
              onChange={(event) => {
                setHabitName(event.target.value);
              }}
              autoFocus
            />
            <TextField
              className="inputRounded"
              margin="normal"
              required
              fullWidth
              name="habitDesc"
              label="Description"
              id="habitDesc"
              onChange={(event) => {
                setHabitDesc(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              className="inputRounded"
              required
              fullWidth
              name="frequencyUnit"
              label="Habit Frequency"
              id="frequencyUnit"
              defaultValue=""
              onChange={(event) => {
                setFrequencyUnit(event.target.value);
              }}
              select
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
            {frequencyUnit !== "daily" && frequencyUnit !== "" ? (
              <TextField
                className="inputRounded"
                margin="normal"
                required
                fullWidth
                name="frequencyNumber"
                label="# of times"
                id="frequencyNumber"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(event) => {
                  setFrequencyNumber(event.target.value);
                }}
              />
            ) : null}
            <Box>
            <TextField
              className="inputRounded"
              margin="normal"
              required
              sx={{width: 1/2}}
              name="reminderMethod"
              label="Reminder Method"
              id="reminderMethod"
              defaultValue={reminderMethod}
              onChange={(event) => {
                setReminderMethod(event.target.value);
              }}
              select
            >
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="telegram">Telegram</MenuItem>
            </TextField>

            <TextField
              className="inputRounded"
              margin="normal"
              required
              sx={{width: 1/2}}
              id="reminderMethodContact"
              name="reminderMethodContact"
              label="email / tele handle"
              autoComplete="name"
              onChange={(event) => {
                setReminderMethodContact(event.target.value);
              }}
              autoFocus
            />
            </Box>
            <Box>
            <TextField
              className="inputRounded"
              margin="normal"
              required
              fullWidth
              sx={{ width: 1/3 }}
              name="reminderFrequencyUnit"
              label="Set Reminder"
              id="reminderFrequencyUnit"
              defaultValue=""
              onChange={(event) => {
                setReminderFrequencyUnit(event.target.value);
              }}
              select
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField> 
             {reminderFrequencyUnit !== "daily" &&
            reminderFrequencyUnit !== "" ? (
              <TextField
                className="inputRounded"
                margin="normal"
                required
                sx={{ width: 1/4 }}
                // style = {{width: 110}} 
                name="reminderFrequencyNumber"
                label="Frequency"
                id="reminderFrequencyNumber"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(event) => {
                  setReminderFrequencyNumber(event.target.value);
                }}
              />
            ) : null}
            
              <TextField
                className="inputRounded"
                id="reminderTime"
                name="reminderTime"
                label="Reminder Time"
                type="time"
                fullWidth
                
                margin="normal"
                defaultValue="09:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 900, // 5 min
                }}
                sx={{ width: 140 }}
                onChange={(event) => {
                  setReminderTime(event.target.value);
                }}
              />
            
            </Box>
            
            <Box
            sx={{ display: "flex",justifyContent:"center"}}
            margin="normal">
            <FormControlLabel
              control={<Checkbox
               />}
              label="Set Private"
              
              value={isPublic}
              onChange={() => {
                setIsPublic(!isPublic);
                console.log(isPublic);
              }}
            /> 
            </Box>
            
            

            <Button
              type="submit"
              fullWidth
               
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "secondary.main", borderRadius: 25 }}
            >
              Create
            </Button>
            <Box></Box>
          </Box>
        </Box>
     
        
        
      </Container>
      <SimpleBottomNavigation />
    </ThemeProvider>
  );
}

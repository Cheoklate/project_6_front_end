import * as React from 'react';
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

const theme = createTheme();

export default function CreateHabit() {
	let navigate = useNavigate();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [frequencyUnit, setFrequencyUnit] = useState('');
	const [frequencyNumber, setFrequencyNumber] = useState('');
	const [privateHabit, setPrivateHabit] = React.useState(false);
	const [reminderFrequencyUnit, setReminderFrequencyUnit] = useState('');
	const [reminderFrequencyNumber, setReminderFrequencyNumber] = useState('');
	const [reminderTime, setReminderTime] = useState('');

	const handleSubmit = (event: {
		preventDefault: () => void;
		currentTarget: HTMLFormElement | undefined;
	}) => {
		event.preventDefault();
		// const data = new FormData(event.currentTarget);
		let habitDetails = { name, description, frequencyUnit, frequencyNumber, privateHabit, reminderFrequencyUnit, reminderFrequencyNumber, reminderTime};
		axios
			.post('http://localhost:3004/createhabit',  { name, description, frequencyUnit, frequencyNumber})
			.then((res) => {
				let path = '/dashboard';
				console.log('succesful habitcreation');
				console.log('data', res);
				// const { id, email } = res.data;
				navigate(path);
			})
			.catch((error) => {
				console.log('create habit failed');
				console.log('error', error);
			});
		console.log(habitDetails);
	};

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
						Create Habit
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							label='Name'
							name='name'
							autoComplete='name'
							onChange={(event) => {
								setName(event.target.value);
							}}
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='description'
							label='Description'
							id='description'
							onChange={(event) => {
								setDescription(event.target.value);
							}}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
						 	name="frequencyUnit"
							label="Habit Frequency"	
							id="frequencyUnit"  
							defaultValue=""
							  
							onChange={(event) => {
								setFrequencyUnit(event.target.value);
							}} select>
							<MenuItem value="daily">Daily</MenuItem>
							<MenuItem value="weekly">Weekly</MenuItem>
							<MenuItem value="monthly">Monthly</MenuItem>
						</TextField>
						{frequencyUnit !== "daily" && frequencyUnit !== "" ?
						<TextField
							margin='normal'
							required
							fullWidth
							name='frequencyNumber'
							label='# of times'
							id='frequencyNumber'
							type='number'
							InputProps={{ inputProps: { min: 1} }}
							onChange={(event) => {
								setFrequencyNumber(event.target.value);
							}}
						/>	: null}	
						<FormControlLabel 
							control={<Checkbox />} 
							label="Set Private"
							value="private"
							onChange={() => {
								setPrivateHabit(!privateHabit);
								console.log(privateHabit)
							}}
						 />
						 
						 <TextField
							margin='normal'
							required
							fullWidth
						 	name="reminderFrequencyUnit"
							label="Reminder Frequency"	
							id="reminderFrequencyUnit"  
							defaultValue=""
							  
							onChange={(event) => {
								setReminderFrequencyUnit(event.target.value);
							}} select>
							<MenuItem value="daily">Daily</MenuItem>
							<MenuItem value="weekly">Weekly</MenuItem>
							<MenuItem value="monthly">Monthly</MenuItem>
						</TextField>
						{reminderFrequencyUnit !== "daily" && reminderFrequencyUnit !== ""  ?
						<TextField
							margin='normal'
							required
							name='reminderFrequencyNumber'
							label='Number'
							id='reminderFrequencyNumber'
							type='number'
							InputProps={{ inputProps: { min: 1} }}
							onChange={(event) => {
								setReminderFrequencyNumber(event.target.value);
							}}
						/> : null }
						<TextField
							id="reminderTime"
							name='reminderTime'
							label="Reminder Time"
							type="time"
							defaultValue="09:00"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								step: 900, // 5 min
							}}
							sx={{ width: 150 }}
							onChange={(event) => {
								setReminderTime(event.target.value);
							}}
						/>

					
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Create
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

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
// const [habitDetails, setHabitDetails] =  useState([{'name': 'veggie up', 'description': 'increase daily veg intake', 'frequencyUnit': 'daily' ,'frequencyNumber': '0'}])

//useState([{name:'', description:'', frequencyUnit:'', frequencyNumber:''}]);	

export default function ViewHabit() {

	let navigate = useNavigate();
	

	const habitDetails =  {'name': 'veggie up', 'description': 'increase daily veg intake', 'frequencyUnit': 'daily' ,'frequencyNumber': '0'}
	console.log(habitDetails)

	// React.useEffect(()=>{
		
	// 	axios
	// 		.get('http://localhost:3000/gethabit') //{habitId})
	// 		.then(res => {
	// 			// const details = res.data
	// 			const details =  {'name': 'veggie up', 'description': 'increase daily veg intake', 'frequencyUnit': 'daily' ,'frequencyNumber': '0'}
	// 			setHabitDetails([details])
	// 			console.log(habitDetails);
	// 		})
	// 		.catch((error) => {
	// 			console.log('get habit failed');
	// 			console.log('error', error);
	// 		});
	// 		console.log(habitDetails);
	// }, [habitDetails])

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
					<Box
						sx={{ mt: 1 }}
					>
						<Box component="div" sx={{ display: 'inline' }} >{habitDetails.name} </Box>
						<Box component="div" sx={{ display: 'inline' }}>{habitDetails.frequencyNumber === '0' ? null :habitDetails.frequencyNumber } </Box>
						<Box component="div" sx={{ display: 'inline' }}>{habitDetails.frequencyUnit}</Box>
						<Box component="div" sx={{ display: 'block' }}>{habitDetails.description}</Box>
						<Box component="div" sx={{ display: 'inline' }}>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>M</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>T</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>W</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>T</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>F</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>S</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>S</Button>
						</Box>


						
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

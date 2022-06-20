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
import SimpleBottomNavigation from './global_components/BottomNavigation';

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
// const [habitDetails, setHabitDetails] =  useState([{'name': 'veggie up', 'description': 'increase daily veg intake', 'frequencyUnit': 'daily' ,'frequencyNumber': '0'}])

//useState([{name:'', description:'', frequencyUnit:'', frequencyNumber:''}]);

function HabitActionButtons() {
	console.log('showing');
	const submitAction = (event: any) => {
		console.log(event.currentTarget.value);
	};
	return (
		<Box component='div' sx={{ display: 'flex' }}>
			{/* <Button type="submit" color="primary" sx={ { borderRadius: 50 } }>Y</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>N</Button>
							<Button type="submit" color="primary" sx={ { borderRadius: 50 } }>S</Button>  */}
			<Button
				type='submit'
				color='primary'
				value='done'
				onClick={submitAction}
				startIcon={<CheckIcon />}
			></Button>
			<Button
				color='primary'
				value='undone'
				onClick={submitAction}
				startIcon={<CloseIcon />}
			></Button>
			<Button
				color='primary'
				value='skip'
				onClick={submitAction}
				startIcon={<RedoIcon />}
			></Button>
		</Box>
	);
}

export default function AllHabits() {
	let navigate = useNavigate();

	const allHabitDetails = [
		{
			name: 'veggie up',
			description: 'increase daily veg intake',
			frequencyUnit: 'daily',
			frequencyNumber: 0,
			streak: 2,
			completionRate: 0.02,
		},
		{
			name: 'water up',
			description: 'increase water intake',
			frequencyUnit: 'weekly',
			frequencyNumber: 3,
			streak: 2,
			completionRate: 0.1,
		},
	];
	console.log(allHabitDetails);

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
						All My Habits
					</Typography>
					<Box sx={{ mt: 1 }}>
						{allHabitDetails.map((details) => {
							return (
								<>
									<Box component='div' sx={{ display: 'inline' }}>
										{details.name}{' '}
									</Box>
									<Box component='div' sx={{ display: 'inline' }}>
										{details.frequencyNumber === 0
											? null
											: details.frequencyNumber}{' '}
										times {details.frequencyUnit}
									</Box>
									<Box component='div' sx={{ display: 'block' }}>
										streak: {details.streak}, completion:{' '}
										{details.completionRate * 100}%
									</Box>
									<HabitActionButtons></HabitActionButtons>
									<hr></hr>
								</>
							);
						})}
					</Box>
				</Box>
				<SimpleBottomNavigation />
			</Container>
		</ThemeProvider>
	);
}

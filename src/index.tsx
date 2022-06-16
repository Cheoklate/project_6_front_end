import reportWebVitals from './reportWebVitals';
import React, { lazy, Suspense } from 'react';
// ReactRouter
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const SignUpPage = lazy(() => import('./components/SignUp'));
const SignInPage = lazy(() => import('./components/SignIn'));
const CreateHabit = lazy(() => import('./components/CreateHabit'));
const ViewHabit = lazy(() => import('./components/ViewHabit'));
const AllHabits = lazy(() => import('./components/AllHabits'));


const rootElement = document.createElement('div');

document.body.appendChild(rootElement);

const root = createRoot(rootElement);

root.render(
	<BrowserRouter>
		<Suspense
			fallback={
				<div>
					Loading Page...
				</div>
			}
		>
			<Routes>
				<Route path='signup' element={<SignUpPage />} />
				<Route path='signin' element={<SignInPage />} />
				<Route path='createhabit' element={<CreateHabit />} />
				<Route path='viewhabit' element={<ViewHabit />} />
				<Route path='allhabits' element={<AllHabits />} />
			</Routes>
		</Suspense>
	</BrowserRouter>
);

reportWebVitals();

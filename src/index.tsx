import reportWebVitals from './reportWebVitals';
import React, { lazy, Suspense } from 'react';
// ReactRouter
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import CircularStatic from './components/LoadingProgress';
// import FriendList from "./components/FriendList";

const SignUpPage = lazy(() => import('./components/SignUp'));
const SignInPage = lazy(() => import('./components/SignIn'));
const CreateHabit = lazy(() => import('./components/CreateHabit'));
const ViewHabit = lazy(() => import('./components/ViewHabit'));
const AllHabits = lazy(() => import('./components/AllHabits'));
const FriendHabits = lazy(() => import('./components/FriendHabits'));

const FriendList = lazy(() => import("./components/FriendList"));

const rootElement = document.createElement('div');

document.body.appendChild(rootElement);

const root = createRoot(rootElement);

root.render(
	<BrowserRouter>
		<Suspense
			fallback={
				<div>
					<CircularStatic />
				</div>
			}
		>
			<Routes>
				<Route path='signup' element={<SignUpPage />} />
				<Route path='signin' element={<SignInPage />} />
				<Route path='createhabit' element={<CreateHabit />} />
				<Route path='viewhabit' element={<ViewHabit />} />
				<Route path='allhabits' element={<AllHabits />} />
				<Route path='friendhabits' element={<FriendHabits />} />
				<Route path='friends' element={<FriendList />} />

			</Routes>
		</Suspense>
	</BrowserRouter>
);

reportWebVitals();

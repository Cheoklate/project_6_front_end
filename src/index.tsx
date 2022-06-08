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
			</Routes>
		</Suspense>
	</BrowserRouter>
);

reportWebVitals();

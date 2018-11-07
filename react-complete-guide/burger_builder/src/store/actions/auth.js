import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFailed = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000)
	};
};

export const auth = (email, password, method) => {
	return dispatch => {
		dispatch(authStart())
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
		let url = null;
		switch (method) {
			case 'signUp': url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;
				break;
			case 'signIn': url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
				break;
			default:
		}
		axios.post(url, authData)
		.then(response => {
			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('userId', response.data.localId);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(err => {
			dispatch(authFailed(err.response.data.error));
		})

	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
			} else {
				dispatch(logout());
			}
		}
	};
};

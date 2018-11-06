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
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

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
		let url = null;
		switch (method) {
			case 'signUp': url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
				break;
			case 'signIn': url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
				break;
			default:
		}
		axios.post(url, authData)
		.then(response => {
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn))
		})
		.catch(err => {
			dispatch(authFailed(err.response.data.error));
		})

	};
};

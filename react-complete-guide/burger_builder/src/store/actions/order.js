import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderID: id,
		orderData: orderData
	};
};

export const purchaseBurgerFailed = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};


export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('/orders.json', orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch(error => {
				dispatch(purchaseBurgerFailed(error))
			})
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFailed = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error: error
	}
}

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('/orders.json')
			.then(response => {
				const fetchedOrder = [];
				for (let key in response.data) {
					fetchedOrder.push({
						...response.data[key],
						id: key
					})
				}
				dispatch(fetchOrdersSuccess(fetchedOrder));
			})
			.catch(error => {
				dispatch(fetchOrdersFailed(error));
			});
	};
};

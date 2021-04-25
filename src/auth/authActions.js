import { toastr } from 'react-redux-toastr'
import axios from 'axios'

export const TOKEN_VALIDATED = '[AUTH] TOKEN_VALIDATED';
export const USER_FETCHED = '[AUTH] USER_FETCHED';

const GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_API_URL = 'http://localhost:3003/api';
const GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_OAPI_URL = 'http://localhost:3003/oapi';

export function login(values) {
	return submit(values, `${GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_API_URL}/login`)
}

export function signup(values) {
	return submit(values, `${GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_OAPI_URL}/signup`)
}
function submit(values, url) {
	return dispatch => {
		axios.post(url, values)
			 .then(resp => {
				 dispatch([
					 {type: USER_FETCHED, payload: resp.data}
				 ])
			 })
			 .catch(e => {
				 e.response.data.errors.forEach(
						error => toastr.error('Erro', error))
			 })
	}
}

export function logout() {
	return {type: TOKEN_VALIDATED, payload: false}
}
export function validateToken(token) {
	return dispatch => {
		if(token) {
			axios.post(`${GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_OAPI_URL}/validateToken`, {token})
				 .then(resp => {
					 dispatch({type: TOKEN_VALIDATED, payload: resp.data.valid})
				 })
				 .catch(e => dispatch({type: TOKEN_VALIDATED, payload: false}))
		} else {
			dispatch({type: TOKEN_VALIDATED, payload: false})
		}
	}
}

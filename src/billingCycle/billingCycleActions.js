import axios from 'axios';
import {toastr} from "react-redux-toastr";
import { initialize } from 'redux-form';
import { showTabs, selectTab } from "../common/tab/tabActions";

export const BILLING_CYCLES_FETCHED = '[BILLING CYCLES] LISTAR';
export const FORM_BILLING_CYCLES = '[FORM] BILLING CYCLES';

const GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_API_URL = 'http://localhost:3003/api';
const GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_OAPI_URL = 'http://localhost:3003/oapi';

const BASE_URL = GAMBIARRA_PQ_NAO_RECONHECE_ENV_APP_API_URL;


const INITIAL_VALUES = {credits: [{}], debts: [{}]};

export function getList() {
	const request = axios.get(`${BASE_URL}/billingCycles`)
	return {
		type: BILLING_CYCLES_FETCHED,
		payload: request
	}
}

export function create(values) {
	return submit(values, 'post')
}

export function update(values) {
	return submit(values, 'put')
}

export function remove(values) {
	return submit(values, 'delete')
}

function submit(values, method) {
	return dispatch => {
		const id = values._id ? values._id : ''
		axios[method](`${BASE_URL}/billingCycles/${id}`, values)
			 .then( resp => {
				 toastr.success('Sucesso', 'Operação realizada com sucesso.');
				 dispatch(init())
			 })
			 .catch( e => {
				 e.response.data.errors.forEach(error => toastr.error('Erro', error));
			 });
	}
}

export function showUpdate(billingCycle) {
	return [
		 showTabs('tabUpdate'),
		 selectTab('tabUpdate'),
		 initialize(FORM_BILLING_CYCLES, billingCycle)
	]
}

export function showDelete(billingCycle) {
	return [
		 showTabs('tabDelete'),
		 selectTab('tabDelete'),
		 initialize(FORM_BILLING_CYCLES, billingCycle)
	]
}

export function init() {
	return [
		 showTabs('tabList', 'tabCreate'),
		 selectTab('tabList'),
		 getList(),
		 initialize(FORM_BILLING_CYCLES, INITIAL_VALUES)
	]
}

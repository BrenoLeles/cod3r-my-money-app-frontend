import axios from 'axios';

export const BILLING_SUMMARY_FETCHED = '[BILLING SUMMARY] FETCHED';

const BASE_URL = 'http://localhost:3003/api'

export function getSummary() {
	const request = axios.get(`${BASE_URL}/billingCycles/summary`);
	return  {
		type: BILLING_SUMMARY_FETCHED,
		payload: request
	}
}

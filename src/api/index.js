import axios from 'axios'

const API_URL = 'http://dev.sso.salomon/api'

export function fetchTithes(year = 2018, month = 8) {  
	return axios.get(`${API_URL}/tithes?filter[church_id_eq]=1&year=${year}&month=${month}`)
}

export function fetchTithe (titheId) {  
	return axios.get(`${API_URL}/tithes/${titheId}`)
}

export function destroyTithe (titheId) {  
	return axios.delete(`${API_URL}/tithes/${titheId}`)
}

export function updateTithe (titheId) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Saving tithe updates');
		}, 300)
	})
}
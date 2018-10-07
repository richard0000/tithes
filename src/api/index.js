import axios from 'axios'

const API_URL = 'http://dev.sso.salomon/api'

export function fetchTithes(year = 2018, month = 10) {  
	return axios.get(`${API_URL}/tithes?filter[church_id_eq]=1&year=${year}&month=${month}`)
}

export function fetchTithe (titheId) {  
	return axios.get(`${API_URL}/tithes/${titheId}`)
}

export function createTithe (user_id, amount, date) {  
	return axios.post(`${API_URL}/tithes`, {
		user_id: user_id,
		amount: amount,
		date: date
	})
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

export function fetchMembers() {  
	return axios.get(`${API_URL}/users?filter[church_id_eq]=1`)
}

export function fetchMember (memberId) {
	return axios.get(`${API_URL}/users/${memberId}`)
}

export function createMember (member) {
	if((member.email == null)||(member.email == '')){
		member.email = member.name + '@' + member.surname + '.com'
	}
	return axios.post(`${API_URL}/users`, {
		name: member.name,
		surname: member.surname,
		email: member.email,
		password: '12345678',
		church_id: 1
	})
}
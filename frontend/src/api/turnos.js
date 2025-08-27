import axios from './axios';

export const getTurnos = async (params) => {
	const { data } = await axios.get('turnos', { params });
	return data;
};

export const getTurno = async (id) => {
	const { data } = await axios.get(`turnos/${id}`);
	return data;
};

export const createTurno = async (turnoData) => {
	const { data } = await axios.post('turnos', turnoData);
	return data;
};


export const updateTurno = async (id, turnoData) => {
	const { data } = await axios.put(`turnos/${id}`, turnoData);
	return data;
};


export const deleteTurno = async (id) => {
	const { data } = await axios.delete(`turnos/${id}`);
	return data;
};

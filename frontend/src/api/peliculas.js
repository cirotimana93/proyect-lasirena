import axios from './axios';

export const getPeliculas = async (params) => {
	const { data } = await axios.get('peliculas', { params });
	return data;
};

export const getPelicula = async (id) => {
	const { data } = await axios.get(`peliculas/${id}`);
	return data;
};

export const createPelicula = async (peliculaData) => {
	const { data } = await axios.post('peliculas', peliculaData);
	return data;
};

export const updatePelicula = async (id, peliculaData) => {
	const { data } = await axios.put(`peliculas/${id}`, peliculaData);
	return data;
};

export const deletePelicula = async (id) => {
	const { data } = await axios.delete(`peliculas/${id}`);
	return data;
};

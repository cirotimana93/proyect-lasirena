import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPeliculas, deletePelicula } from '../api/peliculas';
import { getTurnos } from '../api/turnos';
import Swal from 'sweetalert2';

import { forwardRef, useImperativeHandle } from 'react';

const PeliculasList = forwardRef(function PeliculasList({ onEdit }, ref) {
  const [peliculas, setPeliculas] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      getPeliculas(),
      getTurnos()
    ])
      .then(([peliculasData, turnosData]) => {
        setPeliculas(peliculasData.data || peliculasData || []);
        setTurnos(turnosData.data || turnosData || []);
        setLoading(false);
      })
      .catch(() => {
        setPeliculas([]);
        setTurnos([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    reload: fetchData
  }));

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar película?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#0056a6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      await deletePelicula(id);
      setPeliculas(peliculas.filter(p => p.id !== id));
      Swal.fire('Eliminada', 'La película fue eliminada correctamente.', 'success');
    }
  };

  if (loading) {
    return (
      <div className="peliculas-container">
        <div className="peliculas-header">
          <h2>Películas</h2>
        </div>
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="peliculas-container">
      <div className="peliculas-header">
        <h2>Películas</h2>
        <div className="peliculas-count">{peliculas.length} películas encontradas</div>
      </div>
      
      <div className="table-responsive">
        <table className="peliculas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>F. Publicación</th>
              <th>Estado</th>
              <th>Turnos</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {peliculas.length > 0 ? (
              peliculas.map(p => (
                <tr key={p.id}>
                  <td className="id-column">{p.id}</td>
                  <td className="title-column">{p.titulo}</td>
                  <td>
                    <span className="fecha-badge">
                      {p.fecha_estreno ? p.fecha_estreno.slice(0,10) : '-'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${p.estado === 'Inactivo' ? 'inactive' : 'active'}`}>
                      {p.estado || 'Activo'}
                    </span>
                  </td>
                  <td className="turnos-column">
                    {turnos.filter(t => t.pelicula_id === p.id).length}
                  </td>
                  <td className="actions-column">
                    <div className="action-buttons">
                      <button 
                        className="btn-action edit" 
                        title="Editar" 
                        onClick={() => onEdit && onEdit(p)}
                      >
                        <span className="icon">✏️</span>
                        <span className="tooltip">Editar</span>
                      </button>
                      <button 
                        className="btn-action turnos" 
                        title="Turnos" 
                        onClick={() => navigate(`/peliculas/${p.id}/turnos`)}
                      >
                        <span className="icon">🕒</span>
                        <span className="tooltip">Turnos</span>
                      </button>
                      <button 
                        className="btn-action delete" 
                        title="Eliminar" 
                        onClick={() => handleDelete(p.id)}
                      >
                        <span className="icon">🗑️</span>
                        <span className="tooltip">Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No hay películas disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default PeliculasList;
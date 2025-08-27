
import { useState, useRef, useEffect } from 'react';
import TurnosList from '../components/TurnosList';
import TurnoForm from './TurnoForm';
import { useNavigate, useParams } from 'react-router-dom';
import { getPelicula } from '../api/peliculas';

export default function TurnosPage() {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [editTurno, setEditTurno] = useState(null);
  const [pelicula, setPelicula] = useState(null);
  const navigate = useNavigate();
  const turnosListRef = useRef();

  useEffect(() => {
    getPelicula(id).then(data => setPelicula(data)).catch(() => setPelicula(null));
  }, [id]);

  const handleNuevo = () => {
    setEditTurno(null);
    setShowForm(true);
  };
  const handleEdit = (turno) => {
    setEditTurno(turno);
    setShowForm(true);
  };

  const handleFormClose = (recargar = false) => {
    setShowForm(false);
    if (recargar && turnosListRef.current) {
      turnosListRef.current.reload();
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => navigate('/peliculas')} style={{background:'#0056a6', color:'#fff'}}>Volver a películas</button>
      <h2>Turnos de la película</h2>
      {pelicula && (
        <div style={{marginBottom: '16px', fontSize: '1.15rem', color: '#0056a6'}}>
          <strong>{pelicula.titulo}</strong>
          {pelicula.duracion_min && (
            <span style={{marginLeft:8, color:'#333'}}>
              - {pelicula.duracion_min} min
            </span>
          )}
        </div>
      )}
      <TurnosList ref={turnosListRef} peliculaId={id} onEdit={handleEdit} onAdd={handleNuevo} />
      {showForm && (
        <TurnoForm turno={editTurno} peliculaId={id} onClose={handleFormClose} />
      )}
    </div>
  );
}

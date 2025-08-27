import { useState } from 'react';
import { createPelicula, updatePelicula } from '../api/peliculas';
import Swal from 'sweetalert2';
import '../../src/App.css'; 

export default function PeliculaForm({ pelicula, onClose, onSave }) {
  const [titulo, setTitulo] = useState(pelicula?.titulo || '');
  const [fecha_estreno, setFechaEstreno] = useState(pelicula?.fecha_estreno?.slice(0,10) || '');
  const [estado, setEstado] = useState(pelicula?.estado || 'activo');
  const [sinopsis, setSinopsis] = useState(pelicula?.sinopsis || '');
  const [duracion_min, setDuracionMin] = useState(pelicula?.duracion_min || 120);
  const [clasificacion, setClasificacion] = useState(pelicula?.clasificacion || '');
  const [generos, setGeneros] = useState(pelicula?.generos || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = {
        titulo,
        fecha_estreno,
        estado,
        sinopsis,
        duracion_min: parseInt(duracion_min),
        clasificacion,
        generos
      };
      if (pelicula) {
        await updatePelicula(pelicula.id, data);
        Swal.fire('¡Actualizado!', 'Pelicula actualizada correctamente', 'success');
      } else {
        await createPelicula(data);
        Swal.fire('¡Creada!', 'Pelicula creada correctamente', 'success');
      }
  onClose();
  if (onSave) onSave();
    } catch (error) {
      Swal.fire('Error', 'Ocurrio un error al guardar la pelicula', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
  <div className="pelicula-form-modal" onClick={e => e.stopPropagation()} style={{scrollbarWidth:'none'}}>
        <div className="form-header">
          <h2>{pelicula ? 'Editar' : 'Nueva'} Película</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="pelicula-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="titulo">Título *</label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                required
                placeholder="Ingresa el titulo de la pelicula"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fecha_estreno">Fecha de Estreno *</label>
              <input
                id="fecha_estreno"
                type="date"
                value={fecha_estreno}
                onChange={e => setFechaEstreno(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duracion_min">Duración (minutos) *</label>
              <input
                id="duracion_min"
                type="number"
                min="1"
                value={duracion_min}
                onChange={e => setDuracionMin(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="estado">Estado *</label>
              <select
                id="estado"
                value={estado}
                onChange={e => setEstado(e.target.value)}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="sinopsis">Sinopsis</label>
            <textarea
              id="sinopsis"
              value={sinopsis}
              onChange={e => setSinopsis(e.target.value)}
              rows={4}
              placeholder="Describe brevemente la trama de la pelicula..."
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="clasificacion">Clasificación</label>
              <input
                id="clasificacion"
                type="text"
                value={clasificacion}
                onChange={e => setClasificacion(e.target.value)}
                placeholder="Ejemplo: A, B, C, +18, etc."
              />
            </div>
            <div className="form-group">
              <label htmlFor="generos">Géneros</label>
              <input
                id="generos"
                type="text"
                value={generos}
                onChange={e => setGeneros(e.target.value)}
                placeholder="Ejemplo: Acción, Drama, Comedia"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Película'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { createTurno, updateTurno } from '../api/turnos';
import Swal from 'sweetalert2';
import '../../src/App.css'; 

export default function TurnoForm({ turno, peliculaId, onClose }) {
  const [inicio, setInicio] = useState(turno?.inicio?.slice(0,16) || '');
  const [fin, setFin] = useState(turno?.fin?.slice(0,16) || '');
  const [sala, setSala] = useState(turno?.sala || '');
  const [precio, setPrecio] = useState(turno?.precio || 0);
  const [idioma, setIdioma] = useState(turno?.idioma || 'dob');
  const [formato, setFormato] = useState(turno?.formato || '2D');
  const [estado, setEstado] = useState(turno?.estado || 'activo');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // buscar por id
      const pelicula_id = typeof peliculaId === 'object' ? peliculaId.id : peliculaId;
      const data = { inicio, fin, sala, precio, idioma, formato, estado, pelicula_id };
      if (turno) {
        await updateTurno(turno.id, data);
        Swal.fire('¡Actualizado!', 'Turno actualizado correctamente', 'success');
      } else {
        await createTurno(data);
        Swal.fire('¡Creado!', 'Turno creado correctamente', 'success');
      }
      onClose(true);
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al guardar el turno', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
  <div className="turno-form-modal" onClick={e => e.stopPropagation()} style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
        <div className="form-header">
          <h2>{turno ? 'Editar' : 'Nuevo'} Turno</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="turno-form">
          <div className="form-group">
            <label htmlFor="inicio">Hora de Inicio *</label>
            <input
              id="inicio"
              type="datetime-local"
              value={inicio}
              onChange={e => setInicio(e.target.value)}
              required
            />
            {inicio && (
              <div style={{fontSize:'0.95rem', color:'#0056a6', marginTop:4}}>
                <strong>Inicio:</strong> {new Date(inicio).toLocaleString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="fin">Hora de Fin *</label>
            <input
              id="fin"
              type="datetime-local"
              value={fin}
              onChange={e => setFin(e.target.value)}
              required
            />
            {fin && (
              <div style={{fontSize:'0.95rem', color:'#0056a6', marginTop:4}}>
                <strong>Fin:</strong> {new Date(fin).toLocaleString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="sala">Sala *</label>
            <input
              id="sala"
              type="text"
              value={sala}
              onChange={e => setSala(e.target.value)}
              required
              placeholder="Ejemplo: Sala 1, VIP, etc."
            />
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio *</label>
            <input
              id="precio"
              type="number"
              min="0"
              step="0.01"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
              required
              placeholder="Precio del turno"
            />
          </div>
          <div className="form-group">
            <label htmlFor="idioma">Idioma *</label>
            <select
              id="idioma"
              value={idioma}
              onChange={e => setIdioma(e.target.value)}
              required
            >
              <option value="dob">Doblada</option>
              <option value="sub">Subtitulada</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="formato">Formato *</label>
            <select
              id="formato"
              value={formato}
              onChange={e => setFormato(e.target.value)}
              required
            >
              <option value="2D">2D</option>
              <option value="3D">3D</option>
            </select>
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
          
          <div className="form-note">
            <p>💡 Los turnos definen los horarios de proyección para esta película.</p>
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
              {isSubmitting ? 'Guardando...' : 'Guardar Turno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
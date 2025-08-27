import { useEffect, useState } from 'react';
import { getPeliculas } from '../api/peliculas';
import { getTurnos } from '../api/turnos';
import '../../src/App.css'; 
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [peliculas, setPeliculas] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getPeliculas(),
      getTurnos()
    ]).then(([peliculasRes, turnosRes]) => {
      setPeliculas(peliculasRes.data || peliculasRes || []);
      setTurnos(turnosRes.data || turnosRes || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="homepage-container">
        <div className="homepage-header">
          <div className="logo-container">
            <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px', height: '50px' }} />
            <h1>Películas y Turnos</h1>
          </div>
        </div>
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  return (
         
          <div className="homepage-container">
            <div className="homepage-header">
              <div className="logo-container">
                <img src="/logo.png" alt="Logo" className="logo" style={{ width: '200px', height: '50px' }} />
                <h1>Películas y Turnos</h1>
              </div>
              <div className="stats-container">
                <div className="stat-card">
                  <span className="stat-number">{peliculas.length}</span>
                  <span className="stat-label">Películas</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{turnos.length}</span>
                  <span className="stat-label">Turnos</span>
                </div>
              </div>
            </div>

            <div className="content-container" style={{maxWidth:'1400px', margin:'0 auto'}}>
              <div className="table-container" style={{width:'100%', minWidth:'1000px'}}>
                <div className="table-header">
                  <h2>Programación de Películas</h2>
                  <span className="table-subtitle">
                    Mostrando {turnos.length} turnos programados
                  </span>
                </div>
                <div className="table-responsive" style={{overflowX:'auto'}}>
                  <table className="peliculas-turnos-table" style={{width:'100%', minWidth:'1000px'}}>
                    <thead>
                      <tr>
                        <th>Película</th>
                        <th>Sinopsis</th>
                        <th>Duración</th>
                        <th>Género</th>
                        <th>Horario</th>
                        <th>Sala</th>
                      </tr>
                    </thead>
                    <tbody>
                      {peliculas.map(p => {
                        const turnosPelicula = turnos.filter(t => t.pelicula_id === p.id);
                        if (turnosPelicula.length === 0) {
                          return (
                            <tr key={p.id} className="no-turnos-row">
                              <td className="pelicula-name">
                                <span className="pelicula-title">{p.titulo}</span>
                                {p.fecha_estreno && (
                                  <span className="pelicula-year">
                                    ({new Date(p.fecha_estreno).getFullYear()})
                                  </span>
                                )}
                              </td>
                              <td className="pelicula-sinopsis">{p.sinopsis}</td>
                              <td className="pelicula-duration">{p.duracion_min ? `${p.duracion_min} min` : '-'}</td>
                                <td className="pelicula-genero">
                                  {p.generos
                                    ? Array.isArray(p.generos)
                                      ? p.generos.join(', ') + (p.clasificacion ? ` (${p.clasificacion})` : '')
                                      : String(p.generos).replace(/[{}]/g, '').split(',').map(g => g.trim()).join(', ') + (p.clasificacion ? ` (${p.clasificacion})` : '')
                                    : '-'}
                                </td>
                              <td colSpan={2} className="no-turnos">
                                <span className="no-turnos-icon">⏰</span>
                                Sin turnos programados
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <>
                            {turnosPelicula.map(t => (
                              <tr key={`${p.id}-${t.id}`} className="turno-row">
                                <td className="pelicula-name">
                                  <span className="pelicula-title">{p.titulo}</span>
                                  {p.fecha_estreno && (
                                    <span className="pelicula-year">
                                      ({new Date(p.fecha_estreno).getFullYear()})
                                    </span>
                                  )}
                                </td>
                                <td className="pelicula-sinopsis">{p.sinopsis}</td>
                                <td className="pelicula-duration">{p.duracion_min ? `${p.duracion_min} min` : '-'}</td>
                                <td className="pelicula-genero">
                                  {p.generos
                                    ? Array.isArray(p.generos)
                                      ? p.generos.join(', ') + (p.clasificacion ? ` (${p.clasificacion})` : '')
                                      : String(p.generos).replace(/[{}]/g, '').split(',').map(g => g.trim()).join(', ') + (p.clasificacion ? ` (${p.clasificacion})` : '')
                                    : '-'}
                                </td>
                                <td className="turno-time">
                                  {(t.inicio && t.fin)
                                    ? `${new Date(t.inicio).toLocaleString('es-ES', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })} - ${new Date(t.fin).toLocaleString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}`
                                    : '-'}
                                </td>
                                <td className="turno-sala">{t.sala || '-'}</td>
                              </tr>
                            ))}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="action-buttons">
                <button className="btn-primary" onClick={() => navigate('/peliculas')}>
                  <span className="btn-icon">🎬</span>
                  Gestionar Películas
                </button>
              </div>
            </div>
          </div>
  );
}

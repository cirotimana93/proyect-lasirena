import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { getTurnos, deleteTurno } from '../api/turnos';
import Swal from 'sweetalert2';

const TurnosList = forwardRef(function TurnosList({ peliculaId, onEdit, onAdd }, ref) {
  const [turnos, setTurnos] = useState([]);

  const fetchData = useCallback(() => {
    const id = typeof peliculaId === 'object' ? peliculaId.id : peliculaId;
    getTurnos({ peliculaId: id })
      .then(res => setTurnos(res?.data ?? res ?? []))
      .catch(() => setTurnos([]));
  }, [peliculaId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useImperativeHandle(ref, () => ({
    reload: fetchData
  }));

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar turno?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#0056a6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      await deleteTurno(id);
      fetchData();
      Swal.fire('Eliminado', 'El turno fue eliminado correctamente.', 'success');
    }
  };

  const hayTurnos = Array.isArray(turnos) && turnos.length > 0;

  return (
    <div>
      {hayTurnos ? (
        <>
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:16}}>
            
          </div>
          <table className="table" style={{width:'100%', background:'#fff', borderRadius:8}}>
            <thead style={{background:'#0056a6', color:'#fff'}}>
              <tr>
                <th>ID</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>
                    {t.inicio
                      ? new Date(t.inicio).toLocaleString('es-ES', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '-'}
                  </td>
                  <td>
                    {t.fin
                      ? new Date(t.fin).toLocaleString('es-ES', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '-'}
                  </td>
                  <td>{t.estado}</td>
                  <td>
                    <button className="btn" style={{marginRight:8, background:'#ffd600', color:'#0056a6'}} onClick={() => onEdit && onEdit(t)}>Editar</button>
                    <button className="btn" style={{background:'#e74c3c', color:'#fff'}} onClick={() => handleDelete(t.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn" style={{background:'#0056a6', color:'#fff'}} onClick={() => onAdd && onAdd()}>
              Nuevo turno
            </button>
        </>
      ) : (
        <div style={{textAlign:'center', marginTop:32}}>
          <p style={{fontSize:'1.1rem', color:'#0056a6'}}>Esta película no tiene turnos asignados.</p>
          <button className="btn" style={{background:'#0056a6', color:'#fff'}} onClick={() => onAdd && onAdd()}>Agregar turno</button>
        </div>
      )}
    </div>
  );
});

export default TurnosList;

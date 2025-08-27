import PeliculasList from '../components/PeliculasList';
//import PeliculaDetail from '../components/PeliculaDetail';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import PeliculaForm from './PeliculaForm';

export default function PeliculasPage({ onVerTurnos }) {
  const [showForm, setShowForm] = useState(false);
  const [editPelicula, setEditPelicula] = useState(null);
  const peliculasListRef = useRef();

  const handleEdit = (pelicula) => {
    setEditPelicula(pelicula);
    setShowForm(true);
  };

  const navigate = useNavigate();

  // refrescar list
  const handleSavePelicula = () => {
    setShowForm(false);
    if (peliculasListRef.current && peliculasListRef.current.reload) {
      peliculasListRef.current.reload();
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column', gap:'2rem', alignItems:'flex-start', padding:'2rem 0'}}>
      <div style={{display:'flex', gap:'2rem', alignItems:'flex-start', width:'100%'}}>
        <div style={{flex:1, minWidth:'1000px'}}>
          <button className="btn" style={{marginBottom:16, background:'#fff', color:'#0056a6', border:'2px solid #0056a6', fontWeight:'bold'}} onClick={() => navigate('/')}>
            Volver a home
          </button>
          <PeliculasList ref={peliculasListRef} onEdit={handleEdit} onTurnos={onVerTurnos} />
          <button className="btn" style={{marginBottom:16, background:'#fff', color:'#0056a6', border:'2px solid #0056a6', fontWeight:'bold'}} onClick={() => {setEditPelicula(null); setShowForm(true);}}>
            Nueva película
          </button>
        </div>
        <div style={{flex:2}}>
          {/* <PeliculaDetail id={selectedId} onVerTurnos={onVerTurnos} /> */}
        </div>
      </div>
      {showForm && (
        <PeliculaForm pelicula={editPelicula} onClose={() => setShowForm(false)} onSave={handleSavePelicula} />
      )}
    </div>
  );
}

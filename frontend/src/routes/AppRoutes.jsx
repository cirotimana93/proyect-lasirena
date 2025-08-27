import { Route, Routes, Navigate } from "react-router-dom";


import HomePage from '../pages/HomePage';
import PeliculasPage from '../pages/PeliculasPage';
import TurnosPage from '../pages/TurnosPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/peliculas" element={<PeliculasPage />} />
      <Route path="/peliculas/:id/turnos" element={<TurnosPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

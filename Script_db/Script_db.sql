-- Script para crear la base de datos y las tablas necesarias para el proyecto "La Sirena"
--psql -U postgres -c "CREATE DATABASE lasirena;"
-- 1) extensiones necesarias para indexar
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- 2) tabla peliculas
CREATE TABLE IF NOT EXISTS peliculas (
  id BIGSERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  sinopsis TEXT,
  duracion_min INT NOT NULL CHECK (duracion_min > 0),
  clasificacion VARCHAR(20),
  generos TEXT,
  estado VARCHAR(20) NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo','inactivo')),
  fecha_estreno DATE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by VARCHAR(150),
  updated_by VARCHAR(150)
);

-- indice unico case-insensitive en titulo
CREATE UNIQUE INDEX IF NOT EXISTS ux_peliculas_titulo_lower ON peliculas (lower(titulo));

-- 3) funcion generica para updated_at
CREATE OR REPLACE FUNCTION fn_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_peliculas_updated BEFORE UPDATE ON peliculas
FOR EACH ROW EXECUTE FUNCTION fn_set_timestamp();

-- 4) tabla turnos
CREATE TABLE IF NOT EXISTS turnos (
  id BIGSERIAL PRIMARY KEY,
  pelicula_id BIGINT REFERENCES peliculas(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  sala VARCHAR(100) NOT NULL,
  inicio TIMESTAMPTZ NOT NULL,
  fin TIMESTAMPTZ NOT NULL,
  precio NUMERIC(10,2) NOT NULL DEFAULT 0,
  idioma VARCHAR(50) CHECK (idioma IN ('dob','sub')),
  formato VARCHAR(10) CHECK (formato IN ('2D','3D')),
  aforo INT,
  estado VARCHAR(20) NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo','inactivo')),
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by VARCHAR(150),
  updated_by VARCHAR(150)
);

-- validate fin > inicio
ALTER TABLE turnos
  ADD CONSTRAINT chk_turnos_fin_mayor_inicio CHECK (fin > inicio);

-- trigger updated_at for turnos
CREATE TRIGGER trg_turnos_updated BEFORE UPDATE ON turnos
FOR EACH ROW EXECUTE FUNCTION fn_set_timestamp();

-- 5) exclusion constraint para evitar solapes por sala (ignora soft-deleted)
ALTER TABLE turnos
  ADD CONSTRAINT ux_turnos_no_solape
  EXCLUDE USING GIST (sala WITH =, tstzrange(inicio, fin, '[)') WITH &&)
  WHERE (deleted_at IS NULL);

-- 6) funcion trigger: validar que la duración del turno cubre la duración de la pelicula
CREATE OR REPLACE FUNCTION fn_check_turno_duracion() RETURNS TRIGGER AS $$
DECLARE
  duracion_pelicula INT;
  duracion_turno NUMERIC;
BEGIN
  SELECT duracion_min INTO duracion_pelicula FROM peliculas WHERE id = NEW.pelicula_id;
  IF duracion_pelicula IS NULL THEN
    RAISE EXCEPTION 'pelicula % no existe', NEW.pelicula_id;
  END IF;
  duracion_turno := EXTRACT(EPOCH FROM (NEW.fin - NEW.inicio)) / 60;
  IF duracion_turno < duracion_pelicula THEN
    RAISE EXCEPTION 'duracion del turno (%.0f min) es menor que duracion de la pelicula (%)', duracion_turno, duracion_pelicula;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_turno_duracion BEFORE INSERT OR UPDATE ON turnos
FOR EACH ROW EXECUTE FUNCTION fn_check_turno_duracion();

-- 7) Seed ejemplo
INSERT INTO peliculas (titulo, sinopsis, duracion_min, clasificacion, generos, fecha_estreno, created_by)
VALUES
('Pelicula A', 'Demo: Duración 120 min', 120, 'B', ARRAY['Accion','Drama'], '2025-07-01', 'seed'),
('Pelicula B', 'Demo: Duración 90 min', 90, 'A', ARRAY['Comedia'], '2024-12-01', 'seed')
ON CONFLICT DO NOTHING;

-- Turno valido (Sala 1 18:00-20:30 para Pelicula A)
INSERT INTO turnos (pelicula_id, sala, inicio, fin, precio, idioma, formato, aforo, created_by)
VALUES
((SELECT id FROM peliculas WHERE titulo='Pelicula A'), 'Sala 1', '2025-08-01 18:00:00-05', '2025-08-01 20:30:00-05', 10.00, 'dob', '2D', 120, 'seed')
ON CONFLICT DO NOTHING;

-- Turno distinto en otra sala (valido)
INSERT INTO turnos (pelicula_id, sala, inicio, fin, precio, idioma, formato, aforo, created_by)
VALUES
((SELECT id FROM peliculas WHERE titulo='Pelicula B'), 'Sala 2', '2025-08-01 19:00:00-05', '2025-08-01 20:30:00-05', 8.00, 'sub', '2D', 100, 'seed')
ON CONFLICT DO NOTHING;














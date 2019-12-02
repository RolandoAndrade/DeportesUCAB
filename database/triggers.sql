CREATE OR REPLACE FUNCTION cambiaClasificacionTrigger() RETURNS trigger AS
$$
BEGIN
    IF NEW.clasificacion_id IS NOT NULL THEN
        IF NOT isEnClasificacion(NEW.equipo_local, NEW.clasificacion_id) THEN
            INSERT INTO TABLA_CLASIFICACION VALUES (DEFAULT, NEW.equipo_local, NEW.clasificacion_id);
        end if;
        IF NOT isEnClasificacion(NEW.equipo_visitante, NEW.clasificacion_id) THEN
            INSERT INTO TABLA_CLASIFICACION VALUES (DEFAULT, NEW.equipo_visitante, NEW.clasificacion_id);
        end if;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER cambiaClasificacionTrigger
AFTER INSERT
ON PARTIDO
FOR EACH ROW
EXECUTE PROCEDURE cambiaClasificacionTrigger();

CREATE OR REPLACE FUNCTION agregarjugadoresalpartido() RETURNS trigger AS
$$
DECLARE
    I RECORD;
BEGIN
    FOR I IN (SELECT * FROM ATLETA WHERE equipo_id = NEW.equipo_local OR equipo_id = NEW.equipo_visitante)
    LOOP
        INSERT INTO JUEGO_FUTBOL VALUES(DEFAULT, 'delantero', 0,0,0,0,0,0,'x',I.id_atleta,NEW.id_partido);
    END LOOP;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER participacionDeEquipos
    AFTER INSERT
    ON PARTIDO
    FOR EACH ROW
EXECUTE PROCEDURE agregarjugadoresalpartido();

CREATE OR REPLACE FUNCTION addSituacion() RETURNS trigger AS
$$
BEGIN
    IF NEW.tipo = 'gol' THEN
        SELECT gol(NEW.usuario_id,NEW.auxiliar_id,NEW.partido_id);
    end if;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER agragarSit
    AFTER INSERT
    ON SITUACION
    FOR EACH ROW
EXECUTE PROCEDURE addSituacion();





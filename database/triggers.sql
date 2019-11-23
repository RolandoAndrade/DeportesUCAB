CREATE OR REPLACE FUNCTION cambiaClasificacionTrigger() RETURNS trigger AS
$$
BEGIN
    IF NOT isEnClasificacion(NEW.equipo_local, NEW.clasificacion_id) THEN
        INSERT INTO TABLA_CLASIFICACION VALUES (DEFAULT, NEW.equipo_local, NEW.clasificacion_id);
    end if;
    IF NOT isEnClasificacion(NEW.equipo_visitante, NEW.clasificacion_id) THEN
        INSERT INTO TABLA_CLASIFICACION VALUES (DEFAULT, NEW.equipo_visitante, NEW.clasificacion_id);
    end if;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER cambiaClasificacionTrigger
AFTER INSERT
ON PARTIDO
FOR EACH ROW
EXECUTE PROCEDURE cambiaClasificacionTrigger();

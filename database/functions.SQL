CREATE OR REPLACE FUNCTION mostrarUsuariosPorDeporte(Pdeporte VARCHAR, Pgenero VARCHAR)
RETURNS TABLE(id INTEGER, nombre VARCHAR, apellido VARCHAR, correo VARCHAR, cedula VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT U.id_usuario, U.nombre, U.apellido, U.correo, U.cedula
        FROM USUARIO U, DEPORTE D, HABILIDAD H
        WHERE H.usuario_id = U.id_usuario AND
              H.deporte_id = D.id_deporte AND
              D.nombre = Pdeporte AND
              ((D.genero = Pgenero AND
              U.genero = Pgenero) OR
               Pgenero IS NULL);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION mostrarProximasCompeticionesPorDeporte(Pdeporte VARCHAR, Pgenero VARCHAR)
    RETURNS TABLE(id INTEGER, nombre VARCHAR, fecha_inicio TIMESTAMP, fecha_fin TIMESTAMP, imagen VARCHAR, sede VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT C.id_competicion, C.nombre, C.fecha_inicio, C.fecha_fin, C.imagen, L.nombre
        FROM COMPETICION C, EVENTO E, DEPORTE D, LUGAR L
        WHERE C.id_competicion = E.competicion_id AND
              E.deporte_id = D.id_deporte AND
              D.nombre = Pdeporte AND
              (D.genero = Pgenero OR
               Pgenero IS NULL) AND
              L.id_lugar = C.lugar_id;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION login(correoP VARCHAR, passwordP VARCHAR)
    RETURNS TABLE(id INTEGER) AS
$$
    BEGIN
        RETURN QUERY
        SELECT U.id_usuario
        FROM USUARIO U
        WHERE U.correo = correoP AND
              U.password = passwordP;
    END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getTeamsByDeporte(deporte INTEGER)
    RETURNS TABLE(id INTEGER, nombre VARCHAR, escudo VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT T.id_equipo, T.nombre, T.escudo
        FROM equipo T
        WHERE deporte_id = deporte;
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getEvents()
    RETURNS TABLE(id INTEGER, nombre VARCHAR, fecha TIMESTAMP, imagen VARCHAR, lugar VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT C.id_competicion, C.nombre, C.fecha_inicio, C.imagen, L.nombre
        FROM COMPETICION C, LUGAR L
        WHERE C.lugar_id = L.id_lugar ORDER BY fecha_inicio DESC;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getEventCaracteristica(eventId INTEGER)
    RETURNS TABLE(titulo VARCHAR, descripcion TEXT, tipo VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT D.titulo, D.descripcion, D.tipo
        FROM COMPETICION C, CARACTERISTICA D
        WHERE C.id_competicion = D.competicion_id AND eventId = C.id_competicion;
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getPartidos(competicionID INTEGER)
    RETURNS TABLE(id INTEGER, fecha TIMESTAMP, resultado_local INTEGER, resultado_visitante INTEGER,
                  lugar VARCHAR, local VARCHAR, visitante VARCHAR, clasificacion VARCHAR, eliminatoria VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT E.id_partido, E.fecha, E.resultado_local, E.resultado_visitante, I.nombre, J.nombre, K.nombre, C.nombre, D.nombre
        FROM EVENTO B, CLASIFICACION C RIGHT JOIN PARTIDO E ON E.clasificacion_id = C.id_clasificacion LEFT JOIN
            ELIMINATORIA D ON E.eliminatoria_id = D.id_eliminatoria,  LUGAR I, EQUIPO J, EQUIPO K
        WHERE (E.eliminatoria_id = D.id_eliminatoria AND
               D.evento_id = B.id_evento AND
               B.competicion_id = competicionID) OR (
               E.clasificacion_id = C.id_clasificacion AND
               C.evento_id = B.id_evento AND
               B.competicion_id = competicionID) AND
               E.lugar_id = I.id_lugar AND
               E.equipo_local = J.id_equipo AND
               E.equipo_visitante = K.id_equipo;

END;
$$ LANGUAGE 'plpgsql';

select * from getPartidos(1);
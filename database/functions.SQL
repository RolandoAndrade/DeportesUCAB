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
        WHERE deporte_id = deporte AND T.nombre != 'Por definir';
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
                  lugar VARCHAR, local VARCHAR, visitante VARCHAR, clasificacion VARCHAR, eliminatoria VARCHAR,
                   escudo_local VARCHAR, escudo_visitante VARCHAR, nombre_partido VARCHAR, estado VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT E.id_partido, E.fecha, E.resultado_local, E.resultado_visitante, I.nombre,
               J.nombre, K.nombre, C.nombre, D.nombre, J.escudo, K.escudo, E.nombre, E.estado
        FROM EVENTO B, CLASIFICACION C RIGHT JOIN PARTIDO E ON E.clasificacion_id = C.id_clasificacion LEFT JOIN
            ELIMINATORIA D ON E.eliminatoria_id = D.id_eliminatoria,  LUGAR I, EQUIPO J, EQUIPO K
        WHERE ((E.eliminatoria_id = D.id_eliminatoria AND
               D.evento_id = B.id_evento AND
               B.competicion_id = competicionID) OR (
               E.clasificacion_id = C.id_clasificacion AND
               C.evento_id = B.id_evento AND
               B.competicion_id = competicionID)) AND
               E.lugar_id = I.id_lugar AND
               E.equipo_local = J.id_equipo AND
               E.equipo_visitante = K.id_equipo;

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION isEnClasificacion(equipoid INTEGER, clasificacionid INTEGER) RETURNS BOOLEAN AS
$$
BEGIN
    RETURN (SELECT COUNT(*)
            FROM TABLA_CLASIFICACION
            WHERE equipo_id = equipoid AND clasificacion_id = clasificacionid) > 0;
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getPartidosJugados(equipoid INTEGER, clasificacionid INTEGER) RETURNS INTEGER AS
$$
BEGIN
    RETURN (SELECT COUNT(*)
            FROM partido
            WHERE (equipo_local = equipoid OR equipo_visitante = equipoid)
              AND clasificacion_id = clasificacionid
              AND estado != 'pendiente');
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getPartidosGanados(equipoid INTEGER, clasificacionid INTEGER) RETURNS INTEGER AS
$$
BEGIN
    RETURN (SELECT COUNT(*)
            FROM partido
            WHERE ((equipo_local = equipoid AND resultado_local>resultado_visitante)
                    OR (equipo_visitante = equipoid AND resultado_visitante>resultado_local))
              AND clasificacion_id = clasificacionid
              AND estado != 'pendiente');
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getPartidosEmpatados(equipoid INTEGER, clasificacionid INTEGER) RETURNS INTEGER AS
$$
BEGIN
    RETURN (SELECT COUNT(*)
            FROM partido
            WHERE ((equipo_local = equipoid AND resultado_local=resultado_visitante)
                OR (equipo_visitante = equipoid AND resultado_visitante=resultado_local))
              AND clasificacion_id = clasificacionid
              AND estado != 'pendiente');
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getPartidosPerdidos(equipoid INTEGER, clasificacionid INTEGER) RETURNS INTEGER AS
$$
BEGIN
    RETURN (SELECT COUNT(*)
            FROM partido
            WHERE ((equipo_local = equipoid AND resultado_local<resultado_visitante)
                OR (equipo_visitante = equipoid AND resultado_visitante<resultado_local))
              AND clasificacion_id = clasificacionid
              AND estado != 'pendiente');
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getGolesAFavor(equipoid INTEGER, clasificacionid INTEGER) RETURNS INTEGER AS
$$
BEGIN
    RETURN COALESCE((SELECT SUM(resultado_local)
            FROM partido
            WHERE equipo_local = equipoid
            AND clasificacion_id = clasificacionid),0)+
           COALESCE((SELECT SUM(resultado_visitante)
                     FROM partido
                     WHERE equipo_visitante = equipoid
                       AND clasificacion_id = clasificacionid),0);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getGolesEnContra(equipoid INTEGER, clasificacionid INTEGER) RETURNS INTEGER AS
$$
BEGIN
    RETURN COALESCE((SELECT SUM(resultado_visitante)
                     FROM partido
                     WHERE equipo_local = equipoid
                       AND clasificacion_id = clasificacionid),0)+
           COALESCE((SELECT SUM(resultado_local)
                     FROM partido
                     WHERE equipo_visitante = equipoid
                       AND clasificacion_id = clasificacionid),0);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getClasificacionDeEquipos(competicionID INTEGER)
RETURNS TABLE(nombre VARCHAR,equipo VARCHAR, escudo VARCHAR, jugados INTEGER, ganados INTEGER,
empatados INTEGER, perdidos INTEGER, goles_favor INTEGER, goles_contra INTEGER, puntos DOUBLE PRECISION)
AS
$$
BEGIN
    RETURN QUERY
        SELECT C.nombre, E.nombre, E.escudo, getPartidosJugados(id_equipo,clasificacion_id),
               getPartidosGanados(id_equipo,clasificacion_id),
               getPartidosEmpatados(id_equipo,clasificacion_id),
               getPartidosPerdidos(id_equipo, clasificacion_id),
               getGolesAFavor(id_equipo,clasificacion_id),
               getgolesencontra(id_equipo,clasificacion_id),
               getPartidosGanados(id_equipo,clasificacion_id)*puntos_victoria+
               getPartidosEmpatados(id_equipo,clasificacion_id)*puntos_empate+
               getPartidosPerdidos(id_equipo,clasificacion_id)*puntos_derrota punticos
        FROM EQUIPO E, TABLA_CLASIFICACION T, CLASIFICACION C,
             EVENTO V
        WHERE id_equipo = equipo_id
          AND clasificacion_id = id_clasificacion
          AND evento_id = id_evento AND
              competicion_id = competicionID ORDER BY punticos DESC, goles_favor DESC , goles_contra;
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getEliminatorias(competicionID INTEGER)
    RETURNS TABLE(nombre VARCHAR,equipolocal VARCHAR, escudolocal VARCHAR,equipovisitante VARCHAR,
                 escudovisitante VARCHAR, resultadolocal INTEGER, resultadovisitante INTEGER)
AS
$$
BEGIN
    RETURN QUERY
        SELECT
        E.nombre, Q.nombre, Q.escudo, QQ.nombre, QQ.escudo, P.resultado_local, P.resultado_visitante
        FROM ELIMINATORIA E, EVENTO V, PARTIDO P, EQUIPO Q, EQUIPO QQ
        WHERE E.evento_id = V.id_evento AND V.competicion_id = competicionID AND
              P.eliminatoria_id = E.id_eliminatoria AND Q.id_equipo = P.equipo_local AND
              QQ.id_equipo = P.equipo_visitante;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getOrCreateLugar(lugarP VARCHAR) RETURNS INTEGER
AS
$$
DECLARE
    lugarid INTEGER;
BEGIN
    SELECT L.id_lugar INTO lugarid FROM LUGAR L WHERE L.nombre = lugarP;

    IF lugarid IS NULL THEN
        INSERT INTO LUGAR VALUES (DEFAULT, lugarP, 'sede',null,null,null) RETURNING id_lugar INTO lugarid;
    end if;

    RETURN lugarid;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insertarCompeticion(imagenP VARCHAR, nombreP VARCHAR, fechaInicioP DATE,
fechaFinP DATE, lugarP VARCHAR, generoP INTEGER)
    RETURNS INTEGER
AS
$$
DECLARE
    lugarid INTEGER;
    competicionid INTEGER;
    eventoid INTEGER;
BEGIN
    lugarid := getOrCreateLugar(lugarP);
    INSERT INTO COMPETICION VALUES(DEFAULT, nombreP, fechaInicioP, fechaFinP, imagenP, 'progreso',lugarid)
    RETURNING id_competicion INTO competicionid;
    INSERT INTO EVENTO VALUES (DEFAULT,'progreso',generoP,competicionid) RETURNING id_evento INTO eventoid;
    RETURN competicionid;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insertarCaracteristica(competicionid INTEGER, tituloP VARCHAR, descripcionP TEXT, tipoP VARCHAR)
RETURNS BOOLEAN
AS
$$
BEGIN
    INSERT INTO CARACTERISTICA VALUES (DEFAULT, tituloP, descripcionP, tipoP,competicionid);
    RETURN TRUE;
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION insertarFase(eventoid INTEGER, tipoP VARCHAR, nombreP VARCHAR)
    RETURNS INTEGER
AS
$$
DECLARE
    partidoid INTEGER;
BEGIN
    IF tipoP = 'clasificacion' THEN
        INSERT INTO CLASIFICACION VALUES (DEFAULT,nombreP,3,0,1,eventoid) RETURNING id_clasificacion INTO partidoid;
    ELSE
        INSERT INTO ELIMINATORIA VALUES (DEFAULT,nombreP,eventoid) RETURNING id_eliminatoria INTO partidoid;
    end if;
    RETURN partidoid;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insertarPartido(faseid INTEGER, tipoP VARCHAR, nombreP VARCHAR, localP INTEGER, visitanteP INTEGER, lugarP VARCHAR, fechaP DATE)
    RETURNS INTEGER
AS
$$
DECLARE
    partidoid INTEGER;
    lugarid INTEGER;
BEGIN
    lugarid := getOrCreateLugar(lugarP);
    IF tipoP = 'clasificacion' THEN
        INSERT INTO PARTIDO VALUES (DEFAULT,nombreP, fechaP, 0,0,lugarid,localP,visitanteP,'pendiente',null,faseid) RETURNING id_partido INTO partidoid;
    ELSE
        INSERT INTO PARTIDO VALUES (DEFAULT,nombreP, fechaP, 0,0,lugarid,localP,visitanteP,'pendiente',faseid,null) RETURNING id_partido INTO partidoid;
    end if;
    RETURN partidoid;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insertarparticipantes(equipoid INTEGER,eventoID INTEGER) RETURNS BOOLEAN AS
$$
BEGIN
    INSERT INTO PARTICIPACION VALUES (DEFAULT,equipoid,eventoID);
    RETURN TRUE;

END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getParticipantes(eventoID INTEGER) RETURNS TABLE(id INTEGER, nombre VARCHAR, escudo VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT T.id_equipo, T.nombre, T.escudo
        FROM equipo T, PARTICIPACION P
        WHERE P.evento_id = eventoID AND (P.equipo_id=id_equipo OR T.nombre = 'Por definir');
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getPartidosFase(faseid INTEGER, tipoP VARCHAR) RETURNS TABLE(id INTEGER, fecha TIMESTAMP, local VARCHAR, visitante VARCHAR,
                                        escudo_local VARCHAR, escudo_visitante VARCHAR, nombre_partido VARCHAR) AS
$$
BEGIN
    IF tipoP = 'clasificacion' THEN
        RETURN QUERY
            SELECT P.id_partido, P.fecha, L.nombre, V.nombre, L.escudo, V.escudo, P.nombre
            FROM PARTIDO P, EQUIPO L, EQUIPO V
            WHERE P.equipo_local = L.id_equipo AND P.equipo_visitante = V.id_equipo AND
                    P.clasificacion_id = faseid ORDER BY P.fecha;
    ELSE
        RETURN QUERY
            SELECT P.id_partido, P.fecha, L.nombre, V.nombre, L.escudo, V.escudo, P.nombre
            FROM PARTIDO P, EQUIPO L, EQUIPO V
            WHERE P.equipo_local = L.id_equipo AND P.equipo_visitante = V.id_equipo AND
                    P.eliminatoria_id = faseid ORDER BY P.fecha;
    end if;
END;
$$ LANGUAGE 'plpgsql';




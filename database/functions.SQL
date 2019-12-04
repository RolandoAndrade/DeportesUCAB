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

CREATE OR REPLACE FUNCTION getEvent(eventoid INTEGER)
    RETURNS TABLE(id INTEGER, nombre VARCHAR, fecha TIMESTAMP, imagen VARCHAR, lugar VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT C.id_competicion, C.nombre, C.fecha_inicio, C.imagen, L.nombre
        FROM COMPETICION C, LUGAR L
        WHERE C.lugar_id = L.id_lugar AND C.id_competicion = eventoid;
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
               E.equipo_visitante = K.id_equipo ORDER BY E.fecha;

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
        SELECT DISTINCT T.id_equipo, T.nombre, T.escudo
        FROM equipo T, PARTICIPACION P, EVENTO E
        WHERE P.evento_id = eventoID AND E.id_evento = eventoID
          AND (P.equipo_id=id_equipo OR (T.nombre = 'Por definir' AND T.deporte_id = E.deporte_id));
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

CREATE OR REPLACE FUNCTION getFasesEvento(eventoid INTEGER)
RETURNS TABLE(id INTEGER, nombre VARCHAR, tipo TEXT) AS
$$
BEGIN
    RETURN QUERY
        SELECT C.id_clasificacion "id", C.nombre "nombre", 'clasificacion' "tipo"
        FROM CLASIFICACION C
        WHERE C.evento_id = eventoid
        UNION ALL
        SELECT C.id_eliminatoria "id", C.nombre "nombre", 'eliminatoria' "tipo"
        FROM ELIMINATORIA C
        WHERE C.evento_id = eventoid;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION deleteFase(faseid INTEGER, tipoP VARCHAR) RETURNS BOOLEAN
AS
$$
BEGIN
    IF tipoP = 'clasificacion' THEN
        DELETE FROM PARTIDO WHERE clasificacion_id = faseid;
        DELETE FROM TABLA_CLASIFICACION WHERE clasificacion_id = faseid;
        DELETE FROM CLASIFICACION WHERE id_clasificacion = faseid;
    ELSE
        DELETE FROM PARTIDO WHERE eliminatoria_id = faseid;
        DELETE FROM ELIMINATORIA WHERE id_eliminatoria = faseid;
    end if;
    RETURN TRUE;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getuserdata(userid INTEGER) RETURNS TABLE(id INTEGER, nombre VARCHAR, apellido VARCHAR,
correo VARCHAR, genero VARCHAR, cedula VARCHAR, fecha_nac TIMESTAMP, imagen VARCHAR, rol INTEGER) AS
$$
BEGIN
        RETURN QUERY
            SELECT U.id_usuario, U.nombre, U.apellido, U.correo, U.genero, U.cedula, U.fecha_nac, U.imagen, U.rol_id FROM USUARIO U WHERE id_usuario = userid;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION deletepartido(partidoid INTEGER) RETURNS BOOLEAN
AS
$$
BEGIN
    DELETE FROM PARTIDO WHERE id_partido = partidoid;
    RETURN TRUE;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getPlayers(eventid INTEGER) RETURNS TABLE(id INTEGER, nombre VARCHAR, apellido VARCHAR, imagen VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT U.id_usuario, U.nombre, U.apellido, U.imagen
        FROM USUARIO U, ATLETA A
        WHERE id_usuario = A.usuario_id AND A.equipo_id IN (SELECT P.equipo_id FROM PARTICIPACION P WHERE evento_id = eventid);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION gol(jugadorgol INTEGER,jugadorasistente INTEGER, partidoid INTEGER) RETURNS BOOLEAN AS
$$
DECLARE
    goleadorid INTEGER;
    asistenteid INTEGER;
    equipoid INTEGER;
BEGIN
    SELECT id_atleta,  equipo_id INTO goleadorid,equipoid FROM ATLETA WHERE usuario_id = jugadorgol;
    SELECT id_atleta INTO asistenteid FROM ATLETA WHERE usuario_id = jugadorasistente;
    UPDATE JUEGO_FUTBOL
    SET goles = goles + 1
    WHERE goleadorid = atleta_id AND partidoid = partido_id;
    UPDATE JUEGO_FUTBOL
    SET asistencias = asistencias + 1
    WHERE asistenteid = atleta_id AND partidoid = partido_id;
    UPDATE PARTIDO
    SET resultado_local = resultado_local + 1
    WHERE equipo_local = equipoid AND id_partido = partidoid;
    UPDATE PARTIDO
    SET resultado_visitante = resultado_visitante + 1
    WHERE equipo_visitante = equipoid AND id_partido = partidoid;
    RETURN TRUE;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getGolesJugador(usuarioid INTEGER) RETURNS INTEGER AS
$$
DECLARE
    atletaid INTEGER;
BEGIN
    SELECT id_atleta INTO atletaid FROM ATLETA WHERE usuario_id = usuarioid;
    RETURN COALESCE((SELECT SUM(goles) FROM juego_futbol WHERE atletaid = atleta_id),0);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getAsistenciasJugador(usuarioid INTEGER) RETURNS INTEGER AS
$$
DECLARE
    atletaid INTEGER;
BEGIN
    SELECT id_atleta INTO atletaid FROM ATLETA WHERE usuario_id = usuarioid;
    RETURN COALESCE((SELECT SUM(asistencias) FROM juego_futbol WHERE atletaid = atleta_id),0);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getgolesJugadorEnEvento(usuarioid INTEGER, eventid INTEGER) RETURNS INTEGER AS
$$
DECLARE
    atletaid INTEGER;
BEGIN
    SELECT id_atleta INTO atletaid FROM ATLETA WHERE usuario_id = usuarioid;
    RETURN COALESCE((SELECT SUM(goles)
                     FROM juego_futbol j, CLASIFICACION C RIGHT JOIN PARTIDO P ON clasificacion_id = id_clasificacion LEFT JOIN ELIMINATORIA E ON eliminatoria_id = id_eliminatoria
                     WHERE atletaid = atleta_id AND
                             partido_id = P.id_partido AND
                         ((C.evento_id = eventid)OR
                          (E.evento_id = eventid))),0);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getAsistenciasJugadorEnEvento(usuarioid INTEGER, eventid INTEGER) RETURNS INTEGER AS
$$
DECLARE
    atletaid INTEGER;
BEGIN
    SELECT id_atleta INTO atletaid FROM ATLETA WHERE usuario_id = usuarioid;
    RETURN COALESCE((SELECT SUM(asistencias)
    FROM juego_futbol j, CLASIFICACION C RIGHT JOIN PARTIDO P ON clasificacion_id = id_clasificacion LEFT JOIN ELIMINATORIA E ON eliminatoria_id = id_eliminatoria
    WHERE atletaid = atleta_id AND
          partido_id = P.id_partido AND
          ((C.evento_id = eventid)OR
           (E.evento_id = eventid))),0);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION getGoleadores(eventid INTEGER) RETURNS TABLE(id INTEGER, nombre VARCHAR, apellido VARCHAR, imagen VARCHAR,
                                                                        goles INTEGER, nombre_equipo VARCHAR, escudo_equipo VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT P.*, getgolesJugadorEnEvento(P.id,eventid) golazos, E.nombre, E.escudo
        FROM getPlayers(eventid) P, EQUIPO E, ATLETA A
        WHERE A.equipo_id = E.id_equipo AND A.usuario_id = P.id
        ORDER BY golazos DESC LIMIT 5;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getAsistentes(eventid INTEGER) RETURNS TABLE(id INTEGER,
nombre VARCHAR, apellido VARCHAR, imagen VARCHAR, goles INTEGER, nombre_equipo VARCHAR, escudo_equipo VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT P.*, getAsistenciasJugadorEnEvento(P.id,eventid) golazos, E.nombre, E.escudo
        FROM getPlayers(eventid) P, EQUIPO E, ATLETA A
        WHERE A.equipo_id = E.id_equipo AND A.usuario_id = P.id
        ORDER BY golazos DESC LIMIT 5;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION crearSituacion(partidoid INTEGER, minutoP INTEGER, tipoP VARCHAR, jugadorid INTEGER, auxiliarid INTEGER) RETURNS VOID AS
$$
BEGIN
    INSERT INTO SITUACION VALUES (DEFAULT,minutoP,tipoP,partidoid,jugadorid,auxiliarid);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getSituacionesPartido(partidoid INTEGER)
RETURNS TABLE(id INTEGER, minuto INTEGER, tipo VARCHAR, nombre VARCHAR, apellido VARCHAR, equipoid INTEGER) AS
$$
BEGIN
    RETURN QUERY
        SELECT S.id_situacion, S.minuto, S.tipo, U.nombre, U.apellido, A.equipo_id
        FROM SITUACION S LEFT JOIN USUARIO U ON S.usuario_id = U.id_usuario LEFT JOIN ATLETA A  ON U.id_usuario = A.usuario_id
        WHERE S.partido_id = partidoid
        ORDER BY minuto;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getResultadoPartido(partidoid INTEGER)
    RETURNS TABLE(id INTEGER, id_local INTEGER, id_visitante INTEGER, nombre_local VARCHAR, nombre_visitante VARCHAR, escudo_local VARCHAR, escudo_visitante VARCHAR,
    resultado_local INTEGER, resultado_visitante INTEGER, fecha TIMESTAMP, lugar VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT P.id_partido, P.equipo_local, P.equipo_visitante, E.nombre, EE.nombre, E.escudo, EE.escudo, P.resultado_local, P.resultado_visitante, P.fecha, L.nombre
        FROM PARTIDO P, EQUIPO E, EQUIPO EE, LUGAR L
        WHERE P.id_partido = partidoid AND
              P.equipo_local = E.id_equipo AND
              P.equipo_visitante = EE.id_equipo AND
              P.lugar_id = L.id_lugar;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getPlayersByTeam(equipoid INTEGER)
RETURNS TABLE(id INTEGER, nombre VARCHAR, apellido VARCHAR, imagen VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT U.id_usuario, U.nombre, U.apellido, U.imagen
        FROM USUARIO U, ATLETA A
        WHERE id_usuario = A.usuario_id AND A.equipo_id = equipoid AND A.fecha_fin IS NOT NULL;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getAllTeams()
    RETURNS TABLE(id INTEGER, nombre VARCHAR, escudo VARCHAR, genero TEXT) AS
$$
BEGIN
    RETURN QUERY
        SELECT T.id_equipo, T.nombre, T.escudo, 'masculino'
        FROM equipo T
        WHERE deporte_id = 1 AND T.nombre != 'Por definir'
        UNION
        SELECT T.id_equipo, T.nombre, T.escudo, 'femenino'
        FROM equipo T
        WHERE deporte_id = 2 AND T.nombre != 'Por definir';
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getPartidosDeEquipo(equipoid INTEGER)
    RETURNS TABLE(id INTEGER, fecha TIMESTAMP, resultado_local INTEGER, resultado_visitante INTEGER,
                  lugar VARCHAR, local VARCHAR, visitante VARCHAR, clasificacion VARCHAR, eliminatoria VARCHAR,
                  escudo_local VARCHAR, escudo_visitante VARCHAR, nombre_partido VARCHAR, estado VARCHAR) AS
$$
BEGIN
    RETURN QUERY
        SELECT E.id_partido, E.fecha, E.resultado_local, E.resultado_visitante, I.nombre,
               J.nombre, K.nombre, C.nombre, D.nombre, J.escudo, K.escudo, E.nombre, E.estado
        FROM CLASIFICACION C RIGHT JOIN PARTIDO E ON E.clasificacion_id = C.id_clasificacion LEFT JOIN
        ELIMINATORIA D ON E.eliminatoria_id = D.id_eliminatoria,  LUGAR I, EQUIPO J, EQUIPO K
        WHERE ((E.equipo_local = J.id_equipo AND E.equipo_local = equipoid AND
                E.equipo_visitante = K.id_equipo) OR
               (E.equipo_visitante = J.id_equipo AND E.equipo_visitante = equipoid AND
                E.equipo_local = K.id_equipo)) AND
              E.lugar_id = I.id_lugar
         ORDER BY E.fecha;

END;
$$ LANGUAGE 'plpgsql';
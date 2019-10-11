DROP FUNCTION mostrarUsuariosPorDeporte;
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

DROP FUNCTION mostrarProximasCompeticionesPorDeporte;

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

SELECT * FROM
    mostrarProximasCompeticionesPorDeporte('fútbol','femenino');
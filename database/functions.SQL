CREATE OR REPLACE FUNCTION mostrarUsuarios() RETURNS TABLE(correo VARCHAR, password VARCHAR) AS
$$
    BEGIN
        RETURN QUERY SELECT U.correo, U.password FROM USUARIO U;
    END;
$$ LANGUAGE 'plpgsql';
SELECT * FROM
mostrarUsuarios();
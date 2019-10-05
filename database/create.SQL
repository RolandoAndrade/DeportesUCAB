CREATE TABLE USUARIO(
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    token VARCHAR(50),
    fecha_creacion TIMESTAMP
);
CREATE DATABASE DEPORTESUCAB;

CREATE TABLE LUGAR(
    id_lugar SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    longitud DOUBLE PRECISION,
    latitud DOUBLE PRECISION,

    lugar_id INTEGER REFERENCES LUGAR(id_lugar)
);

CREATE TABLE ROL(
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(30) UNIQUE NOT NULL,
    descripcion VARCHAR(200)
);

CREATE TABLE DEPORTE(
    id_deporte SERIAL PRIMARY KEY,
    nombre VARCHAR(30),
    genero VARCHAR(10)
);

CREATE TABLE EQUIPO(
    id_equipo SERIAL PRIMARY KEY,
    nombre VARCHAR(30),
    escudo VARCHAR(200),

    deporte_id INTEGER REFERENCES DEPORTE(id_deporte) NOT NULL
);

CREATE TABLE USUARIO(
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    correo VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    genero VARCHAR(10) NOT NULL,
    cedula VARCHAR(10) NOT NULL,
    imagen VARCHAR(200),
    token VARCHAR(50),
    fecha_creacion TIMESTAMP,

    rol_id INTEGER REFERENCES ROL(id_rol) NOT NULL,
    equipo_entrenado_id INTEGER REFERENCES EQUIPO(id_equipo)
);

CREATE TABLE HABILIDAD(
    id_habilidad SERIAL PRIMARY KEY,

    usuario_id INTEGER REFERENCES USUARIO(id_usuario) NOT NULL ,
    deporte_id INTEGER REFERENCES DEPORTE(id_deporte) NOT NULL
);

CREATE TABLE ATLETA(
    id_atleta SERIAL PRIMARY KEY,
    estado VARCHAR(10) NOT NULL,

    usuario_id INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    equipo_id INTEGER REFERENCES EQUIPO(id_equipo) NOT NULL
);

CREATE TABLE ENTRENAMIENTO(
    id_entrenamiento SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    duracion FLOAT NOT NULL,
    estado VARCHAR(10) NOT NULL
);

CREATE TABLE HISTORIAL_ENTRENAMIENTO(
    id_historial_entrenamiento SERIAL PRIMARY KEY,
    puntaje FLOAT,
    atleta_id INTEGER REFERENCES ATLETA(id_atleta),
    entrenamiento_id INTEGER REFERENCES ENTRENAMIENTO(id_entrenamiento) NOT NULL
);

CREATE TABLE COMPETICION(
    id_competicion SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    estado VARCHAR(10) NOT NULL,

    lugar_id INTEGER REFERENCES LUGAR(id_lugar) NOT NULL
);

CREATE TABLE CARACTERISTICA(
    id_caracteristica SERIAL PRIMARY KEY,
    titulo VARCHAR(30) NOT NULL,
    descripcion text NOT NULL,

    competicion_id INTEGER REFERENCES COMPETICION(id_competicion) NOT NULL
);

CREATE TABLE TIPO_EVENTO(
    id_tipo_evento SERIAL PRIMARY KEY,

);
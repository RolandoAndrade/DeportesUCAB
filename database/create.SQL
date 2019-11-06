/*CREATE DATABASE DEPORTESUCAB;*/

CREATE TABLE LUGAR(
    id_lugar SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    longitud DOUBLE PRECISION,
    latitud DOUBLE PRECISION,

    lugar_id INTEGER REFERENCES LUGAR(id_lugar)
);

CREATE TABLE ROL(
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion text
);

CREATE TABLE DEPORTE(
    id_deporte SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    genero VARCHAR(10)
);

CREATE TABLE EQUIPO(
    id_equipo SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    escudo VARCHAR(200),

    deporte_id INTEGER REFERENCES DEPORTE(id_deporte) NOT NULL
);

CREATE TABLE USUARIO(
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    genero VARCHAR(10) NOT NULL,
    cedula VARCHAR(10) NOT NULL,
    fecha_nac TIMESTAMP NOT NULL,
    imagen VARCHAR(200),
    token VARCHAR(50),


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
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP,

    usuario_id INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    equipo_id INTEGER REFERENCES EQUIPO(id_equipo) NOT NULL
);

CREATE TABLE ENTRENAMIENTO(
    id_entrenamiento SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    duracion FLOAT NOT NULL,
    estado VARCHAR(10) NOT NULL,

    lugar_id INTEGER REFERENCES LUGAR(id_lugar)
);

CREATE TABLE HISTORIAL_ENTRENAMIENTO(
    id_historial_entrenamiento SERIAL PRIMARY KEY,
    puntaje FLOAT,

    atleta_id INTEGER REFERENCES ATLETA(id_atleta),
    entrenamiento_id INTEGER REFERENCES ENTRENAMIENTO(id_entrenamiento) NOT NULL
);

CREATE TABLE COMPETICION(
    id_competicion SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    imagen VARCHAR(200),
    estado VARCHAR(10) NOT NULL,

    lugar_id INTEGER REFERENCES LUGAR(id_lugar) NOT NULL
);

CREATE TABLE CARACTERISTICA(
    id_caracteristica SERIAL PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    descripcion text NOT NULL,
    tipo VARCHAR(10) NOT NULL,

    competicion_id INTEGER REFERENCES COMPETICION(id_competicion) NOT NULL
);

CREATE TABLE EVENTO(
    id_evento SERIAL PRIMARY KEY,
    estado VARCHAR(10) NOT NULL,

    deporte_id INTEGER REFERENCES DEPORTE(id_deporte) NOT NULL,
    competicion_id INTEGER REFERENCES COMPETICION(id_competicion) NOT NULL
);

CREATE TABLE ELIMINATORIA(
    id_eliminatoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,

    evento_id INTEGER REFERENCES EVENTO(id_evento) NOT NULL
);

CREATE TABLE CLASIFICACION(
    id_clasificacion SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    puntos_victoria INTEGER NOT NULL,
    puntos_derrota INTEGER NOT NULL,
    puntos_empate FLOAT,
    evento_id INTEGER REFERENCES EVENTO(id_evento) NOT NULL
);

CREATE TABLE TABLA_CLASIFICACION(
    id_tabla_clasificacion SERIAL PRIMARY KEY,

    equipo_id INTEGER REFERENCES EQUIPO(id_equipo) NOT NULL,
    clasificacion_id INTEGER REFERENCES CLASIFICACION(id_clasificacion) NOT NULL
);

CREATE TABLE PARTIDO(
    id_partido SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    resultado_local INTEGER,
    resultado_visitante INTEGER,

    lugar_id INTEGER REFERENCES LUGAR(id_lugar) NOT NULL,
    equipo_local INTEGER REFERENCES EQUIPO(id_equipo) NOT NULL,
    equipo_visitante INTEGER REFERENCES EQUIPO(id_equipo) NOT NULL,

    eliminatoria_id INTEGER REFERENCES ELIMINATORIA(id_eliminatoria),
    clasificacion_id INTEGER REFERENCES CLASIFICACION(id_clasificacion)
);

CREATE TABLE JUEGO_FUTBOL(
    id_juego_futbol SERIAL PRIMARY KEY,
    posicion VARCHAR(10) NOT NULL,
    goles INTEGER,
    asistencias INTEGER,
    faltas INTEGER,
    tarjetas_amarillas INTEGER,
    tarjetas_rojas INTEGER,
    atajadas INTEGER,

    tipo VARCHAR(10) NOT NULL,

    atleta_id INTEGER REFERENCES ATLETA(id_atleta) NOT NULL,
    partido_id INTEGER REFERENCES PARTIDO(id_partido) NOT NULL
);

CREATE TABLE JUEGO_BALONCESTO(
     id_juego_baloncesto SERIAL PRIMARY KEY,
     posicion VARCHAR(10) NOT NULL,
     puntos INTEGER,
     asistencias INTEGER,
     disparos_tres_puntos INTEGER,
     faltas INTEGER,
     bloqueos INTEGER,
     rebotes INTEGER,

     atleta_id INTEGER REFERENCES ATLETA(id_atleta) NOT NULL,
     partido_id INTEGER REFERENCES PARTIDO(id_partido) NOT NULL
);


CREATE TABLE JUEGO_VOLEIBOL(
     id_juego_voleibol SERIAL PRIMARY KEY,
     puntos INTEGER,
     saques INTEGER,
     puntos_en_saques INTEGER,
     faltas INTEGER,

     atleta_id INTEGER REFERENCES ATLETA(id_atleta) NOT NULL,
     partido_id INTEGER REFERENCES PARTIDO(id_partido) NOT NULL
);

CREATE TABLE JUEGO_RUGBY(
     id_juego_rugby SERIAL PRIMARY KEY,
     posicion VARCHAR(10) NOT NULL,
     puntos INTEGER,
     tries INTEGER,
     penalties INTEGER,
     tarjetas_amarillas INTEGER,
     tarjetas_rojas INTEGER,
     drops INTEGER,

     atleta_id INTEGER REFERENCES ATLETA(id_atleta) NOT NULL,
     partido_id INTEGER REFERENCES PARTIDO(id_partido) NOT NULL
);

CREATE TABLE JUEGO_BEISBOL(
    id_juego_beisbol SERIAL PRIMARY KEY,
    posicion VARCHAR(50) NOT NULL,
    bateos INTEGER,
    jonrores INTEGER,
    carreras INTEGER,
    puntos INTEGER,
    faltas INTEGER,
    strikes INTEGER,
    bolas_recibidas INTEGER,
    bolas_ocasionadas INTEGER,

    atleta_id INTEGER REFERENCES ATLETA(id_atleta) NOT NULL,
    partido_id INTEGER REFERENCES PARTIDO(id_partido) NOT NULL
);


CREATE TABLE NOTIFICACION(
    id_notificacion SERIAL PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    descripcion text NOT NULL,
    fecha TIMESTAMP NOT NULL
);

CREATE TABLE BANDEJA_ENTRADA(
    id_bandeja_entrada SERIAL PRIMARY KEY,
    estado VARCHAR(10) NOT NULL,

    usuario_id INTEGER REFERENCES USUARIO(id_usuario) NOT NULL,
    notificacion_id INTEGER REFERENCES NOTIFICACION(id_notificacion) NOT NULL
);

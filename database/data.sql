CREATE TYPE tipo_ejercicio AS ENUM ('repeticiones', 'cronometrado', 'cardio');

CREATE TABLE IF NOT EXISTS usuario (
	email VARCHAR(255) PRIMARY KEY NOT NULL,
	contrasenya VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS plantilla_ejercicio (
	id UUID PRIMARY KEY NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	instrucciones VARCHAR(2048) NOT NULL,
	tipo tipo_ejercicio NOT NULL,
	usuario VARCHAR(255) NOT NULL REFERENCES usuario(email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS lista_inicial_plantilla_ejercicio (
	id UUID PRIMARY KEY NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	instrucciones VARCHAR(2048) NOT NULL,
	tipo tipo_ejercicio NOT NULL
);

CREATE TABLE IF NOT EXISTS entrenamiento (
	id UUID PRIMARY KEY NOT NULL,
	fecha_inicio DATE,
	fecha_fin DATE,
	usuario VARCHAR(255) NOT NULL REFERENCES usuario(email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS grupo_muscular (
	nombre VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS grupo_plantilla (
	grupo VARCHAR(255) NOT NULL REFERENCES grupo_muscular(nombre) ON DELETE CASCADE ON UPDATE CASCADE,
	plantilla UUID NOT NULL REFERENCES plantilla_ejercicio(id) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (grupo, plantilla)
);

CREATE TABLE IF NOT EXISTS grupo_lista_inicial (
	grupo VARCHAR(255) NOT NULL REFERENCES grupo_muscular(nombre) ON DELETE CASCADE ON UPDATE CASCADE,
	plantilla UUID NOT NULL REFERENCES lista_inicial_plantilla_ejercicio(id) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (grupo, plantilla)
);

CREATE TABLE IF NOT EXISTS equipamiento (
	nombre VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS equipamiento_plantilla (
	equipamiento VARCHAR(255) NOT NULL REFERENCES equipamiento(nombre) ON DELETE CASCADE ON UPDATE CASCADE,
	plantilla UUID NOT NULL REFERENCES plantilla_ejercicio(id) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (equipamiento, plantilla)
);

CREATE TABLE IF NOT EXISTS equipamiento_lista_inicial (
	equipamiento VARCHAR(255) NOT NULL REFERENCES equipamiento(nombre) ON DELETE CASCADE ON UPDATE CASCADE,
	plantilla UUID NOT NULL REFERENCES lista_inicial_plantilla_ejercicio(id) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (equipamiento, plantilla)
);

CREATE TABLE IF NOT EXISTS ejercicio_en_curso (
	id UUID UNIQUE NOT NULL,
	finalizado BOOLEAN NOT NULL DEFAULT FALSE,
	entrenamiento UUID NOT NULL REFERENCES entrenamiento(id) ON DELETE CASCADE ON UPDATE CASCADE,
	plantilla UUID NOT NULL REFERENCES plantilla_ejercicio(id) ON DELETE RESTRICT ON UPDATE CASCADE,
	PRIMARY KEY (entrenamiento, plantilla)
);

CREATE TABLE IF NOT EXISTS serie (
	id UUID PRIMARY KEY NOT NULL,
	finalizada BOOLEAN NOT NULL DEFAULT FALSE,
	ejercicio UUID NOT NULL REFERENCES ejercicio_en_curso(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS repeticiones (
	serie UUID PRIMARY KEY NOT NULL REFERENCES serie(id) ON DELETE CASCADE ON UPDATE CASCADE,
	peso INT NOT NULL,
	repeticiones INT NOT NULL
);

CREATE TABLE IF NOT EXISTS cronometrado (
	serie UUID PRIMARY KEY NOT NULL REFERENCES serie(id) ON DELETE CASCADE ON UPDATE CASCADE,
	peso INT NOT NULL,
	tiempo INT NOT NULL 
);

CREATE TABLE IF NOT EXISTS cardio (
	serie UUID PRIMARY KEY NOT NULL REFERENCES serie(id) ON DELETE CASCADE ON UPDATE CASCADE,
	distancia INT NOT NULL,
	tiempo INT NOT NULL 
);

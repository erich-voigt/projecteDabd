CREATE TYPE tipo_ejercicio AS ENUM ('Repeticiones', 'Cronometrado', 'Cardio');

CREATE TABLE IF NOT EXISTS Usuario (
	email VARCHAR(255) PRIMARY KEY NOT NULL,
	contrasenya VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Plantilla_ejercicio (
	id UUID PRIMARY KEY NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	instrucciones VARCHAR(2048) NOT NULL,
	tipo tipo_ejercicio NOT NULL,
	usuario VARCHAR(255) NOT NULL,
	FOREIGN KEY (usuario) REFERENCES Usuario(email)
);

CREATE TABLE IF NOT EXISTS Lista_inicial_plantillas_ejercicios (
	id UUID PRIMARY KEY NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	instrucciones VARCHAR(2048) NOT NULL,
	tipo tipo_ejercicio NOT NULL
);

CREATE TABLE IF NOT EXISTS Entrenamiento (
	id UUID PRIMARY KEY NOT NULL,
	fecha_inicio DATE NOT NULL,
	fecha_fin DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Entrenamiento_plantilla (
	entrenamiento UUID NOT NULL,
	plantilla UUID NOT NULL,
	PRIMARY KEY (entrenamiento, plantilla),
	FOREIGN KEY (plantilla) REFERENCES Plantilla_ejercicio(id),
	FOREIGN KEY (entrenamiento) REFERENCES Entrenamiento(id)
);

CREATE TABLE IF NOT EXISTS Grupo_muscular (
	nombre VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS Grupo_plantilla (
	grupo VARCHAR(255) NOT NULL,
	plantilla UUID NOT NULL,
	PRIMARY KEY (grupo, plantilla),
	FOREIGN KEY (plantilla) REFERENCES Plantilla_ejercicio(id),
	FOREIGN KEY (grupo) REFERENCES Grupo_muscular(nombre)
);

CREATE TABLE IF NOT EXISTS Grupo_lista_inicial (
	grupo VARCHAR(255) NOT NULL,
	plantilla UUID NOT NULL,
	PRIMARY KEY (grupo, plantilla),
	FOREIGN KEY (plantilla) REFERENCES Lista_inicial_plantillas_ejercicios(id),
	FOREIGN KEY (grupo) REFERENCES Grupo_muscular(nombre)
);

CREATE TABLE IF NOT EXISTS Equipamiento (
	nombre VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS Equipamiento_plantilla (
	equipamiento VARCHAR(255) NOT NULL,
	plantilla UUID NOT NULL,
	PRIMARY KEY (equipamiento, plantilla),
	FOREIGN KEY (plantilla) REFERENCES Plantilla_ejercicio(id),
	FOREIGN KEY (equipamiento) REFERENCES Equipamiento(nombre)
);

CREATE TABLE IF NOT EXISTS Equipamiento_lista_inicial (
	equipamiento VARCHAR(255) NOT NULL,
	plantilla UUID NOT NULL,
	PRIMARY KEY (equipamiento, plantilla),
	FOREIGN KEY (plantilla) REFERENCES Lista_inicial_plantillas_ejercicios(id),
	FOREIGN KEY (equipamiento) REFERENCES Equipamiento(nombre)
);

CREATE TABLE IF NOT EXISTS Ejercicio_en_curso (
	id UUID UNIQUE NOT NULL,
	finalizado BOOLEAN NOT NULL DEFAULT FALSE,
	entrenamiento UUID NOT NULL,
	plantilla UUID NOT NULL,
	PRIMARY KEY (entrenamiento, plantilla),
	FOREIGN KEY (plantilla) REFERENCES Plantilla_ejercicio(id),
	FOREIGN KEY (entrenamiento) REFERENCES Entrenamiento(id)
);

CREATE TABLE IF NOT EXISTS Serie (
	id UUID PRIMARY KEY NOT NULL,
	finalizado BOOLEAN NOT NULL DEFAULT FALSE,
	FOREIGN KEY (id) REFERENCES Ejercicio_en_curso(id)
);

CREATE TABLE IF NOT EXISTS Repeticiones (
	serie_id UUID PRIMARY KEY NOT NULL,
	peso INT NOT NULL,
	repeticiones INT NOT NULL,
	FOREIGN KEY (serie_id) REFERENCES Serie(id)
);

CREATE TABLE IF NOT EXISTS Cronometrado (
	serie_id UUID PRIMARY KEY NOT NULL,
	peso INT NOT NULL,
	tiempo INT NOT NULL,
	FOREIGN KEY (serie_id) REFERENCES Serie(id)
);

CREATE TABLE IF NOT EXISTS Cardio (
	serie_id UUID PRIMARY KEY NOT NULL,
	distancia INT NOT NULL,
	tiempo INT NOT NULL,
	FOREIGN KEY (serie_id) REFERENCES Serie(id)
);

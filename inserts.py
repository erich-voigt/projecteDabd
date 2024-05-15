from random import choice

from faker import Faker

fake = Faker("es_ES")

def insert_usuario(conn, cur, quantity):
	for _ in range(quantity):
		email = fake.email()
		contrasenya = fake.password()
		cur.execute("INSERT INTO Usuario VALUES ('%s', '%s')" % (email, contrasenya))
	conn.commit()

def insert_plantilla_ejercicio(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT email FROM Usuario ORDER BY RANDOM() LIMIT 1")
		email = cur.fetchone()[0]
		id = fake.uuid4()
		nombre = fake.word()
		instrucciones = fake.sentence()
		tipo = choice(["Repeticiones", "Cronometrado", "Cardio"])
		cur.execute("INSERT INTO Plantilla_ejercicio VALUES ('%s', '%s', '%s', '%s', '%s')" % (id, nombre, instrucciones, tipo, email))
	conn.commit()

def insert_lista_inicial_plantillas_ejercicios(conn, cur, quantity):
	for _ in range(quantity):
		id = fake.uuid4()
		nombre = fake.word()
		instrucciones = fake.sentence()
		tipo = choice(["Repeticiones", "Cronometrado", "Cardio"])
		cur.execute("INSERT INTO Lista_inicial_plantillas_ejercicios VALUES ('%s', '%s', '%s', '%s')" % (id, nombre, instrucciones, tipo))
	conn.commit()

def insert_entrenamiento(conn, cur, quantity):
	return

def insert_entrenamiento_plantilla(conn, cur, quantity):
	return

def insert_grupo_muscular(conn, cur, quantity):
	return

def insert_grupo_plantilla(conn, cur, quantity):
	return

def insert_grupo_lista_inicial(conn, cur, quantity):
	return

def insert_equipamiento(conn, cur, quantity):
	return

def insert_equipamiento_plantilla(conn, cur, quantity):
	return

def insert_equipamiento_lista_inicial(conn, cur, quantity):
	return

def insert_ejercicio_en_curso(conn, cur, quantity):
	return

def insert_serie(conn, cur, quantity):
	return

def insert_repeticiones(conn, cur, quantity):
	return

def insert_cronometrado(conn, cur, quantity):
	return

def insert_cardio(conn, cur, quantity):
	return

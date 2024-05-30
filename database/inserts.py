from random import choice, randint

from faker import Faker

fake = Faker("es_ES")

def insert_usuario(conn, cur, quantity):
	for _ in range(quantity):
		email = fake.email()
		contrasenya = fake.password()
		cur.execute("INSERT INTO usuario VALUES ('%s', '%s')" % (email, contrasenya))
	conn.commit()

def insert_plantilla_ejercicio(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT email FROM usuario ORDER BY RANDOM() LIMIT 1")
		email = cur.fetchone()[0]
		id = fake.uuid4()
		nombre = fake.word()
		instrucciones = fake.sentence()
		tipo = choice(["repeticiones", "cronometrado", "cardio"])
		cur.execute("INSERT INTO plantilla_ejercicio VALUES ('%s', '%s', '%s', '%s', '%s')" % (id, nombre, instrucciones, tipo, email))
	conn.commit()

def insert_lista_inicial_plantilla_ejercicio(conn, cur, quantity):
	for _ in range(quantity):
		id = fake.uuid4()
		nombre = fake.word()
		instrucciones = fake.sentence()
		tipo = choice(["repeticiones", "cronometrado", "cardio"])
		cur.execute("INSERT INTO lista_inicial_plantilla_ejercicio VALUES ('%s', '%s', '%s', '%s')" % (id, nombre, instrucciones, tipo))
	conn.commit()

def insert_entrenamiento(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT email FROM usuario ORDER BY RANDOM() LIMIT 1")
		email = cur.fetchone()[0]
		id = fake.uuid4()
		fecha_inicio = fake.date()
		fecha_fin = fake.date()
		cur.execute("INSERT INTO entrenamiento VALUES ('%s', '%s', '%s', '%s')" % (id, fecha_inicio, fecha_fin, email))
	conn.commit()

def insert_grupo_muscular(conn, cur, quantity):
	words = []
	for _ in range(quantity):
		nombre = fake.word()
		while nombre in words:
			nombre = fake.word()
		words.append(nombre)
		cur.execute("INSERT INTO grupo_muscular VALUES ('%s')" % (nombre, ))
	conn.commit()

def insert_grupo_plantilla(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT grupo_muscular.nombre, plantilla_ejercicio.id FROM grupo_muscular CROSS JOIN plantilla_ejercicio LEFT JOIN grupo_plantilla ON grupo_muscular.nombre = grupo_plantilla.grupo AND plantilla_ejercicio.id = grupo_plantilla.plantilla WHERE grupo_plantilla.grupo IS NULL OR grupo_plantilla.plantilla IS NULL ORDER BY RANDOM() LIMIT 1")
		nombre, id, *_ = cur.fetchone()
		cur.execute("INSERT INTO grupo_plantilla VALUES ('%s', '%s')" % (nombre, id))
	conn.commit()

def insert_grupo_lista_inicial(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT grupo_muscular.nombre, lista_inicial_plantilla_ejercicio.id FROM grupo_muscular CROSS JOIN lista_inicial_plantilla_ejercicio LEFT JOIN grupo_lista_inicial ON grupo_muscular.nombre = grupo_lista_inicial.grupo AND lista_inicial_plantilla_ejercicio.id = grupo_lista_inicial.plantilla WHERE grupo_lista_inicial.grupo IS NULL OR grupo_lista_inicial.plantilla IS NULL ORDER BY RANDOM() LIMIT 1")
		nombre, id, *_ = cur.fetchone()
		cur.execute("INSERT INTO grupo_lista_inicial VALUES ('%s', '%s')" % (nombre, id))
	conn.commit()

def insert_equipamiento(conn, cur, quantity):
	words = []
	for _ in range(quantity):
		nombre = fake.word()
		while nombre in words:
			nombre = fake.word()
		words.append(nombre)
		cur.execute("INSERT INTO equipamiento VALUES ('%s')" % (nombre, ))
	conn.commit()

def insert_equipamiento_plantilla(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT equipamiento.nombre, plantilla_ejercicio.id FROM equipamiento CROSS JOIN plantilla_ejercicio LEFT JOIN equipamiento_plantilla ON equipamiento.nombre = equipamiento_plantilla.equipamiento AND plantilla_ejercicio.id = equipamiento_plantilla.plantilla WHERE equipamiento_plantilla.equipamiento IS NULL OR equipamiento_plantilla.plantilla IS NULL ORDER BY RANDOM() LIMIT 1")
		nombre, id, *_ = cur.fetchone()
		cur.execute("INSERT INTO equipamiento_plantilla VALUES ('%s', '%s')" % (nombre, id))
	conn.commit()

def insert_equipamiento_lista_inicial(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT equipamiento.nombre, lista_inicial_plantilla_ejercicio.id FROM equipamiento CROSS JOIN lista_inicial_plantilla_ejercicio LEFT JOIN equipamiento_lista_inicial ON equipamiento.nombre = equipamiento_lista_inicial.equipamiento AND lista_inicial_plantilla_ejercicio.id = equipamiento_lista_inicial.plantilla WHERE equipamiento_lista_inicial.equipamiento IS NULL OR equipamiento_lista_inicial.plantilla IS NULL ORDER BY RANDOM() LIMIT 1")
		nombre, id, *_ = cur.fetchone()
		cur.execute("INSERT INTO equipamiento_lista_inicial VALUES ('%s', '%s')" % (nombre, id))
	conn.commit()

def insert_ejercicio_en_curso(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT entrenamiento.id, plantilla_ejercicio.id FROM entrenamiento CROSS JOIN plantilla_ejercicio LEFT JOIN ejercicio_en_curso ON entrenamiento.id = ejercicio_en_curso.entrenamiento AND plantilla_ejercicio.id = ejercicio_en_curso.plantilla WHERE ejercicio_en_curso.entrenamiento IS NULL OR ejercicio_en_curso.plantilla IS NULL ORDER BY RANDOM() LIMIT 1")
		entrenamiento, plantilla, *_ = cur.fetchone()
		id = fake.uuid4()
		finalizado = choice([True, False])
		cur.execute("INSERT INTO ejercicio_en_curso VALUES ('%s', '%s', '%s', '%s')" % (id, finalizado, entrenamiento, plantilla))
	conn.commit()

def insert_serie(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT id FROM ejercicio_en_curso ORDER BY RANDOM() LIMIT 1")
		ejercicio = cur.fetchone()[0]
		id = fake.uuid4()
		finalizada = choice([True, False])
		cur.execute("INSERT INTO serie VALUES ('%s', '%s', '%s')" % (id, finalizada, ejercicio))
	conn.commit()

def insert_repeticiones(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT serie.id FROM serie JOIN ejercicio_en_curso ON serie.ejercicio = ejercicio_en_curso.id JOIN plantilla_ejercicio ON ejercicio_en_curso.plantilla = plantilla_ejercicio.id WHERE NOT EXISTS (SELECT 1 FROM repeticiones WHERE serie.id = repeticiones.serie) AND NOT EXISTS (SELECT 1 FROM cronometrado WHERE serie.id = cronometrado.serie) AND NOT EXISTS (SELECT 1 FROM cardio WHERE serie.id = cardio.serie) AND plantilla_ejercicio.tipo = 'repeticiones' ORDER BY RANDOM() LIMIT 1")
		id = cur.fetchone()[0]
		peso = randint(1, 200)
		repeticiones = randint(1, 200)
		cur.execute("INSERT INTO repeticiones VALUES ('%s', '%s', '%s')" % (id, peso, repeticiones))
	conn.commit()

def insert_cronometrado(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT serie.id FROM serie JOIN ejercicio_en_curso ON serie.ejercicio = ejercicio_en_curso.id JOIN plantilla_ejercicio ON ejercicio_en_curso.plantilla = plantilla_ejercicio.id WHERE NOT EXISTS (SELECT 1 FROM repeticiones WHERE serie.id = repeticiones.serie) AND NOT EXISTS (SELECT 1 FROM cronometrado WHERE serie.id = cronometrado.serie) AND NOT EXISTS (SELECT 1 FROM cardio WHERE serie.id = cardio.serie) AND plantilla_ejercicio.tipo = 'cronometrado' ORDER BY RANDOM() LIMIT 1")
		id = cur.fetchone()[0]
		peso = randint(1, 200)
		tiempo = randint(1, 200)
		cur.execute("INSERT INTO cronometrado VALUES ('%s', '%s', '%s')" % (id, peso, tiempo))
	conn.commit()

def insert_cardio(conn, cur, quantity):
	for _ in range(quantity):
		cur.execute("SELECT serie.id FROM serie JOIN ejercicio_en_curso ON serie.ejercicio = ejercicio_en_curso.id JOIN plantilla_ejercicio ON ejercicio_en_curso.plantilla = plantilla_ejercicio.id WHERE NOT EXISTS (SELECT 1 FROM repeticiones WHERE serie.id = repeticiones.serie) AND NOT EXISTS (SELECT 1 FROM cronometrado WHERE serie.id = cronometrado.serie) AND NOT EXISTS (SELECT 1 FROM cardio WHERE serie.id = cardio.serie) AND plantilla_ejercicio.tipo = 'cardio' ORDER BY RANDOM() LIMIT 1")
		id = cur.fetchone()[0]
		distancia = randint(1, 200)
		tiempo = randint(1, 200)
		cur.execute("INSERT INTO cardio VALUES ('%s', '%s', '%s')" % (id, tiempo, distancia))
	conn.commit()

def insert_data(conn, cur, data):
	insert_usuario(conn, cur, data["usuario"])
	print(f"Inserted {data["usuario"]} Elements In Table 'usuario'")
	insert_plantilla_ejercicio(conn, cur, data["plantilla_ejercicio"])
	print(f"Inserted {data["plantilla_ejercicio"]} Elements In Table 'plantilla_ejercicio'")
	insert_lista_inicial_plantilla_ejercicio(conn, cur, data["lista_inicial_plantilla_ejercicio"])
	print(f"Inserted {data["lista_inicial_plantilla_ejercicio"]} Elements In Table 'lista_inicial_plantilla_ejercicio'")
	insert_entrenamiento(conn, cur, data["entrenamiento"])
	print(f"Inserted {data["entrenamiento"]} Elements In Table 'entrenamiento'")
	insert_grupo_muscular(conn, cur, data["grupo_muscular"])
	print(f"Inserted {data["grupo_muscular"]} Elements In Table 'grupo_muscular'")
	insert_grupo_plantilla(conn, cur, data["grupo_plantilla"])
	print(f"Inserted {data["grupo_plantilla"]} Elements In Table 'grupo_plantilla'")
	insert_grupo_lista_inicial(conn, cur, data["grupo_lista_inicial"])
	print(f"Inserted {data["grupo_lista_inicial"]} Elements In Table 'grupo_lista_inicial'")
	insert_equipamiento(conn, cur, data["equipamiento"])
	print(f"Inserted {data["equipamiento"]} Elements In Table 'equipamiento'")
	insert_equipamiento_plantilla(conn, cur, data["equipamiento_plantilla"])
	print(f"Inserted {data["equipamiento_plantilla"]} Elements In Table 'equipamiento_plantilla'")
	insert_equipamiento_lista_inicial(conn, cur, data["equipamiento_lista_inicial"])
	print(f"Inserted {data["equipamiento_lista_inicial"]} Elements In Table 'equipamiento_lista_inicial'")
	insert_ejercicio_en_curso(conn, cur, data["ejercicio_en_curso"])
	print(f"Inserted {data["ejercicio_en_curso"]} Elements In Table 'ejercicio_en_curso'")
	insert_serie(conn, cur, data["serie"])
	print(f"Inserted {data["serie"]} Elements In Table 'serie'")

	cur.execute("""
		SELECT COUNT(serie.id) FROM serie
		JOIN ejercicio_en_curso ON serie.ejercicio = ejercicio_en_curso.id
		JOIN plantilla_ejercicio ON plantilla_ejercicio.id = ejercicio_en_curso.plantilla
		WHERE plantilla_ejercicio.tipo = 'repeticiones'
	""")
	count = cur.fetchone()[0]
	data["repeticiones"] = count

	insert_repeticiones(conn, cur, count)
	print(f"Inserted {data["repeticiones"]} Elements In Table 'repeticiones'")

	cur.execute("""
		SELECT COUNT(serie.id) FROM serie
		JOIN ejercicio_en_curso ON serie.ejercicio = ejercicio_en_curso.id
		JOIN plantilla_ejercicio ON plantilla_ejercicio.id = ejercicio_en_curso.plantilla
		WHERE plantilla_ejercicio.tipo = 'cronometrado'
	""")
	count = cur.fetchone()[0]
	data["cronometrado"] = count

	insert_cronometrado(conn, cur, count)
	print(f"Inserted {data["cronometrado"]} Elements In Table 'cronometrado'")

	cur.execute("""
		SELECT COUNT(serie.id) FROM serie
		JOIN ejercicio_en_curso ON serie.ejercicio = ejercicio_en_curso.id
		JOIN plantilla_ejercicio ON plantilla_ejercicio.id = ejercicio_en_curso.plantilla
		WHERE plantilla_ejercicio.tipo = 'cardio'
	""")
	count = cur.fetchone()[0]
	data["cardio"] = count

	insert_cardio(conn, cur, count)
	print(f"Inserted {data["cardio"]} Elements In Table 'cardio'")

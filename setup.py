tables = [
	"Usuario",
	"Plantilla_ejercicio",
	"Lista_inicial_plantillas_ejercicios",
	"Entrenamiento",
	"Entrenamiento_plantilla",
	"Grupo_muscular",
	"Grupo_plantilla",
	"Grupo_lista_inicial",
	"Equipamiento",
	"Equipamiento_plantilla",
	"Equipamiento_lista_inicial",
	"Ejercicio_en_curso",
	"Serie",
	"Repeticiones",
	"Cronometrado",
	"Cardio",
]

enums = ["tipo_ejercicio"]

def drop_everything(conn, cur):
	global tables, enums
	cur.execute("SET search_path TO practica;")
	for table in tables[::-1]:
		cur.execute(f"DROP TABLE IF EXISTS {table}")
	for enum in enums:
		cur.execute(f"DROP TYPE IF EXISTS {enum}")
	conn.commit()

def create_everything(conn, cur):
	cur.execute("SET search_path TO practica;")
	with open("data.sql", "r") as file:
		cur.execute(file.read())
	conn.commit()

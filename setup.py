tables = [
	"usuario",
	"plantilla_ejercicio",
	"lista_inicial_plantilla_ejercicio",
	"entrenamiento",
	"grupo_muscular",
	"grupo_plantilla",
	"grupo_lista_inicial",
	"equipamiento",
	"equipamiento_plantilla",
	"equipamiento_lista_inicial",
	"ejercicio_en_curso",
	"serie",
	"repeticiones",
	"cronometrado",
	"cardio"
]

enums = ["tipo_ejercicio"]

def drop_everything(conn, cur):
	global tables, enums
	cur.execute("SET search_path TO practica")
	for table in tables[::-1]:
		cur.execute(f"DROP TABLE IF EXISTS {table}")
	for enum in enums:
		cur.execute(f"DROP TYPE IF EXISTS {enum}")
	conn.commit()

def create_everything(conn, cur):
	cur.execute("SET search_path TO practica")
	with open("data.sql", "r") as file:
		cur.execute(file.read())
	conn.commit()

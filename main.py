import psycopg2

import inserts
import setup
import utils

conn = psycopg2.connect(
    dbname="est_e9977173",
    user="est_e9977173",
    password="dB.e9977173",
    host="ubiwan.epsevg.upc.edu",
    port="5432"
)

cur = conn.cursor()

cur.execute("SET search_path TO practica")

setup.drop_everything(conn, cur)
setup.create_everything(conn, cur)

data = {
	"usuario": 100,
	"plantilla_ejercicio": 500,
	"lista_inicial_plantilla_ejercicio": 25,
	"entrenamiento": 1000,
	"grupo_muscular": 25,
	"grupo_plantilla": 500,
	"grupo_lista_inicial": 100,
	"equipamiento": 25,
	"equipamiento_plantilla": 500,
	"equipamiento_lista_inicial": 100,
	"ejercicio_en_curso": 1000,
	"serie": 3000
}

inserts.insert_data(conn, cur, data)

utils.check_data(conn, cur, data)

cur.close()

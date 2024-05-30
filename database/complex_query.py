import psycopg2

conn = psycopg2.connect(
	dbname="est_e9977173",
	user="est_e9977173",
	password="dB.e9977173",
	host="ubiwan.epsevg.upc.edu",
	port="5432"
)

cur = conn.cursor()

cur.execute("SET search_path TO practica")

cur.execute("""
SELECT pe.usuario as email, pe.nombre as ejercicio, pe.tipo as tipo,
MAX(CASE
	WHEN pe.tipo = 'repeticiones' THEN r.peso
	WHEN pe.tipo = 'cronometrado' THEN cr.peso
	WHEN pe.tipo = 'cardio' THEN ca.distancia
END) AS personal_record
FROM plantilla_ejercicio pe
JOIN ejercicio_en_curso ec ON pe.id = ec.plantilla
JOIN entrenamiento e ON ec.entrenamiento = e.id
JOIN serie s ON s.ejercicio = ec.id
LEFT JOIN repeticiones r ON r.serie = s.id
LEFT JOIN cronometrado cr ON cr.serie = s.id
LEFT JOIN cardio ca ON ca.serie = s.id
GROUP BY pe.id
ORDER BY pe.usuario, pe.nombre;
""")

res = cur.fetchall()

print("email,ejercicio,tipo,personal_record")
for i in res:
	res = ""
	for j in i:
		res += str(j) + ","
	print(res[:-1])

cur.close()

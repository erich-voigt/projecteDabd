def check_schemas(conn, cur):
	cur.execute("SELECT schemaname, tablename FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')")
	conn.commit()
	schemas = {}
	for element in cur.fetchall():
		schema = element[0]
		table = element[1]
		schemas[schema] = schemas.get(schema, 0) + 1
		print(f"[{schema}]\t{table}")
	print(schemas)

def check_data(conn, cur, data):
	correct = True
	for table in data.keys():
		cur.execute("SELECT COUNT(*) FROM %s" % (table))
		res = cur.fetchone()[0]
		conn.commit()
		if (res != data[table]):
			print(f"[{table}]\n\tExpected Entries: {data[table]}\n\tActual Entries: {res}")
			correct = False
	if (correct):
		print("All good!")

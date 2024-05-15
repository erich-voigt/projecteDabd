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

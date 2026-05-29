#Database setup for the challenge
import sqlite3


connection = sqlite3.connect("logical.db")
cursor = connection.cursor()

query = """CREATE TABLE IF NOT EXISTS users(uname TEXT, password TEXT)"""

cursor.execute(query)

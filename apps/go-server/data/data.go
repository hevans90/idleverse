package idleversedata

import (
	"database/sql"
	"errors"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

// This function will make a connection to the database only once.
func Connect() *sql.DB {
	var err error

	dbUrl := os.Getenv("DATABASE_URL")
	if dbUrl == "" {
		msg := "no database url set in env"
		err = errors.New(msg)
		panic(err)
	}

	db, err = sql.Open("postgres", dbUrl)

	if err != nil {
		panic(err)
	}

	if err = db.Ping(); err != nil {
		panic(err)
	}
	// this will be printed in the terminal, confirming the connection to the database
	fmt.Println("The database is connected")

	return db
}

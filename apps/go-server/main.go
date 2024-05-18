package main

import (
	"context"
	"embed"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"idleversedata"
)

//go:embed templates/*
var resources embed.FS

var t = template.Must(template.ParseFS(resources, "templates/*"))

func main() {

	// try to load .env for local dev
	godotenv.Load("../../.env")

	port := os.Getenv("GO_PORT")
	if port == "" {
		port = "8080"
	}

	db := idleversedata.Connect()

	queries := idleversedata.New(db)
	ctx := context.Background()

	data, err := queries.GetGenerators(ctx)

	// this will close the connection if this functional scope panics or returns
	defer db.Close()

	if err != nil {
		panic(err)
	}

	fmt.Print(data)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := map[string]string{
			"Region": os.Getenv("FLY_REGION"),
		}

		t.ExecuteTemplate(w, "index.html.tmpl", data)
	})

	log.Println("listening on", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

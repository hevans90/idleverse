package main

import (
	"context"
	"embed"
	"fmt"
	"log"
	"net/http"
	"time"

	"html/template"
	"os"

	"github.com/fatih/color"
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
	defer db.Close()

	queries := idleversedata.New(db)
	ctx := context.Background()

	ticker := time.NewTicker(1 * time.Second)

	defer ticker.Stop() // Ensure the ticker is stopped when you're done with it

	// Channel to signal when to stop the ticker
	done := make(chan bool)

	// Goroutine to handle the periodic task
	go func() {
		for {
			select {
			case t := <-ticker.C:
				// This block runs every time the ticker ticks (every second)
				generateResources(ctx, queries, t)
			case <-done:
				// Exit the goroutine when done signal is received
				fmt.Println("Stopping the ticker")
				return
			}
		}
	}()

	// Run an infinite loop that handles the ticks

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := map[string]string{
			"Region": os.Getenv("FLY_REGION"),
		}

		t.ExecuteTemplate(w, "index.html.tmpl", data)
	})

	log.Println("listening on", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))

}

func generateResources(ctx context.Context, queries *idleversedata.Queries, t time.Time) {

	green := color.New(color.FgGreen).SprintFunc()
	formattedTime := t.Format("2006-01-02 15:04:05")
	start := time.Now()
	err := queries.RunGeneration(ctx)
	if err != nil {
		panic(err)
	}
	duration := time.Since(start)
	fmt.Printf("%s: Resources generated in %s \n", formattedTime, green(duration))
}

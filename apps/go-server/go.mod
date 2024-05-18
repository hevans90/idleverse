module idleverse/goserver

go 1.22.1

replace idleversedata => ./data

require (
	github.com/joho/godotenv v1.5.1
	idleversedata v0.0.0-00010101000000-000000000000
)

require (
	github.com/google/uuid v1.6.0 // indirect
	github.com/lib/pq v1.10.9 // indirect
	github.com/sqlc-dev/pqtype v0.3.0 // indirect
)

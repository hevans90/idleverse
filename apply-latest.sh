cd hasura-local/food-db
npx hasura migrate create \"$1\" --from-server --database-name default
ver=$(npx hasura migrate status --database-name default | egrep -o '[0-9]{13}' | tail -1)
npx hasura migrate apply --version "$ver" --skip-execution --database-name default
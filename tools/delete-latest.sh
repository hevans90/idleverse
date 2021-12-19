cd hasura-local/food-db
ver=$(npx hasura migrate status --database-name default | egrep -o '[0-9]{13}' | tail -1)
npx hasura migrate delete --version $ver --database-name default
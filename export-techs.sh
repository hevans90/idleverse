# script to export techs & create up/down migrations for hasura

DIR="apps/hasura/db/migrations/default/$(date +%s000_insert_techs)"
WIPE="DELETE FROM technology;"

mkdir $DIR 

docker exec idleverse-db pg_dump -U postgres --column-inserts -t technology --data-only  > $DIR/temp_up.sql 

# delete garbage output from pg dump
sed '1,22d' $DIR/temp_up.sql > $DIR/temp_up2.sql

rm $DIR/temp_up.sql

# add delete rows at the beginning to prevent dupe IDs
echo -e "$WIPE\n$(cat $DIR/temp_up2.sql)" > $DIR/temp_up2.sql

cp $DIR/temp_up2.sql $DIR/up.sql

rm $DIR/temp_up2.sql

echo "$WIPE" > $DIR/down.sql

echo "Finished export"
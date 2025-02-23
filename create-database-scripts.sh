DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="taskmanager"
DB_USER="postgres"
DB_PASSWORD="postgres" 

export PGPASSWORD="$DB_PASSWORD"

psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f create_tables.sql
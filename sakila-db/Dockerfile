FROM mysql:8.0

COPY 1_sakila-schema.sql /docker-entrypoint-initdb.d/
COPY 2_sakila-data.sql /docker-entrypoint-initdb.d/

@echo off

set PATH=%PATH%;%PROGRAMFILES%\MariaDB 10.6\bin

set HOST="127.0.0.1"
set USER="root"
set PASS="alosi1453"

MYSQL -h %HOST% -u %USER% --password=%PASS% < "database/sql/database.sql"

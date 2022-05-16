#!/bin/bash
HOST='127.0.0.1'
USER='root'
PASS='alosi!$53'
NAME='nodel2'

MYSQL --host=$HOST --user=$USER --password=$PASS < 'database/sql/database.sql'

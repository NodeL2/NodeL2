#!/bin/bash

HOST='127.0.0.1'
USER='root'
PASS='alosi1453'

MYSQL -h $HOST -u $USER --password=$PASS < 'database/sql/database.sql'

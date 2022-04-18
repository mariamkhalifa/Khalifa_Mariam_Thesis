#!/bin/bash
set -e

mongoimport --jsonArray -d ${MONGO_INITDB_DATABASE} -c lessons --file /docker-entrypoint-initdb.d/lessons.json &&
mongoimport --jsonArray -d ${MONGO_INITDB_DATABASE} -c questions --file /docker-entrypoint-initdb.d/questions.json

mongo <<EOF
use $MONGO_INITDB_DATABASE
db.createUser({
  user:  '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
});
EOF
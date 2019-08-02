#/bin/sh
trap "exit" INT TERM ERR
trap "kill 0" EXIT

sass --watch sass/custom.scss:public/css/custom.css &>/dev/null &
nodemon app.js

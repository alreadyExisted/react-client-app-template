#!/bin/sh

check_param() {
  if [ -z "$2" ]; then
	echo $1 "not set"
	exit 1
  fi
}

check_param "API_FAKE" $API_FAKE

echo "var clientConfig = { api: { fake: '$API_FAKE' } }" | tee /usr/share/nginx/html/config.js
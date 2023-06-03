#!/usr/bin/env sh
host="$(grep fly-local-6pn /etc/hosts | awk '{print $1}')"
echo "Using --server-host: $host"
${HGE_BINARY} serve --server-host "$host"
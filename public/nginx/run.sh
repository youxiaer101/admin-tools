#!/bin/bash
/docker-entrypoint.sh nginx
/usr/bin/nginx-prometheus-exporter -nginx.scrape-uri http://127.0.0.1:8080/stub_status
tail -f /dev/null
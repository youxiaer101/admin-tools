FROM harbor.newegg.org/base/nginx-unprivileged:stable-alpine

EXPOSE 8080 9113
USER root
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx-prometheus-exporter /usr/bin/nginx-prometheus-exporter
COPY nginx/run.sh /run.sh
COPY . /usr/share/nginx/html

RUN chmod +x /run.sh
RUN chmod +x /usr/bin/nginx-prometheus-exporter

CMD ["/bin/sh", "/run.sh"]
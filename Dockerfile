FROM nginx:stable-alpine3.17-slim
LABEL org.opencontainers.image.source https://github.com/c3pobot/web-panel
COPY ./dist /usr/share/nginx/html
COPY ./nginx /etc/nginx/templates

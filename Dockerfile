FROM node:18-alpine3.15 AS frontend

WORKDIR /app/frontend
COPY winbook-frontend .
RUN npm install
RUN npm run build --prod

FROM python:3.10-slim AS backend

WORKDIR /app/backend
COPY winbook-backend .
RUN pip install -r requirements.txt
RUN python manage.py migrate
RUN echo "yes" | python manage.py collectstatic --noinput

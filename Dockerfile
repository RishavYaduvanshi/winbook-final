FROM node:18-alpine3.15 AS frontend

WORKDIR /app/frontend
COPY winbook-frontend .
RUN npm install
RUN npm run build --prod
RUN mv /app/frontend/build/static/* /app/static/frontend/build/
RUN rm /app/frontend/build/static -rf
RUN mv /app/frontend/build/* /app/static/
RUN rm /app/frontend/ -rf
FROM python:3.10-slim AS backend

WORKDIR /app/backend
COPY winbook-backend .
RUN pip install -r requirements.txt
RUN python manage.py migrate
RUN echo "yes" | python manage.py collectstatic --noinput
RUN mv /app/static /app/backend/static


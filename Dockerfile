FROM node:18-alpine3.15 AS frontend

WORKDIR /app/frontend
COPY winbook-frontend .
RUN npm install
RUN npm run build --prod
RUN mv /app/frontend/build/static/* /app/frontend/build/
RUN rm /app/frontend/build/static -rf
RUN mv /app/frontend/build/ /app/static/
RUN rm /app/frontend/ -rf



<<<<<<< HEAD
=======
WORKDIR /app/backend
COPY winbook-backend .
RUN pip install -r requirements.txt
RUN python manage.py migrate
COPY --from=frontend /app/static/ /app/backend/statics/
RUN mv /app/backend/statics/index.html /app/backend/templates/ -f
RUN echo "yes" | python manage.py collectstatic --noinput

>>>>>>> 9ad3fc41da65c26983c889f636fdf4803df57c0b


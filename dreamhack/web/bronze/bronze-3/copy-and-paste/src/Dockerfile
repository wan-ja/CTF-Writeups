FROM python:alpine
COPY . /app
WORKDIR /app
RUN pip install flask
EXPOSE 8000
CMD ["python", "app.py"]
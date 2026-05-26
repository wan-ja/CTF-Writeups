FROM python:3.10-slim

WORKDIR /app

COPY deploy/ .

RUN pip install flask

EXPOSE 8000

CMD ["python", "app.py"]
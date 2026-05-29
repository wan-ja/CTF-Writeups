FROM python:alpine

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./ /app/

RUN ["python3", "database_setup.py"]

EXPOSE 80

CMD ["python3", "app.py"]

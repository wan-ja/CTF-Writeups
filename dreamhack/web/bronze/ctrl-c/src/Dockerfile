FROM python:3.13@sha256:385ccb8304f6330738a6d9e6fa0bd7608e006da7e15bc52b33b0398e1ba4a15b

ENV user ctrlc

RUN apt update
RUN pip install flask

RUN useradd -d /home/$user $user

ADD app.py /home/$user/app.py
ADD text.txt /home/$user/text.txt
ADD templates/index.html /home/$user/templates/index.html

RUN chown -R root:root /home/$user
RUN chown root:$user /home/$user/app.py
RUN chown root:$user /home/$user/text.txt
RUN chown root:$user /home/$user/templates/index.html

RUN chmod 755 /home/$user/app.py
RUN chmod 755 /home/$user/text.txt
RUN chmod 755 /home/$user/templates/index.html

WORKDIR /home/$user
USER $user
EXPOSE 5000
CMD ["python", "app.py"]
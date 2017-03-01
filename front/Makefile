install:
	docker run -i --rm -v `pwd`:/usr/src/app -w /usr/src/app node:5 npm install

bash:
	docker run -it --rm -p 8080:8080 -v `pwd`:/usr/src/app -w /usr/src/app --entrypoint="bash" node:5

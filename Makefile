run:
	docker run --rm -d -p 3000:3000 --name excel excel:docker
stop:
	docker stop excel
build:
	docker build -t excel .

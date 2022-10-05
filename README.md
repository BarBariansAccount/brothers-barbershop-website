# Brothers Barbershop website
Capstone project for SOEN 490

Note: When merging, have your code reviewed by at least 2 other peers



# Frontend Installation

Cd into the frontend folder
```
cd frontend
```

Install the dependencies
```
npm install
```
Start the application and run the server
```
npm run serve
```
Installing vue-router if need be
```
npm install vue-router@3
```

# Docker
To build the image, run the following command from the root directory:
```
docker build -f Dockerfile -t barbershop:custom .
```

To run the image, run the following command:
```
docker run --rm -it -p 8080:8080/tcp barbershop:custom
```

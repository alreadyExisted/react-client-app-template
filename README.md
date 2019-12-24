# Run

docker build -t react-client-app-template .  

docker run -d --name react-client-app-template -p 3010:80 -e API_FAKE=https://jsonplaceholder.typicode.com react-client-app-template:latest

# Configuration

| Environment name | Description                                                                              |
| :--------------- | :----------------------------------------------------------------------------------------|
| API_FAKE         | Required. Main api. Example value: 'https://jsonplaceholder.typicode.com'                |

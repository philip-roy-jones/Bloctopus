- If you're running this project locally for the first time, be sure to run the following command after starting the Kong database, but before starting the full Docker Compose stack. This initializes the database properly:
  
  `docker compose run --rm kong kong migrations bootstrap`
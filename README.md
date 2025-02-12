# Guide
- Clone the project
 - Run npm install in the root folder

 - Make an env file in root folder with the following
   ```dotenv
    PORT = 8080
    DBUSER = root
    DBPASSWORD=Your_Password
    DBHOST = localhost
    DBPORT = 3306

   
    TOKEN_ACCESS_KEY=secret_token_key
    TOKEN_ACCESS_EXPIRATION_SECS=3600


    TOKEN_REFRESH_KEY=secret_token_key
    TOKEN_REFRESH_EXPIRATION_SECS=86400
    ```
    - Run ```node --watch index.js``` in the terminal
    - The server should now run and you can work with the api
# Postman Docs
https://documenter.getpostman.com/view/30344673/2sAYXBHfDA

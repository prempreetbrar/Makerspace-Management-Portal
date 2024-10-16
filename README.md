# How to Run
- Clone the repository
- From the frontend folder, run 'npm list' and ensure that all of the following packages are installed:
```
+-- @eslint/js@9.12.0
+-- @types/react-dom@18.3.1
+-- @types/react@18.3.11
+-- @vitejs/plugin-react@4.3.2
+-- axios@1.7.7<br>
+-- eslint-plugin-react-hooks@5.1.0-rc-fb9a90fa48-20240614
+-- eslint-plugin-react-refresh@0.4.12
+-- eslint@9.12.0
+-- globals@15.11.0
+-- react-dom@18.3.1
+-- react@18.3.1
+-- typescript-eslint@8.9.0
+-- typescript@5.6.3
`-- vite@5.4.9
```
- From the backend folder, run 'npm list' and ensure that all of the following packages are installed:
```
+-- cors@2.8.5
+-- express@4.21.1
+-- nodemon@3.1.7
+-- sequelize@6.37.4
`-- sqlite3@5.1.7
```
- From the backend folder, confirm that the database is set up by running the following commands:
  - Open the database in the sqlite command line shell: sqlite3 database.db
  - Print the tables: .tables
    - The output should be a single line that reads 'Users'
  - Print the columns of Users: select * from Users;
    - The output should be a single line that reads '2|test_user_2|2007-01-01 10:00:00|2010-01-01 10:00:00|2024-01-01 10:00:00'
  - Exit the sqlite command line shell: .quit
- Confirm that the website can run locally:
  - From the backend folder, run 'npm run dev'
  - In a separate terminal, navigate to the frontend folder and run 'npm run dev'
  - In your browser, go to: http://localhost:5173/
    - The page should look like this:<br>
![screenshot](frontend/public/starter_home_page.png)
  - Shut down the frontend and backend dev servers using CTRL+C in the terminals
- Run the website in docker containers:
  - In frontend/src/App.tsx:
    - Comment out line 20: 'const response = await axios.get("http://localhost:8080/users");'
    - Un-comment line 21: 'const response = await axios.get("/users");'
  - From the project root:
    - Build the images: docker-compose build
    - Run the containers: docker-compose up
  - In your browser, go to: http://localhost:5000/
    - The page should look the same as it did on your local machine

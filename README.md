# Full-Stack Coding Challenge

---

## Folder Structure
- task-manager-backend consists all the code related to the backend
- task-manager-frontend has all the front end related code
- create_tables.sql has queries to create tables users and tasks
- create-database-script.sh is the bash file to create database and tables from the create_table.sql 
- Lumaa_Task_Manager_Arun_Gangula.postman_collection.json is a postman collection for backend CRUD operations
- **Note** : If postgres database is already setup as per the Database requirements below, then running the .sh file can be skipped

---

## Steps to run the project
### Database setup
- The Database is hosted on Postgres server as instructed.
**Database Credentials**
  - Host: localhost
  - Port: 5432
  - Username: postgres
  - Password: postgres
  - Database Name: taskmanager
  - Tables: (users and tasks)
  
  You can either set the database and tables manually or run the script `./create-database-script.sh` in the root directory. 
  This will create the database and the tables.
---

### Backend
- Folder task-manager-backend has the backend code
- Enter the folder
- The backend is developed using node.js. I did not use express as it was not specifically mentioned so I was of the opinion that might deduct the points.
- **To run the project**
    - Install dependencies using `npm install`
    - Start server using `npm start` or `npm run start`
- By default server is on `http://localhost:5000/`
- **.env** file is in the root of the folder
  - Configure the server port using `PORT` variable
  - Any changes to the database, if your database is configured in a different manner, the database url can be configured using `DATABASE_URL` variable
  - `JWT_SECRET` is jwt token secret
- There is postman collection file in the root directory to test all the APIs 

---

### Frontend
- Folder task-manager-frontend has the frontend code
- Enter the folder
- The frontend is developed using react.js and typescript.
- **To run the project**
    - Install dependencies using `npm install`
    - Start server using `npm start`
    - The application is started at `http://localhost:3000/`
- **.env** file is in the root of the folder
  - You can configure the connection to the backend using `REACT_APP_BASE_URL` variable

---

**Demo Video Link**
https://drive.google.com/file/d/1E3UwKWxMjbcrzO04goXfJ4c-WiM4GbnC/view?usp=sharing

---
>Salary Expectations per month: $5000 - $6000
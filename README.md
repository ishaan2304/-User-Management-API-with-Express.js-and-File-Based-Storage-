
# User Management API with Express.js using Mongo DB as storage
This project is a User Management API built using Express.js, designed to handle CRUD operations for user data stored in a connected Mongo Db database. It demonstrates core concepts of server-side application development, including middleware usage, dynamic routing, file operations, and basic error handling.


## Features
1.Retrieve All Users  
• GET `/api/users`: Fetch all user details in JSON format.  
• GET `/users`: Display user names in an HTML list.

2.Retrieve, Update, and Delete by   
• GET `/api/users/:id`: Fetch a user by their ID.  
• PUT `/api/users/:id`: Update user data (currently a placeholder).
•DELETE `/api/users/:id`: Delete a user (currently a placeholder).

3.Add a New User  
• POST `/api/users`: Add a new user to the JSON file with a unique ID.
  
4.Request Logging  
• Logs all incoming API requests to log.txt with a timestamp, method, and path.

5.Custom Middleware  
• Adds a custom username property to requests.
Dynamically appends request logs to a file.


## Installation

1.Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

```
2.Install Dependencies:

```bash
npm install
```
3.Run the Server:
```bash
node app.js
```
4.Access the API:
```bash
http://localhost:7000
```

    
## Example:

• Fetch All Users:
```bash
GET http://localhost:7000/api/users
```
• Add a New User:
```bash
POST http://localhost:7000/api/users
Body: {
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}
```
• Fetch User by ID:
```bash
GET http://localhost:7000/api/users/1
```
## Dependencies
• express: Web framework for Node.js  
• fs: File system module for logging and data persistence

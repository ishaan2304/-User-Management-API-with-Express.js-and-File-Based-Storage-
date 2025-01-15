// Import necessary modules
const express = require("express");   // Express framework for building the server
const users = require("./MOCK_DATA.json");   // Importing mock user data
const app = express();   // Initializing the Express app
const port = 7000;    // Defining the server's port
const fs = require("fs");   // File system module for reading/writing files
const mongoose=require("mongoose"); //connection
mongoose
.connect("mongodb://127.0.0.1:27017/users")
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log("Mongo Error",err));
//schema
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
        lastName:{
        type:String,
        require:true,
    },
    jobTitle:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
    },
},
{timestamps:true}
)
const User =mongoose.model("user",userSchema)
// Middleware 1: Adds a custom property to the request and logs a message
app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    req.username = "piyush sir";   // Adding a custom property to the request object
    next();   // Passing control to the next middleware/route handler
});

// Middleware 2: Logs API requests to a file (`log.txt`)
app.use((req, res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()}:${req.method}:${req.path}`, (err, data) => {
        next(); // Passing control to the next middleware/route handler
    });
});

// Route: Get all users in JSON format
app.get("/api/users", (req, res) => {
    res.setHeader("X name", "ishans"); // Adding a custom response header
    return res.json(users); // Sending the entire user data as a JSON response
});

// Route: Get all users as an HTML list
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`; // Generating an HTML list of user first names
    res.send(html); // Sending the HTML as the response
});

// Middleware: Parses URL-encoded data from incoming requests
app.use(express.urlencoded({ extended: false }));

// Routes for specific user operations (using route chaining)
app.route("/api/users/:id")
    // Get a user by ID
    .get(async(req, res) => {
     const user=await User.findById(req.params.id);
        if(!user){ return res.status(404).json({error:"user not found});
                                               }
                                               return res.json(user);
    })
    // Placeholder for updating a user by ID
    .put((req, res) => {
        return res.json({ status: "pending" }); // Placeholder response for update
    })
    // Placeholder for deleting a user by ID
    .delete((req, res) => {
        return res.json({ status: "pending" }); // Placeholder response for delete
    });

// Route: Adding a new user
app.post("/api/users", async(req, res) => {
    const body = req.body; 
    //handling missing values while adding a new user
    if(!body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title){
        res.status(400).json({msg:'Enter all the values'});
    }
    const result=await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,
  });
    console.log("result",result);
    return res.status(201).json({ status: "success" }); // Placeholder status response
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`); // Log the server's start URL
});

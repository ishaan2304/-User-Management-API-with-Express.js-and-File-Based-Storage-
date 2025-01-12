// Import necessary modules
const express = require("express"); // Express framework for building the server
const users = require("./MOCK_DATA.json"); // Importing mock user data
const app = express(); // Initializing the Express app
const port = 7000; // Defining the server's port
const fs = require("fs"); // File system module for reading/writing files

// Middleware 1: Adds a custom property to the request and logs a message
app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    req.username = "piyush sir"; // Adding a custom property to the request object
    next(); // Passing control to the next middleware/route handler
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
    .get((req, res) => {
        const id = Number(req.params.id); // Extracting the user ID from the route parameter
        const user = users.find((user) => user.id === id); // Finding the user with the given ID
        return res.json(user); // Sending the found user as a JSON response
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
app.post("/api/users", (req, res) => {
    const body = req.body; // Accessing the request body
    users.push({ ...body, id: users.length }); // Adding the new user with an incremented ID
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: pending }); // Placeholder status response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`); // Log the server's start URL
});

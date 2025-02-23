import bcrypt, {hash } from "bcrypt"
import client from "./db.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret1234";

// Register the user
export const register = (req, res) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async() => {
        try {
            // Get Username and Password from the request
            const {username, password} = JSON.parse(body);
            if (!username || !password) {
                throw new Error('Missing username or password');
            }

            // Hash Password using Bcyrpt
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert User into the DB
            await client.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);

            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "User registered successfully"}));
        }
        catch (error) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({error: error.message}));
        }
});
}

// Login User
export const login = (req, res) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async() => {
        try {
            // Get Username and Password from the request
            const {username, password} = JSON.parse(body);
            if (!username || !password) {
                throw new Error('Missing username or password');
            }
            
            // Fetch user details from the db with the username
            const user = await client.query("SELECT * from users WHERE username = $1", [username]);

            // Authorize using username and password
            if (user.rowCount == 0 || !(await bcrypt.compare(password, user.rows[0].password))) {
                res.writeHead(400, {"Content-Type": "application/json"});
                return res.end(JSON.stringify({message: "Invalid credentials"}));
            }

            // Create JWT token and send the token to the user
            const token = jwt.sign({userId: user.rows[0].id }, SECRET_KEY, {expiresIn: "1h"});
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({token}));
        }
        catch (error) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({error: error.message}));
        }
});
}

// Middleware to authenticate user in every request
export const authenticate = (req, res, next) => {
    // JWT token in request authorization Bearer Header
    const reqAuthHeader = req.headers.authorization;
    // console.log(reqAuthHeader);

    if (!reqAuthHeader) {
        res.writeHead(401, {"Content-Type": "application/json"});
        return res.end(JSON.stringify({error: "Access Denied"}));
    }

    try {
        const token = reqAuthHeader.split(" ")[1];
        // Verify token using JWT
        const userData = jwt.verify(token, SECRET_KEY);

        // Storing the user in the current request object
        req.user = userData;
        // console.log(userData)
        next();
    }
    catch (error) {
        res.writeHead(401, {"Content-Type": "application/json"});
        return res.end(JSON.stringify({error: "Access Denied"}));
    }
}

import client from "./db.js";

// Get all the tasks
export const getTasks = async (req, res) => {
    try {
        const userTasks = await client.query("SELECT * from tasks where userId = $1 ORDER BY id", [req.user.userId])
        res.writeHead(200, {"Content-Type": "application/json"});
        return res.end(JSON.stringify(userTasks.rows));
    }
    catch(error) {
        res.writeHead(500, {"Content-Type": "application/json"});
        return res.end(JSON.stringify({error: "Internal Server Error. Please try again later"}));
    }
}

// Creating a new task
export const createTask = (req, res) => {
    try {
        let body = "";
        req.on("data", chunk => body += chunk.toString());

        req.on("end", async() => {
            const {title, description, iscomplete} = JSON.parse(body);
            await client.query("INSERT INTO tasks (title, description, iscomplete, userId) VALUES ($1, $2, $3, $4)", [title, description, iscomplete, req.user.userId]);
            res.writeHead(200, {"Content-Type": "application/json"});
            return res.end(JSON.stringify({message: "Task Created Successfully!"}));
        })
    }
    catch(error) {
        const statusCode = error instanceof SyntaxError ? 400 : 500;
        const errorMessage = error instanceof SyntaxError ? "Invalid Input" : "Internal Server Error";
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: errorMessage }));
    }
}

// Updating a task
export const updateTask = (req, res) => {
    try {
        let body = "";
        req.on("data", chunk => body += chunk.toString());

        req.on("end", async() => {
            const {title, description, iscomplete} = JSON.parse(body);
            const taskId = req.url.split("/")[2];
                
            const task = await client.query("SELECT * FROM tasks WHERE id = $1 AND userId = $2", [taskId, req.user.userId]);
            if (task.rowCount == 0) {
                res.writeHead(400, {"Content-Type": "application/json"});
                return res.end(JSON.stringify({error: "Invalid Task Id"}));    
            }

            const updateTask = await client.query("UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), iscomplete = COALESCE($3, iscomplete) WHERE id = $4 RETURNING *", 
                [title, description, iscomplete, taskId]);
            
            res.writeHead(200, {"Content-Type": "application/json"});
            return res.end(JSON.stringify(updateTask.rows));
        })
    }
    catch(error) {
        const statusCode = error instanceof SyntaxError ? 400 : 500;
        const errorMessage = error instanceof SyntaxError ? "Invalid Input" : "Internal Server Error";
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: errorMessage }));
    }
}

// Deleting a task
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.url.split("/")[2];
        const task = await client.query("SELECT * FROM tasks WHERE id = $1 AND userId = $2", [taskId, req.user.userId]);
        if (task.rowCount == 0) {
            res.writeHead(400, {"Content-Type": "application/json"});
            return res.end(JSON.stringify({error: "Invalid Task Id"}));    
        }

        await client.query("DELETE FROM tasks WHERE id = $1", [taskId]);
        res.writeHead(200, {"Content-Type": "application/json"});
        return res.end(JSON.stringify({message: "Deleted Successfully"}));
    }
    catch (error) {
        res.writeHead(500, {"Content-Type": "application/json"});
        return res.end(JSON.stringify({message: "Internal Server Error. Please try again later"}));
    }
}


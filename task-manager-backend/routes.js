import {register, login, authenticate} from "./authentication.js";
import { getTasks, createTask, updateTask, deleteTask } from "./tasks.js";

export const handleRequest = (req, res) => {
    // Handling CORS Requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    

    const requestMethod = req.method;
    const requestUrl = req.url;

    // CRUD operations
    switch (requestMethod) {
        case 'GET':
            // TODO Delete This
            if (requestUrl === '/auth')
                return authenticate(req, res);

            if (requestUrl == '/tasks')
                return authenticate(req, res, () => getTasks(req, res));


            break;

        case 'POST':
            if (requestUrl === '/auth/register')
                return register(req, res);
            
            if (requestUrl === '/auth/login')
                return login(req, res);

            if (requestUrl == '/tasks')
                return authenticate(req, res, () => createTask(req, res));
        
            break;

        case 'PUT':
            if (requestUrl.startsWith('/tasks'))
                return authenticate(req, res, () => updateTask(req, res));
            break;
        
        case 'DELETE':
            if (requestUrl.startsWith('/tasks'))
                return authenticate(req, res, () => deleteTask(req, res));
            break;
    }
    
    // Handling request errors
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
}
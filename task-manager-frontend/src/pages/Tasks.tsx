import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, getTasks, updateTask, deleteTask } from "../apiRoutes";

const Tasks: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || "";

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [tasks, setTasks] = useState<{id: number, title: string, description: string, iscomplete: boolean, userid: number}[]>([]);

    const logoutUser = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
        }

        const getAllTasks = async() => {
            try {
                const taskResponse = await getTasks(token);
                await setTasks(taskResponse.data);
                console.log(tasks)
            }
            catch {
                logoutUser();
                console.log("Failed to get data. Please login to continue.");
            }
            
        }

        getAllTasks();
        
    }, [token, navigate]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    const createTaskFunction = async() => {
        try {
            await createTask(taskTitle, taskDescription, token!);
            window.location.reload();
        }
        catch {
            alert("Internal Error. Please try again.")
        }
        
    };

    const updateTaskFunction = async(taskId: number, isComplete: boolean) => {
        try {
            await updateTask(taskId, !isComplete, token!);
            window.location.reload();    
        }
        catch {
            alert("Internal Error. Please try again.")
        }
        
    };

    const deleteTaskFunction = async(taskId: number) => {
        try {
            await deleteTask(taskId, token!);
            window.location.reload();
        }
        catch {
            alert("Internal Error. Please try again.")
        }
    };

    return (
        <div className="main-wrapper">
            <h2>Tasks</h2>
            <input type="text" placeholder="Task Title" onChange={(e) => setTaskTitle(e.target.value)}/>
            <input type="text" placeholder="Task Description" onChange={(e) => setTaskDescription(e.target.value)}/>
            <button onClick={createTaskFunction}>Create Task</button>
            <h3>Task List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Is Complete</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.iscomplete ? "YES" : "NO"}</td>
                            <td>
                                <button onClick={() => updateTaskFunction(task.id, task.iscomplete)}>Toggle Complete</button>
                                <button onClick={() => deleteTaskFunction(task.id)}>Delete Task</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Tasks;
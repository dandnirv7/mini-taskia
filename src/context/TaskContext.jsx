import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, progress: "selesai" } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, updateTask, completeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.object,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  priority: "low" | "medium" | "high";
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Map JSONPlaceholder todos to our Task interface
const mapTodoToTask = (todo: any): Task => {
  const statuses: Task["status"][] = ["todo", "inprogress", "done"];
  const priorities: Task["priority"][] = ["low", "medium", "high"];

  return {
    id: todo.id,
    title: todo.title,
    description: `Task description for: ${todo.title}`,
    status: todo.completed ? "done" : statuses[todo.id % 2],
    priority: priorities[todo.id % 3],
  };
};

export const taskService = {
  async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos?_limit=15`);
      return response.data.map(mapTodoToTask);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw error;
    }
  },

  async updateTask(taskId: number, updates: Partial<Task>): Promise<Task> {
    try {
      // Simulate API update - JSONPlaceholder returns fake success
      const response = await axios.patch(`${API_BASE_URL}/todos/${taskId}`, {
        completed: updates.status === "done",
        title: updates.title,
      });

      return {
        id: taskId,
        title: response.data.title || `Task ${taskId}`,
        description: `Updated task description for: ${response.data.title}`,
        status: updates.status || "todo",
        priority: updates.priority || "medium",
      };
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  },

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        title: task.title,
        body: task.description,
        completed: task.status === "done",
        userId: 1,
      });

      return {
        id: response.data.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      };
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  },

  async deleteTask(taskId: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${taskId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  },
};

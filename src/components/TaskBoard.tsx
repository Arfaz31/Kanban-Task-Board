import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { Task } from "../services/taskService";
import { taskService } from "../services/taskService";
import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [addingToStatus, setAddingToStatus] = useState<Task["status"] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: "todo", title: "To Do", status: "todo" as const },
    { id: "inprogress", title: "In Progress", status: "inprogress" as const },
    { id: "done", title: "Done", status: "done" as const },
  ];

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as Task["status"];

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await taskService.updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error("Failed to update task:", error);
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: task.status } : t))
      );
    }
  };

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    try {
      const createdTask = await taskService.createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleEditTask = async (taskId: number, updates: Partial<Task>) => {
    try {
      await taskService.updateTask(taskId, updates);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    try {
      await taskService.deleteTask(selectedTask.id);
      setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
      setSelectedTask(null);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(selectedTask?.id === task.id ? null : task);
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 min-h-screen bg-gray-100">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Task Board
        </h1>
        <p className="text-gray-600">Manage your tasks with drag and drop</p>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-start">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.status)}
              selectedTask={selectedTask}
              onAddTask={(status) => setAddingToStatus(status)}
              onEditTask={(task) => setEditingTask(task)}
              onSelectTask={handleSelectTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              isDragging
              onEdit={() => {}}
              onSelect={() => {}}
              onDelete={() => {}}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Modals */}
      <AddTaskModal
        isOpen={addingToStatus !== null}
        onClose={() => setAddingToStatus(null)}
        onSubmit={handleAddTask}
        status={addingToStatus || "todo"}
      />

      <EditTaskModal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        onSubmit={handleEditTask}
        task={editingTask}
      />
    </div>
  );
};

export default TaskBoard;

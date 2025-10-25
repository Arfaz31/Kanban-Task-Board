import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MdAdd } from 'react-icons/md';
import type { Task } from '../services/taskService';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  selectedTask: Task | null;
  onAddTask: (status: Task['status']) => void;
  onEditTask: (task: Task) => void;
  onSelectTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

const TaskColumn = ({ 
  id, 
  title, 
  tasks, 
  selectedTask,
  onAddTask, 
  onEditTask, 
  onSelectTask,
  onDeleteTask
}: TaskColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const getColumnColor = () => {
    switch (id) {
      case 'todo':
        return 'border-red-200 bg-red-50';
      case 'inprogress':
        return 'border-yellow-200 bg-yellow-50';
      case 'done':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getHeaderColor = () => {
    switch (id) {
      case 'todo':
        return 'text-red-700 bg-red-100';
      case 'inprogress':
        return 'text-yellow-700 bg-yellow-100';
      case 'done':
        return 'text-green-700 bg-green-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const handleAddTask = () => {
    onAddTask(id as Task['status']);
  };

  return (
    <div className="w-full">
      {/* Column Header */}
      <div className={`p-4 rounded-t-lg ${getHeaderColor()}`}>
        <h3 className="font-semibold text-sm uppercase tracking-wide">
          {title}
        </h3>
        <span className="text-xs opacity-75">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Task Area */}
      <div
        ref={setNodeRef}
        className={`
          rounded-b-lg border-2 transition-colors duration-200 
          ${getColumnColor()}
          ${isOver ? 'border-blue-400 bg-blue-50' : ''}
        `}
      >
        <div className="p-4 space-y-3">
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                isSelected={selectedTask?.id === task.id}
                onEdit={onEditTask}
                onSelect={onSelectTask}
                onDelete={onDeleteTask}
              />
            ))}
          </SortableContext>
          
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No tasks</p>
            </div>
          )}
        </div>

        {/* Add Task Button */}
        <div className="p-4 border-t border-gray-200/50">
          <button
            onClick={handleAddTask}
            className="w-full flex items-center justify-center gap-2 p-3 
                     text-gray-600 bg-white/80 border-2 border-dashed border-gray-300 
                     rounded-lg hover:bg-white hover:border-gray-400 hover:text-gray-700
                     transition-all duration-200"
          >
            <MdAdd size={16} />
            <span className="text-sm font-medium">Add a card</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;

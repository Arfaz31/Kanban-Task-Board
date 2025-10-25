import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdEdit, MdDelete } from "react-icons/md";
import type { Task } from "../services/taskService";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  isSelected?: boolean;
  onEdit: (task: Task) => void;
  onSelect: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard = ({
  task,
  isDragging = false,
  isSelected = false,
  onEdit,
  onSelect,
  onDelete,
}: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const cardClasses = `
    bg-white rounded-lg border-2 p-4 cursor-grab active:cursor-grabbing group
    shadow-sm hover:shadow-md transition-all duration-200 relative
    ${isDragging || isSortableDragging ? "opacity-50 rotate-3 shadow-lg" : ""}
    ${isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"}
  `;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(task);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cardClasses}
      onClick={handleCardClick}
    >
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-1">
        {/* Edit Button - Always visible on hover */}
        <button
          onClick={handleEditClick}
          className="opacity-0 group-hover:opacity-100 bg-blue-500 text-white p-1 rounded-full 
                   hover:bg-blue-600 transition-all duration-200 z-10"
        >
          <MdEdit size={12} />
        </button>

        {/* Delete Button - Only visible when selected */}
        {isSelected && (
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 
                     transition-all  z-10 animate-in fade-in duration-200"
          >
            <MdDelete size={12} />
          </button>
        )}
      </div>

      <div className="flex items-start justify-between mb-2 pr-12">
        <h4 className="font-medium text-gray-900 text-sm leading-tight">
          {task.title}
        </h4>
        <span
          className={`
            px-2 py-1 rounded-full text-xs font-medium border shrink-0
            ${getPriorityColor(task.priority)}
          `}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-gray-600 text-xs leading-relaxed mb-3">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">ID: {task.id}</div>
        {isSelected && (
          <div className="text-xs text-blue-600 font-medium">Selected</div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import type { Task } from '../services/taskService';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskId: number, updates: Partial<Task>) => void;
  task: Task | null;
}

interface FormData {
  title: string;
  description: string;
  priority: Task['priority'];
}

const EditTaskModal = ({ isOpen, onClose, onSubmit, task }: EditTaskModalProps) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
    }
  });

  useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description);
      setValue('priority', task.priority);
    }
  }, [task, setValue]);

  const onFormSubmit = (data: FormData) => {
    if (!task) return;
    
    onSubmit(task.id, {
      title: data.title.trim(),
      description: data.description.trim(),
      priority: data.priority,
    });
    
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-800">Edit Task</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <MdClose size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                       placeholder-gray-400 transition-all duration-200"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                       placeholder-gray-400 transition-all duration-200 resize-none"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              {...register('priority')}
              className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                       transition-all duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100/70 backdrop-blur-sm rounded-lg 
                       hover:bg-gray-200/70 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-white bg-blue-600/90 backdrop-blur-sm rounded-lg 
                       hover:bg-blue-700/90 transition-all duration-200 font-medium shadow-lg"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

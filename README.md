# Kanban Task Board

A modern, full-featured task management application built with React, TypeScript, and Vite. Features a multi-step onboarding flow and an intuitive drag-and-drop Kanban board for efficient task organization.

## Features

### Multi-Step Onboarding
- **Step 1: User Information** - Collect name and email
- **Step 2: Organization Setup** - Configure workspace name
- **Step 3: Plan Selection** - Choose between Free, Pro, and Enterprise plans
- Form validation with React Hook Form
- Progress tracking with visual indicators
- State persistence across steps
- Smooth transitions and animations

### Kanban Task Board
- **Three-Column Layout**: To Do, In Progress, Done
- **Drag-and-Drop Functionality**: Seamlessly move tasks between columns using @dnd-kit
- **Task Management**: Create, edit, and delete tasks
- **Task Properties**:
  - Title and description
  - Priority levels (low, medium, high)
  - Status tracking
  - Unique task IDs
- **Persistent Storage**: Tasks saved to fake JSON API
- **Real-time Updates**: Instant UI updates on task changes
- **Toast Notifications**: User feedback with Sonner

### User Interface
- Responsive design for all screen sizes
- Mobile-friendly sidebar and navigation
- Dark-themed sidebar with gradient effects
- Clean, modern dashboard with statistics cards
- Recent activity feed

## Tech Stack

### Core
- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server

### Styling
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.16** - Vite plugin for Tailwind

### State Management
- **Redux Toolkit 2.9.2** - Predictable state container
- **React-Redux 9.2.0** - React bindings for Redux
- **Redux Persist 6.0.0** - State persistence

### Routing
- **React Router DOM 7.9.4** - Client-side routing

### Form Handling
- **React Hook Form 7.65.0** - Performant form validation

### Drag and Drop
- **@dnd-kit/core 6.3.1** - Modern drag-and-drop toolkit
- **@dnd-kit/sortable 10.0.0** - Sortable presets
- **@dnd-kit/utilities 3.2.2** - Utility functions

### UI Components
- **React Icons 5.5.0** - Popular icon library
- **Lucide React 0.548.0** - Beautiful icon set
- **Sonner 2.0.7** - Toast notifications

### API Integration
- **Axios 1.12.2** - HTTP client
- **JSONPlaceholder/Custom Mock API** - Fake REST API

## Project Structure

```
kanban-task-board/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── MainLayout.tsx       # Main layout wrapper
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── Topbar.tsx           # Top navigation bar
│   │   │   └── BottomBar.tsx        # Bottom navigation (mobile)
│   │   ├── AddTaskModal.tsx         # Task creation modal
│   │   ├── EditTaskModal.tsx        # Task editing modal
│   │   ├── TaskBoard.tsx            # Main kanban board
│   │   ├── TaskCard.tsx             # Individual task card
│   │   └── TaskColumn.tsx           # Kanban column component
│   ├── pages/
│   │   ├── Dashboard.tsx            # Main dashboard
│   │   ├── ErrorPage.tsx            # Error page
│   │   └── Onboarding.tsx           # Onboarding flow
│   ├── redux/
│   │   ├── store.ts                 # Redux store configuration
│   │   ├── slices/
│   │   │   └── onboardingSlice.ts   # Onboarding state
│   │   └── hook.ts                  # Typed Redux hooks
│   ├── route/
│   │   └── (routing configuration)  # App routes
│   ├── services/
│   │   └── taskService.ts           # API service layer
│   ├── Shared/
│   │   ├── App.css                  # App-specific styles
│   │   ├── App.tsx                  # Root component
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # Application entry point
│   └── assets/                      # Static assets
├── public/                          # Public static files
├── .gitignore                       # Git ignore rules
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── vite.config.ts                   # Vite configuration
├── vercel.json                      # Vercel deployment config
└── README.md                        # This file
```

## Getting Started

### Prerequisites

- Node.js 20 and Yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/kanban-task-board.git
cd kanban-task-board
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn dev
```

4. Open your browser
```
http://localhost:5173
```

### Available Scripts

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint
```

### Build for Production

```bash
yarn build
```

The optimized production build will be in the `dist/` directory.

## Usage

### Onboarding Process

1. **First Visit**: Users are automatically redirected to the onboarding flow
2. **Step 1**: Enter your name and email address
3. **Step 2**: Set up your workspace name
4. **Step 3**: Choose a subscription plan (Free, Pro, or Enterprise)
5. **Submit**: Complete onboarding and access the dashboard

### Task Management

#### Creating a Task
1. Navigate to the Tasks page
2. Click the "Add Task" button in any column
3. Fill in task details using the modal:
   - Title (required)
   - Description
   - Priority level
4. Click "Create Task"
5. Toast notification confirms creation

#### Moving Tasks
- **Drag and Drop**: Click and drag tasks between columns using @dnd-kit
- **Status Update**: Tasks automatically update their status based on the column
- **Smooth Animations**: Visual feedback during drag operations

#### Editing Tasks
1. Click on a task card
2. Edit task modal opens with current details
3. Modify task information
4. Save changes
5. Toast notification confirms update

#### Deleting Tasks
1. Click on a task card
2. Click the delete button
3. Confirm deletion
4. Toast notification confirms deletion

### Dashboard Features

- **User Information Card**: Displays your name and email
- **Workspace Card**: Shows your workspace name
- **Current Plan Card**: Displays your selected subscription plan
- **Recent Activity**: Shows the last 3 task updates with status icons

## API Integration

### Task Service

The API service is located in `src/services/taskService.ts` and uses Axios for HTTP requests.

#### Endpoints Used:
```typescript
GET    /tasks          // Fetch all tasks
POST   /tasks          // Create new task
PUT    /tasks/:id      // Update task
DELETE /tasks/:id      // Delete task
```

#### Task Object Structure:
```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}
```

### Switching to a Different API

To use a different API endpoint, update the base URL in `src/services/taskService.ts`:

```typescript
const api = axios.create({
  baseURL: 'https://your-api-endpoint.com'
});
```

## State Management

### Redux Store Structure

```typescript
{
  onboarding: {
    currentStep: number,
    userInfo: {
      name: string,
      email: string
    },
    organizationInfo: {
      workspaceName: string
    },
    selectedPlan: 'free' | 'pro' | 'enterprise',
    isOnboarded: boolean
  }
}
```

### Redux Persist

The application uses `redux-persist` to save state to localStorage:
- Onboarding state is persisted to prevent re-onboarding
- User preferences are maintained across sessions
- Tasks are managed through the API service

### Resetting State

To reset onboarding and start fresh:
1. Click the "Logout" button in the sidebar
2. This will clear onboarding state and redirect to onboarding flow
3. Or manually clear localStorage in browser DevTools

## Form Validation

Forms are managed with React Hook Form for optimal performance:
- Real-time validation
- Error messages
- Minimal re-renders
- Type-safe with TypeScript
- Custom validation rules

## Drag and Drop Implementation

Using @dnd-kit library for modern drag-and-drop:
- Accessible keyboard navigation
- Touch support for mobile
- Smooth animations
- Collision detection
- Auto-scroll support

```typescript
// Example drag handler
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  
  if (over && active.id !== over.id) {
    // Update task status
    updateTaskStatus(active.id, over.id);
  }
};
```

## Notifications

Toast notifications powered by Sonner:
- Success messages for task operations
- Error handling
- Customizable appearance
- Auto-dismiss
- Accessible

```typescript
import { toast } from 'sonner';

// Success notification
toast.success('Task created successfully!');

// Error notification
toast.error('Failed to create task');
```

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment with `vercel.json`.

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## Customization

### Theming

Tailwind CSS 4.x uses a new configuration format. Customize in `tailwind.config.js` or use CSS variables:

```css
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}
```

### Styling

- Global styles: `src/Shared/index.css`
- Component styles: `src/Shared/App.css`
- Tailwind utilities: Applied directly in components

## Error Handling

- Custom error page component (`ErrorPage.tsx`)
- API error handling with try-catch blocks
- User-friendly error messages
- Toast notifications for errors
- Redux error state management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages
- Follow ESLint rules (`yarn lint`)

### Development Guidelines

- Test changes locally before committing
- Ensure no TypeScript errors (`yarn build` runs `tsc -b`)
- Follow the existing project structure
- Document complex logic
- Use React Hook Form for forms
- Use @dnd-kit for drag-and-drop


---

Made with ❤️ using React + TypeScript + Redux + Vite

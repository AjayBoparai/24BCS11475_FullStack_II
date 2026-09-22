import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  memo,
} from 'react';
import './App.css';

const student = {
  name: 'Aadil Narang',
  email: 'Aadil@gmail.com',
  year: '3rd Year',
};

const initialTasks = [
  { id: 1, title: 'Finish DBMS assignment', completed: false },
  { id: 2, title: 'Revise React hooks', completed: false },
  { id: 3, title: 'Submit lab report', completed: true },
];

const StudentContext = createContext(student);

function StudentProvider({ children }) {
  return (
    <StudentContext.Provider value={student}>{children}</StudentContext.Provider>
  );
}

function useUser() {
  return useContext(StudentContext);
}

function useTaskStats(tasks) {
  return useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const remaining = total - completed;

    return { total, completed, remaining };
  }, [tasks]);
}

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const text = action.payload.trim();
      if (!text) return tasks;
      return [...tasks, { id: Date.now(), title: text, completed: false }];
    }
    case 'TOGGLE_TASK':
      return tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task,
      );
    case 'DELETE_TASK':
      return tasks.filter((task) => task.id !== action.payload);
    default:
      return tasks;
  }
}

function Header() {
  const user = useUser();

  return (
    <div className="header">
      <h1>STUDYHUB</h1>
      <p>Welcome, {user.name} ({user.year})</p>
    </div>
  );
}

function ProfilePanel() {
  const user = useUser();

  return (
    <div className="box">
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Year:</strong> {user.year}</p>
    </div>
  );
}

function TaskStats({ tasks }) {
  const stats = useTaskStats(tasks);

  return (
    <h2 className="task-title">
      MY TASKS ({stats.remaining} remaining / {stats.total} total)
    </h2>
  );
}

function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(text);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

const TaskItem = memo(function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-row">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? 'done' : ''}>{task.title}</span>
      </label>
      <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>
    </li>
  );
});

function TaskList({ tasks, onToggle, onDelete }) {
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
  }, [tasks]);

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function TaskManager() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const addTask = (title) => {
    dispatch({ type: 'ADD_TASK', payload: title });
  };

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <div className="box">
      <TaskStats tasks={tasks} />
      <AddTaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <div className="container">
        <Header />
        <ProfilePanel />
        <TaskManager />
      </div>
    </StudentProvider>
  );
}

export default App;

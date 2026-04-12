import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import TodoListFilter from "./TodoListFilter";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    const newTask = { id: "todo-" + Date.now(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) return { ...task, completed: !task.completed };
      return task;
    });
    setTasks(updatedTasks);
  }

  const FILTER_MAP = {
    Todas: () => true,
    Ativas: (task) => !task.completed,
    Concluídas: (task) => task.completed,
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = Object.keys(FILTER_MAP).map((name) => (
    <TodoListFilter
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <TodoForm addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{tasks.length} tarefas restantes</h2>
      <ul className="todo-list stack-large">{taskList}</ul>
    </div>
  );
}

export default App;

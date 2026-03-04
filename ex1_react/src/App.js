import React, { useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import TodoListFilter from "./TodoListFilter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("Todas");

  function addTask(name) {
    const newTask = { id: "todo-" + Date.now(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
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

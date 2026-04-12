
import React, { useState, useEffect } from "react";

const MDN_CSS = (
  <style>{`
    body { background-color: #f5f5f5; font-family: sans-serif; }
    .todoapp { background: #fff; margin: 2rem auto; padding: 1.5rem; position: relative; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1); max-width: 550px; }
    .stack-large > * + * { margin-top: 2rem; }
    .todo-list { list-style: none; padding: 0; }
    .btn { padding: 0.8rem 1rem; border: 0.2rem solid #4d4d4d; cursor: pointer; text-transform: capitalize; background: white; font-weight: bold; }
    .btn__primary { color: #fff; background-color: #000; border-color: #000; width: 100%; display: block; margin-top: 1rem; }
    .btn__danger { color: #fff; background-color: #ca3c3c; border-color: #bd2130; }
    .todo-label { display: block; width: 100%; margin-bottom: 0.5rem; font-size: 1.2rem; }
    .input__lg { padding: 1rem; border: 0.2rem solid #000; width: 100%; font-size: 1.5rem; box-sizing: border-box; }
    .filters { display: flex; justify-content: space-between; gap: 10px; }
    .toggle-btn { flex: 1; border-color: #d2d2d2; }
    .toggle-btn[aria-pressed="true"] { border-color: #000; text-decoration: underline; }
    .btn-group { display: flex; gap: 10px; margin-top: 10px; }
    .c-cb { display: flex; align-items: center; gap: 10px; }
    .c-cb input { width: 25px; height: 25px; cursor: pointer; }
    .todo { margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
  `}</style>
);

const TodoForm = ({ addTask }) => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addTask(name);
    setName("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper"><label className="label__lg">O que precisa de ser feito?</label></h2>
      <input type="text" className="input input__lg" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
      <button type="submit" className="btn btn__primary btn__lg">Adicionar</button>
    </form>
  );
};

const Todo = ({ id, name, completed, toggleTaskCompleted, deleteTask, editTask }) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(id, newName);
    setEditing(false);
  };
  return (
    <li className="todo">
      {!isEditing ? (
        <div className="stack-small">
          <div className="c-cb">
            <input id={id} type="checkbox" defaultChecked={completed} onChange={() => toggleTaskCompleted(id)} />
            <label className="todo-label" htmlFor={id}>{name}</label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn" onClick={() => setEditing(true)}>Editar</button>
            <button type="button" className="btn btn__danger" onClick={() => deleteTask(id)}>Apagar</button>
          </div>
        </div>
      ) : (
        <form className="stack-small" onSubmit={handleSubmit}>
          <input className="input__lg" type="text" onChange={(e) => setNewName(e.target.value)} placeholder={name} />
          <div className="btn-group">
            <button type="button" className="btn" onClick={() => setEditing(false)}>Cancelar</button>
            <button type="submit" className="btn btn__primary">Guardar</button>
          </div>
        </form>
      )}
    </li>
  );
};

const FILTER_MAP = { Todas: () => true, Ativas: (t) => !t.completed, Concluídas: (t) => t.completed };
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function P03E04() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    const data = localStorage.getItem("tasks-mdn");
    if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks-mdn", JSON.stringify(tasks));
    document.title = `${tasks.filter(t => !t.completed).length} tarefas pendentes`;
  }, [tasks]);

  const addTask = (name) => setTasks([...tasks, { id: "todo-" + Date.now(), name, completed: false }]);
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const editTask = (id, newName) => setTasks(tasks.map(t => t.id === id ? { ...t, name: newName } : t));
  const toggleTaskCompleted = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo key={task.id} {...task} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask} />
  ));

  return (
    <div className="todoapp stack-large">
      {MDN_CSS}
      <h1>TodoMatic</h1>
      <TodoForm addTask={addTask} />
      <div className="filters btn-group">
        {FILTER_NAMES.map(name => (
          <button key={name} type="button" className="btn toggle-btn" aria-pressed={name === filter} onClick={() => setFilter(name)}>
            <span>{name}</span>
          </button>
        ))}
      </div>
      <h2 id="list-heading">{taskList.length} tarefas encontradas</h2>
      <ul className="todo-list stack-large">{taskList}</ul>
    </div>
  );
}
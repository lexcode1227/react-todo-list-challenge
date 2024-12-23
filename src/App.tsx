import "./App.css";
import Form from "./components/Form";
import TaskList from "./components/TaskList";

function App() {
  return (
    <main className="container">
      <h1 className="todoTitle">Todo List</h1>
      <section className="todoList">
        <Form />
        <TaskList />
      </section>
    </main>
  );
}

export default App;

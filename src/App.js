import "./App.css";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { useEffect, useState } from "react";
import { deleteTask, fetchTask, postTask, switchServerTask } from "./Helper/axiosHelper";

const hrWk = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [hr, setHr] = useState(0);

  useEffect(() => {
    getTaskFromServer();
  }, []);

  useEffect(() => {
    const totalHr = taskList.reduce((subttl, { hr }) => subttl + +hr, 0);
    setHr(totalHr);
  }, [taskList]);

  const getTaskFromServer = async () => {
    const data = await fetchTask();
    if (data.status === 'success') {
      setTaskList(data.result);
    }
  }

  const addTask = async (data) => {
    if (hrWk < hr + +data.hr) {
      return alert("Not enough time for this task");
    }
    const result = await postTask(data);
    result.success === 'success' && setTaskList(result.data);
    getTaskFromServer();
  };

  const taskSwitcher = async (_id, type) => {
    const data = await switchServerTask({ _id, type });
    data.status === "success" && getTaskFromServer();
  };

  const handleOnDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const data = await deleteTask(taskId);
      data.status === "success" && getTaskFromServer();
    }
  };


  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col text-center mt-5">
            <h1>Not To Do List</h1>
          </div>
        </div>

        <Form addTask={addTask} />

        <Table
          taskList={taskList}
          taskSwitcher={taskSwitcher}
          handleOnDelete={handleOnDelete}
        />

        <div className="row fw-bold">
          <div className="col">
            The total hours allocated for this week is
            <span id="totalHrs"> {hr}</span> Hours
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

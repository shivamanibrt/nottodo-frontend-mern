import "./App.css";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { useEffect, useState } from "react";
import { deleteTask, fetchTask, postTask } from "./Helper/axiosHelper";
const hrWk = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTaskFromServer()
  }, []);

  const getTaskFromServer = async () => {
    const data = await fetchTask();
    console.log(data)
    data.status === 'success' && setTaskList(data.result)
  }

  const hr = taskList.reduce((subttl, { hr }) => subttl + +hr, 0);

  const addTask = async (data) => {
    // if there is enought time for upcoming tast's hours
    if (hrWk < hr + +data.hr) {
      return alert("Not enought time for this task");
    }

    const result = await postTask(data);
    console.log(result)
    result.success === 'success' && getTaskFromServer();
  };

  const taskSwitcher = (id, type) => {
    const tempArg = taskList.map((item) => {
      if (item.id === id) {
        item.type = type;
      }

      return item;
    });

    setTaskList(tempArg);
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete this task?")) {
      const tempArg = taskList.filter((item) => item.id !== id);
      // setTaskList(tempArg);
      deleteTask(id)
    }
  };
  return (
    <div class="wrapper">
      <div class="container">
        {/* <!-- title --> */}
        <div class="row">
          <div class="col text-center mt-5">
            <h1>Not To Do List </h1>
          </div>
        </div>

        {/* <!-- form-area --> */}
        <Form addTask={addTask} />

        {/* <!-- list area --> */}
        <Table
          taskList={taskList}
          taskSwitcher={taskSwitcher}
          handleOnDelete={handleOnDelete}
        />

        {/* <!-- Total hrs area --> */}
        <div class="row fw-bold">
          <div class="col">
            The total hours allocated for this week is
            <span id="totalHrs"> {hr}</span> Hours
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

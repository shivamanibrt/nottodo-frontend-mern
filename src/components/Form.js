import React, { useState } from "react";
// import { reandmonStrGenerator } from "../utils";

export const Form = ({ addTask }) => {
  const [frmDt, setFrmDt] = useState({
    type: "entry",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmDt({
      ...frmDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addTask(frmDt);
  };

  return (
    <form onSubmit={handleOnSubmit} className="border p-3 rounded shadow-lg">
      <div class="row mt-3 g-2">
        <div class="col-md-6">
          <input
            onChange={handleOnChange}
            type="text"
            name="task"
            class="form-control task-input"
            required
            placeholder="Enter a task..."
          />
        </div>
        <div class="col-md-3">
          <input
            onChange={handleOnChange}
            type="number"
            name="hr"
            class="form-control hrs-input"
            min="1"
            required
            placeholder="Enter no. of hrs"
          />
        </div>
        <div class="col-md-3 text-center">
          <button class="btn btn-primary" type="submit" id="form-btn">
            <i class="fa-solid fa-plus"></i> Add New Task
          </button>
        </div>
      </div>
    </form>
  );
};

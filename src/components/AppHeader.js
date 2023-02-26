import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, SelectButton } from "./Button";
import TodoModal from "./TodoModal";
import { updateFilterStatus } from "../slices/todoSlice";

const AppHeader = () => {
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);

  const dispatch = useDispatch();
  const updateFilter = (e) => {
    setFilterStatus(e.target.value);

    dispatch(updateFilterStatus(e.target.value));
  };
  return (
    <div className="appHeader">
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add Task
      </Button>
      <SelectButton
        id="status"
        value={filterStatus}
        onChange={(e) => updateFilter(e)}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>

        <option value="complete">Complete</option>
      </SelectButton>
      <TodoModal
        type="add"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      ></TodoModal>
    </div>
  );
};

export default AppHeader;

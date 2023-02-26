import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "Update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    }else{
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task added successfully");
      }
      if (type === "Update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
        console.log("updating");
      }
      setModalOpen(false);
    }
  };
  return (
    modalOpen && (
      <div className="wrapper">
        <div className="modal__container">
          <div
            onClick={() => {
              setModalOpen(false);
            }}
            onKeyDown={() => {
              setModalOpen(false);
            }}
            tabIndex={0}
            role="button"
            className="closeButton"
          >
            <AiOutlineCloseCircle></AiOutlineCloseCircle>
          </div>
          <form
            className="form"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1 className="formTitle">
              {" "}
              {type === "Update" ? "Update" : "Add"} task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </label>

            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className="buttonContainer">
              <Button className="button button--primary" type="submit">
                {type === "Update" ? "Update" : "Add"} Task
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                onKeyDown={() => {
                  setModalOpen(false);
                }}
                className="button button--secondary"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TodoModal;

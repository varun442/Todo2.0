import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (initialFilterStatus === "all") {
      return true;
    }
    return item.status === initialFilterStatus;
  });
  return (
    <div className="content__wrapper">
      {filteredTodoList && filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })
      ) : (
        <p className="emptyText">No Todos Left</p>
      )}
    </div>
  );
};

export default AppContent;

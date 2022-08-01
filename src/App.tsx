import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useStore from "./store";

import "./index.css";
import { MainList } from "./Sortable";

function MainPage() {
  const [newTodo, setNewTodo] = useState("");
  const { items, addItem, setRoute, setItems } = useStore();

  const onAdd = () => {
    if (newTodo !== "") {
      addItem(uuidv4(), newTodo);
      setNewTodo("");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <button disabled={items.length === 0} onClick={() => setRoute("focus")}>
        Focus Mode
      </button>
      <h1 className="text-3xl font-bold text-center">One Thing at a Time</h1>
      <div className="flex justify-center pt-4">
        <textarea
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add Todos..."
        ></textarea>
      </div>
      <button
        className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
        onClick={onAdd}
      >
        Add +
      </button>
      <div>
        <button onClick={() => setItems([])}>Clear All</button>
      </div>
      <MainList />
    </div>
  );
}

function FocusPage() {
  const { setRoute, items, addItem, removeItem, setNote } = useStore();

  const [newTodo, setNewTodo] = useState("");
  const [index, setIndex] = useState(0);

  const notEmpty = items.length !== 0;

  const handleDone = () => notEmpty && removeItem(items[index].id);
  const handleSkip = () =>
    notEmpty && index < items.length - 1 ? setIndex(index + 1) : setIndex(0);

  const onAdd = () => {
    if (newTodo !== "") {
      addItem(uuidv4(), newTodo);
      setNewTodo("");
    }
  };

  return (
    <div>
      <button onClick={() => setRoute("main")}>Main Page</button>
      <div>
        <textarea
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add Todos..."
        ></textarea>
        <button onClick={onAdd}>Add +</button>
      </div>
      <h1 className="text-3xl font-bold">
        {notEmpty ? items[index].value : "You're All Done!"}
      </h1>

      {notEmpty && (
        <>
          <textarea
            value={items[index].note}
            onChange={(event) => setNote(items[index].id, event.target.value)}
            placeholder="Add Notes..."
          ></textarea>
          <button
            className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
            onClick={handleDone}
          >
            Done!
          </button>
          <button
            className="px-4 py-2 bg-transparent outline-none border-2 border-indigo-400 rounded text-indigo-500 font-medium active:scale-95 hover:bg-indigo-600 hover:text-white hover:border-transparent focus:bg-indigo-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
            onClick={handleSkip}
          >
            Skip
          </button>
        </>
      )}
    </div>
  );
}

const App = () => {
  const route = useStore((state) => state.route);
  return <>{route === "focus" ? <FocusPage /> : <MainPage />}</>;
};

export default App;

import React from "react";
import Navbar from "./Components/Navbar";
import { useState, useEffect,useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Checkbox from "./Components/Checkbox.";
import checkBoxContext from "./Context/CheckboxContext";

const App = () => {
  const [todo, setTodo] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [showFinished, setshowFinished] = useState(false);
  const [taskCount, setTaskCount] = useState(0);


  //useEffect fetchs the task that were stored and store them in todos and then we pass it to setTask to have newtasks
  useEffect(() => {
    let todos = localStorage.getItem("task");
    if (todos) {
      let tasks = JSON.parse(localStorage.getItem("task"));
      setTasks(tasks);
    }
  }, []);

  const handleFinish = () => {
    setshowFinished(!showFinished);
  };

  //Local Save Function saves the tasks to local storage as task identifier
  const LocalSave = () => {
    localStorage.setItem("task", JSON.stringify(Tasks));
  };

  //Simple handle change function for the text input
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  //Edit Button by passing event and Id to function from the call
  const handleEdit = (e, id) => {
    let task = Tasks.filter((i) => i.id === id); //filter the task whose id === id of parameter
    setTodo(task[0].todo); // setTodo is set to tasks first index and todo object
    let newTasks = Tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
    LocalSave();
  };
  const handleDelete = (e, id) => {
    let newTasks = Tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
    LocalSave();
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = Tasks.findIndex((item) => {
      return item.id === id;
    });
    let newTask = [...Tasks];
    newTask[index].isCompleted = !newTask[index].isCompleted;
    setTasks(newTask);
    LocalSave();
  };
 
  const handleAdd = () => {
    setTasks([
      ...Tasks,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
      },
    ]);
    setTodo("");
    
    LocalSave();  
  };
 
  return (
    <div>
      <checkBoxContext.Provider value={{showFinished,setshowFinished,handleFinish}}>
      <Navbar />
      <div className="container mx-auto my-9 rounded-xl  p-5 bg-slate-300 min-h-[85vh] md:w-1/2">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          ProTasker - Manage your tasks at eas
        </h1>
        <div className="addToDo flex flex-col gap-3 my-8">
          <h2 className="text-xl font-bold">Add a ToDo</h2>
          <input
            type="text"
            onChange={handleChange}
            className="min-h-4 w-full p-2 rounded-md "
            value={todo}
          />
          <button
            className="bg-violet-800 disabled:bg-violet-500 hover:bg-violet-950 p-2 py-1 min-h-1 text-white rounded-md "
            onClick={handleAdd}
            disabled={todo.length < 3}
          >
            Save
          </button>
        </div>
        <div className="todos my-5">
          <h1 className="font-bold text-xl">Your Todos</h1>
          <div className="finishbutton flex items items-center">
          <Checkbox/>
          
          <p>Show Finished</p>
          </div>
          {(Tasks.length === 0) && (
            <div className="my-6 text-xl text-gray-500 text-center">
              You have no pending tasks
            </div>
          )}
          {Tasks.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  className="todo flex justify-between md:w-1/2 w-10/12  my-4"
                  key={item.id}
                >
                  <div
                    className={item.isCompleted ? "line-through flex items-center" : "flex items-center"}
                  >
                    <input
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mx-4"
                      onChange={handleCheckbox}
                      type="checkbox"
                      name={item.id}
                    />
                   
                    <div className="text w-full ">{item.todo}</div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 min-h-1 text-white rounded-md mx-2"
                    >
                      <FaRegEdit/>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 min-h-1 text-white rounded-md mx-2"
                    >
                      <RiDeleteBin6Line/>
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      </checkBoxContext.Provider>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";

const PreviousTaskPage = () => {
  var [taskData, setTaskData] = useState(null);
  useEffect(() => {
    setTaskData(JSON.parse(localStorage.getItem("previousTaskData")));
  }, []);
  return (
    <div>
      <h1>Previous Task Page</h1>
      <h2>
        {taskData.map((task) => {
          return (
            <div>
              <h1>{task.uploadedImages}</h1>
              <h2>{task.taskDescription}</h2>
            </div>
          );
        })}
      </h2>
    </div>
  );
};

export default PreviousTaskPage;

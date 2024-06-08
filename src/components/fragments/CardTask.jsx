import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { DialogTask } from "@/components/fragments/DialogTask";
import { Button } from "@/components/ui/button";

const CardTask = () => {
  const { tasks, addTask, deleteTask, updateTask, completeTask } =
    useContext(TaskContext);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <>
      <DialogTask addTask={addTask} />
      {tasks
        .slice()
        .reverse()
        .map((task, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between p-5 bg-white rounded-xl"
          >
            <div className="flex flex-col justify-center gap-2 mb-2">
              <div>
                <h1 className="text-xl font-bold">{task.title}</h1>
                <p className="text-gray-400">
                  Dibuat pada {formattedDate(task.createdAt)}
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 text-base font-semibold capitalize">
                <p>{task.priority}</p>
                <p className="text-red-500">{formattedDate(task.deadline)}</p>
                <p
                  className={
                    task.progress === "selesai"
                      ? "text-green-500"
                      : "text-black"
                  }
                >
                  {task.progress}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4">
              <DialogTask task={task} updateTask={updateTask} />
              <Button
                variant="delete"
                className="text-red-500 border-red-500"
                onClick={() => deleteTask(task.id)}
              >
                Hapus
              </Button>
              <Button variant="complete" onClick={() => completeTask(task.id)}>
                Selesai
              </Button>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardTask;

import { TaskProvider } from "@/context/TaskContext";
import { Toaster } from "@/components/ui/sonner";
import CardTask from "@/components/fragments/CardTask";

function App() {
  return (
    <TaskProvider>
      <main className="w-4/5 px-20 py-10 mx-auto">
        <div className="flex flex-col justify-end gap-4">
          <CardTask />
          <Toaster />
        </div>
      </main>
    </TaskProvider>
  );
}

export default App;

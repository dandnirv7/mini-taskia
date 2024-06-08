import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/fragments/DatePicker";

export function DialogTask({ task, addTask, updateTask }) {
  const [data, setData] = useState({
    title: "",
    priority: "",
    deadline: "",
  });

  useEffect(() => {
    if (task) {
      setData({
        title: task.title,
        priority: task.priority,
        deadline: task.deadline,
      });
    }
  }, [task]);

  const handleValueChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task) {
      toast("Tugas berhasil diperbaharui");

      const updatedTask = {
        ...task,
        title: data.title,
        priority: data.priority,
        deadline: data.deadline,
      };

      updateTask(updatedTask);
    } else {
      toast("Tugas berhasil ditambahkan");

      const newTask = {
        id: `${uuidv4()}`,
        title: data.title,
        priority: data.priority,
        deadline: data.deadline,
        createdAt: new Date().toISOString(),
        progress: "belum selesai",
      };

      addTask(newTask);
    }

    setData({
      title: "",
      priority: "",
      deadline: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={task ? "text-blue-500 border-blue-500" : "bg-white"}
        >
          {task ? "Ubah" : "Tambah Tugas"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{task ? "Ubah Tugas" : "Tambah Tugas"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="grid grid-rows-3 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={data.title}
                  placeholder="Masukkan judul tugas"
                  className="col-span-3"
                  onChange={(e) => handleValueChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="priority">Prioritas</Label>
                <Select
                  value={data.priority}
                  onValueChange={(value) =>
                    handleValueChange("priority", value)
                  }
                >
                  <SelectTrigger id="priority" className="col-span-3">
                    <SelectValue value={data.priority} placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="rendah">Rendah</SelectItem>
                    <SelectItem value="sedang">Sedang</SelectItem>
                    <SelectItem value="tinggi">Tinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="deadline">Batas Waktu</Label>
                <DatePicker
                  date={data.deadline}
                  setDate={(value) => handleValueChange("deadline", value)}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5"></div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="submit">
              Kirim
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

DialogTask.propTypes = {
  task: PropTypes.object,
  addTask: PropTypes.func,
  updateTask: PropTypes.func,
};

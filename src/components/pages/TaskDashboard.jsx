import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import QuickAddTask from "@/components/molecules/QuickAddTask";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import TaskList from "@/components/organisms/TaskList";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

function BuggyComponent() {
  const obj = undefined;
  // This will crash:
  console.log(obj.someProp);

  return <div>This won't be rendered</div>;
}

const TaskDashboard = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [renderError, setRenderError] = useState(false);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll(),
      ]);

      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        task.category.toLowerCase() === selectedCategory;

      // Priority filter
      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;

      // Status filter
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "completed" && task.completed) ||
        (selectedStatus === "pending" && !task.completed);

      return (
        matchesSearch && matchesCategory && matchesPriority && matchesStatus
      );
    });
  }, [tasks, searchTerm, selectedCategory, selectedPriority, selectedStatus]);

  // Task counts for filters
  const taskCounts = useMemo(() => {
    const counts = {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
      categories: {},
      priorities: {
        high: tasks.filter((t) => t.priority === "high").length,
        medium: tasks.filter((t) => t.priority === "medium").length,
        low: tasks.filter((t) => t.priority === "low").length,
      },
    };

    categories.forEach((category) => {
      counts.categories[category.name.toLowerCase()] = tasks.filter(
        (t) => t.category.toLowerCase() === category.name.toLowerCase()
      ).length;
    });

    return counts;
  }, [tasks, categories]);

  // Task operations
  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
      console.error("Error adding task:", err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t.Id === taskId);
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
      });

      setTasks((prev) => prev.map((t) => (t.Id === taskId ? updatedTask : t)));

      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as pending");
      }
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleEditTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates);
      setTasks((prev) => prev.map((t) => (t.Id === taskId ? updatedTask : t)));
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks((prev) => prev.filter((t) => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={setSearchTerm}
        totalTasks={taskCounts.total}
        completedTasks={taskCounts.completed}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              selectedPriority={selectedPriority}
              selectedStatus={selectedStatus}
              onCategoryChange={setSelectedCategory}
              onPriorityChange={setSelectedPriority}
              onStatusChange={setSelectedStatus}
              taskCounts={taskCounts}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <QuickAddTask onAddTask={handleAddTask} categories={categories} />

              <button onClick={() => setRenderError(true)}>RenderError</button>
              {renderError && <BuggyComponent />}

              <TaskList
                tasks={filteredTasks}
                loading={loading}
                error={error}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                onRetry={loadData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;

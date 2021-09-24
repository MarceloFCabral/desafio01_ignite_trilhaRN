import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log("tasks array =");
  console.log(tasks);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      setTasks([...tasks, { id: new Date().getTime(), title: newTaskTitle }]);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        },
        { text: "Não" },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) task.title = taskNewTitle;
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        editTask={handleEditTask}
        tasks={tasks}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

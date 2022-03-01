import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskSameTitle = tasks.find((task) => {
      return task.title === newTaskTitle
    });
    if (taskSameTitle) {
      return Alert.alert('Task já cadastrada.', 'Você não pode cadastrar uma task com o mesmo nome');
    }
    setTasks([...tasks, {id: new Date().getTime(),
      title: newTaskTitle,
      done: false}]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((task) => {
      return task.id === id
    });
    if(task) {
      task.done = !task.done;
    }
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {
   Alert.alert('Remover item', 'Tem certeza que deseja remover este item?', [
     {
       style: 'cancel',
       text: 'Não'
     },
     {
      style: 'destructive',
      text: 'Sim',
      onPress: () => {
      const newTasks = tasks.filter((task) => {
        return task.id !== id;
      })
  
      setTasks(newTasks);
     }},
     
   ])
  }

  function handleEditTask(id: number, newTitle: string) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((task) => {
      return task.id === id
    });
    if(task) {
      task.title = newTitle;
    }
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
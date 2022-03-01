import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit.png'
import Icon from 'react-native-vector-icons/Feather';


export interface Task {
    id: number;
    title: string;
    done: boolean;
  }
interface TasksListProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newtitle: string) => void;
    index: number;
  }

export default function TaskItem({ index, task, editTask, toggleTaskDone, removeTask} : TasksListProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const textInputref = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);

    }
    function handleCancelEditing(){
        setNewTitle(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing(){
        editTask(task.id, newTitle);
        setIsEditing(false);
    }

    useEffect(() => {
        if(textInputref.current) {
            if(isEditing){
                textInputref.current.focus();
            } else {
                textInputref.current.blur();
            }
        }
    }, [isEditing])

  return (
      <View style={styles.container}>
    <View style={styles.infoContainer}>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => {toggleTaskDone(task.id)}}
              >
                <View 
                  testID={`marker-${index}`}
                  style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                
                <TextInput 
                value={newTitle} 
                onChangeText={setNewTitle} 
                editable={isEditing} 
                onSubmitEditing={handleSubmitEditing}
                style={task.done ? styles.taskTextDone : styles.taskText}
                ref={textInputref}
                />

              </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                   <TouchableOpacity onPress={handleCancelEditing}>
                      <Icon name="x" size={24} color="#b2b2b2" />
                   </TouchableOpacity> 
                ) : (
                    <TouchableOpacity onPress={handleStartEditing}>
                       <Image source={editIcon} />
                   </TouchableOpacity> 
                )}  
                <View style={styles.iconsDivider} />
                
                <TouchableOpacity disabled={isEditing} onPress={() => {removeTask(task.id)}}>
                       <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}} />
                   </TouchableOpacity> 
                
            </View>
            </View>
  )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    container : {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
       flex: 1,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
        justifyContent: "space-between"
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12
    }
  })

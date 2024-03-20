import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';

const App = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showNoTasks, setShowNoTasks] = useState(true);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const onChangeTextTitle = (text) => {
    setTitle(text);
  };

  const onChangeTextAbout = (text) => {
    setAbout(text);
  };

  const addTask = () => {
    if (title.trim() !== '' && about.trim() !== '') {
      const newTask = { title: title.trim(), about: about.trim() };
      setTasks([...tasks, newTask]);
      setTitle('');
      setAbout('');
      setShowNoTasks(false);
    }
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
  };

  const handleDelete = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(deleteIndex, 1);
    setTasks(updatedTasks);
    if (updatedTasks.length === 0) {
      setShowNoTasks(true);
    }
    setDeleteIndex(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTextTitle}
          value={title}
          placeholder="Title..."
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTextAbout}
          value={about}
          placeholder="About..."
          placeholderTextColor="gray"
        />
      </View>
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {tasks.length === 0 && showNoTasks && (
        <View style={styles.noTasksContainer}>
          <View style={styles.noTasksLines}></View>
          <Text style={styles.noTasksText}>No Tasks</Text>
          <View style={styles.noTasksLines}></View>
        </View>
      )}
      {tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <TouchableOpacity style={styles.optionButtonContainer}>
              <TouchableOpacity onPress={() => confirmDelete(index)} style={styles.optionButton}>
                <Text style={styles.optionButtonText}>✕</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <Text style={styles.taskAbout}>{task.about}</Text>
        </View>
      ))}
      <Modal visible={deleteIndex !== null} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Delete this task?</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setDeleteIndex(null)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1B1A17',
  },
  inputContainer: {
    marginBottom: 10,
    marginRight: 60,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    borderColor: '#FF8303',
    color: 'white',
    backgroundColor:'#1F1E1B',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    borderWidth: 2,
    borderColor: '#FF8303',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  plus: {
    fontSize: 50,
    color: '#FF8303',
  },
  noTasksContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noTasksLines: {
    backgroundColor: '#FF8303',
    height: 3,
    width: 100,
    marginBottom: 5,
    marginTop:6,
  },
  noTasksText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  taskContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 3,
    padding: 10,
    backgroundColor:'#1F1E1B',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize:20,
    color: 'white',
  },
  optionButtonContainer: {
    padding: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 3,
    padding: 8,
  },
  optionButtonText: {
    color: 'white',
    fontSize: 12,
  },
  taskAbout: {
    fontSize: 16,
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContainer: {
    backgroundColor: '#1B1A17',
    borderRadius: 10,
    padding: 60,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#FF8303',
    
  },
  modalText: {
    color: 'white',
    fontSize: 26,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 3,
    padding: 8,
    marginRight: 10,
    width:80,
   
  },
  modalButtonText: {
    color: 'white',
    fontSize: 15,
    textAlign:'center',
  },
});

export default App;

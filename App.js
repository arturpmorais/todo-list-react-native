import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Task from './components/Task';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const anySelected = () => taskItems.filter((item) => item.selected).length > 0;

  const addTask = () => {
    Keyboard.dismiss();
    setTaskItems(previousTaskItems => [
      ...previousTaskItems,
      {
        text: taskText,
        selected: false,
      },
    ]);
    setTaskText('');
  }

  const handleMainButtonClick = () => {
    if (anySelected())
      deleteSelectedItems();
    else if (taskText)
      addTask();
  }

  const toggleSelectTask = (index) => {
    const itemsCopy = taskItems.map((task, i) => {
      if (i === index)
        return { ...task, selected: !task.selected };
      else
        return task;
    })
    setTaskItems(itemsCopy);
  }

  const deleteSelectedItems = () => {
    const notSelectedItems = taskItems.filter(item => !item.selected);
    setTaskItems(notSelectedItems);
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  }

  return (
    <View style={darkMode ? styles.containerDark : styles.containerLight}>
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
          <Text style={darkMode ? styles.sectionTitleDark : styles.sectionTitleLight}>
            Today's tasks
          </Text>
          <TouchableOpacity onPress={() => toggleTheme()}>
            {
              darkMode ?
                <Icon
                  name='ios-sunny-outline'
                  type='ionicon'
                  color={'#FFF'}
                />
                :
                <Icon
                  name='ios-moon-outline'
                  type='ionicon'
                  color={'#000'}
                />
            }
          </TouchableOpacity>
        </View>
        <View styles={styles.items}>
          {
            taskItems.map((task, index) =>
              <TouchableOpacity key={index} onPress={() => toggleSelectTask(index)}>
                <Task
                  key={index}
                  message={task.text}
                  selected={task.selected}
                  darkMode={darkMode}
                />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={darkMode ? styles.inputDark : styles.inputLight}
          placeholder={'Write a task'}
          value={taskText}
          onChangeText={text => setTaskText(text)}
          placeholderTextColor={darkMode ? '#6F6F6F' : '#C0C0C0'}
        />
        <TouchableOpacity
          onPress={() => handleMainButtonClick()}
        >
          <View style={darkMode ? styles.addWrapperDark : styles.addWrapperLight}>
            {
              anySelected() ?
                <Icon
                  name='trash-bin-outline'
                  type='ionicon'
                  color={'#AD0303'}
                />
                :
                <Text style={darkMode ? styles.addTextDark : styles.addTextLight}>
                  +
                </Text>
            }
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#121212',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputLight: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    color: '#000',
  },
  inputDark: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#1F1B24',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    color: '#FFF',
  },
  addWrapperLight: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    color: '#000',
  },
  addWrapperDark: {
    width: 60,
    height: 60,
    backgroundColor: '#1F1B24',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    color: '#FFF',
  },
  addTextLight: {
    color: '#000',
    fontSize: 18,
  },
  addTextDark: {
    color: '#FFF'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

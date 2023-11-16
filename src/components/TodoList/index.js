import { useState } from 'react';
import styled, { css } from 'styled-components';
import TodoListItem from './TodoListItem';
import { device } from '../../styles/device';

const TodoListWrapper = styled.div`
    padding: 80px 20px 20px;
    width: calc(100vw - 200px);

    @media ${device.tablet} { 
        width: calc(100% - 80px);
    }

    @media ${device.mobile} {
        padding-top: 140px;
        width: calc(100% - 40px);
    }
`;

const Header = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AddItemWrapper = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    width: calc(100% - 120px);
    height: 30px;
`;

const ItemList = styled.ul`
    list-style: none;
    padding: 20px;
    background-color: #feff9c;

    ${({ $hide }) => $hide &&
        css`
            display: none;
        `
    };  
`;

const TODO_LIST_KEY = 'todoList';

export default function TodoList() {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || []);
  const [newTask, setNewTask] = useState('');
  const [id, setId] = useState(todoList.length > 0 ? Math.max(...todoList.map(item => item.id)) : 0);

  const getNextId = () => {
    const newId = id + 1;
    setId(newId);
    return newId;
  }
    
  const updateTodoList = updatedList => {
    setTodoList(updatedList);
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(updatedList));
  }

  const handleAdd = event => {
    event.preventDefault();

    const taskToAdd = { 
      id: getNextId(),
      title: newTask,
      complete: false,
    }

    updateTodoList([...todoList, taskToAdd]);
    setNewTask('');
  };
  
  const handleDelete = id => {
    updateTodoList(todoList.filter(item => item.id !== id));
  };

  const handleComplete = id => {
    updateTodoList(todoList.map(item => {
        if (item.id === id) {
            item.complete = !item.complete;
        }
        return item;
    }));
  };

  return (
    <TodoListWrapper>
        <Header>Todo List</Header>
        <AddItemWrapper onSubmit={handleAdd}>
            <Input type="text" placeholder="Add your task" value={newTask} onChange={(event) => setNewTask(event.target.value)}/>
            <button>Add Todo Item</button>
        </AddItemWrapper>
        <ItemList $hide={todoList.length === 0}>
            {todoList.map(({ id, title, complete}) => <TodoListItem key={id} id={id} title={title} complete={complete} handleDelete={handleDelete} handleComplete={handleComplete} />)}
        </ItemList>
    </TodoListWrapper>
  );
}

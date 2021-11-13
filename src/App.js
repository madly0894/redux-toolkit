import './App.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "./store/todo";
import {TodosIdsSelector, TodoSelector} from "./store/todo";

const initialState = {
    title: ''
};

function App() {
    const dispatch = useDispatch();
    const todos = useSelector(TodoSelector);
    const todosIds = useSelector(TodosIdsSelector);
    const [todo, setTodo] = useState(initialState);
    const [show, setShow] = useState(false);
    const isAdd = todos.some(t => t.title === todo.title);

    console.log(todo)

    const addTodo = () => {
        if (!isAdd && todo.title !== '') {
            dispatch(actions.addTodo(todo.title));
            setTodo(initialState);
        }
    };
    const updateTodo = () => {
        dispatch(actions.updateTodo(todo));
        onClose();
    };
    const deleteTodo = (e, obj) => {
        e.stopPropagation();
        const confirm = window.confirm('Are you sure to delete this todo?');

        if (confirm) {
            dispatch(actions.deleteTodo(obj.id));
            if (obj.id === todo.id) {
                setShow(false);
                setTodo(initialState);
            }
        }
    };
    const deleteAllTodos = () => {
        const confirm = window.confirm('Are you sure to delete all todos?');

        if (confirm) {
            dispatch(actions.deleteAllTodos(todosIds));
            setShow(false);
            setTodo(initialState);
        }
    };
    const resetTodo = () => {
        setTodo(prevTodo => ({ ...prevTodo, title: '' }));
    };
    const onChangeTodo = (e) => {
        setTodo(prevTodo => ({ ...prevTodo, title: e.target.value }));
    };
    const onSelectTodo = (obj) => {
        setTodo(obj);
        setShow(true);
    };
    const onClose = () => {
        setTodo(initialState);
        setShow(false);
    };

    return (
        <div>
            <div style={{ borderBottom: '1px solid black', padding: 10 }}>
                <div style={{ width: 300 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input type="text" placeholder="Title" onChange={onChangeTodo} value={todo.title} style={{ width: '100%', marginRight: 10 }}/>
                        <button onClick={() => show ? updateTodo() : addTodo()} style={{ marginRight: 4 }} disabled={isAdd || todo.title === ''}>{ show ? 'Update' : 'Add' }</button>
                        <button onClick={resetTodo} style={{ marginRight: 4 }} disabled={todo.title === ''}>Reset</button>
                        {show &&
                        <button onClick={onClose}>
                            Close
                        </button>
                        }
                    </div>
                    {isAdd && (
                        <div style={{ color: 'red', fontSize: 12, marginTop: 2 }}>
                            You cannot add and update the same title.
                        </div>
                    )}
                </div>

                <button style={{ marginTop: 10 }} disabled={todos.length === 0} onClick={deleteAllTodos}>Delete All</button>
            </div>

            {
                todos.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0, marginTop: 0 }}>
                        {todos.map((item, index) => (
                            <li
                                key={item.id}
                                style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', padding: 10, cursor: 'pointer' }}
                                onClick={() => onSelectTodo(item)}
                            >
                                <div>
                                    {index + 1}. {item.title}
                                </div>
                                <div>
                                    <button onClick={(e) => deleteTodo(e, item)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                        No data
                    </div>
                )
            }
        </div>
    );
}

export default App;

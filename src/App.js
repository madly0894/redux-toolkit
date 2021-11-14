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
    const [theme, setTheme] = useState(false);
    const isAdd = todos.some(t => t.title === todo.title);

    const addTodo = () => {
        if (!isAdd && todo.title !== '') {
            dispatch(actions.addTodo(todo.title));
            setTodo(initialState);
        }
    };
    const addRandomTodos = () => {
        dispatch(actions.addManyTodo());
    }
    const updateTodo = () => {
        if (!isAdd && todo.title !== '') {
            dispatch(actions.updateTodo(todo));
            onClose();
        }
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
            dispatch(actions.deleteManyTodos(todosIds));
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
    const changeTheme = () => {
        setTheme(prevTheme => !prevTheme);

        if (theme) {
            document.body.style.filter = 'none'
            document.body.style.backgroundColor = '#fff'
        } else {
            document.body.style.filter = 'invert(1)'
            document.body.style.backgroundColor = '#000'
        }
    }

    return (
        <div className="App">
            <div style={{ borderBottom: '1px solid grey', paddingInline: 10, height: 88, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Title"
                                onChange={onChangeTodo}
                                value={todo.title}
                                style={{ marginRight: 4, width: 300 }}
                                onKeyPress={(e) => e.key === 'Enter' ? show ? updateTodo() : addTodo() : undefined}
                            />
                            <div>
                                <button onClick={() => show ? updateTodo() : addTodo()} style={{ marginRight: 4 }} disabled={isAdd || todo.title === ''}>{ show ? 'Update' : 'Add' } title</button>
                                <button onClick={resetTodo} style={{ marginRight: 4 }} disabled={todo.title === ''}>Reset</button>
                                {show &&
                                <button onClick={onClose}>
                                    Close
                                </button>
                                }
                            </div>
                        </div>
                        {isAdd && (
                            <div style={{ color: 'red', fontSize: 12, marginTop: 2 }}>
                                You cannot add and update the same title.
                            </div>
                        )}
                    </div>

                    <div>
                        <button onClick={changeTheme}>
                            { theme ? 'Light' : 'Dark' } theme
                        </button>
                    </div>
                </div>

                <div>
                    <button style={{ marginRight: 4 }} onClick={addRandomTodos}>Add 100 random title</button>
                    <button style={{ marginTop: 10 }} disabled={todos.length === 0} onClick={deleteAllTodos}>Delete All</button>
                </div>
            </div>

            {
                todos.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0, marginTop: 0 }}>
                        {todos.map((item, index) => (
                            <li
                                key={item.id}
                                style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid grey', padding: 10, cursor: 'pointer', backgroundColor: todo.id === item.id && 'rgba(0, 0, 0, 0.05' }}
                                onClick={() => onSelectTodo(item)}
                            >
                                <div title={item.title}>
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

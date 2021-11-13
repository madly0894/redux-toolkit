import './App.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "./store/todo";
import {TodosIdsSelector, TodoSelector} from "./store/todo";

const initialState = {
    id: new Date().getTime(),
    title: ''
};

function App() {
    const dispatch = useDispatch();
    const todos = useSelector(TodoSelector);
    const todosIds = useSelector(TodosIdsSelector);
    const [todo, setTodo] = useState(initialState);
    const [checkedAll, setCheckedAll] = useState(false);
    const [show, setShow] = useState(false);
    const isAdd = todos.some(t => t.title === todo.title);

    const addTodo = () => {
        if (!isAdd && todo.title !== '') {
            dispatch(actions.addTodo({
                id: new Date().getTime(),
                title: todo.title
            }));
            setTodo(initialState);
        }
    };
    const updateTodo = () => {
        dispatch(actions.updateTodo(todo));
        onClose();
    };
    const deleteTodo = (id) => {
        const confirm = window.confirm('Are you sure to delete this todo?');

        if (confirm) {
            dispatch(actions.deleteTodo(id));
        }
    };
    const deleteAllTodos = () => {
        const confirm = window.confirm('Are you sure to delete all todos?');

        if (confirm) {
            dispatch(actions.deleteAllTodos(todosIds));
            setCheckedAll(false);
        }
    };
    const onChangeTodo = (e) => {
        setTodo(prevState => ({
            ...prevState,
            title: e.target.value
        }));
    };
    const onSelectAllTodos = (e) => {
        setCheckedAll(e.target.checked);
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
        <div className="App">
            <div style={{ width: 300 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input type="text" placeholder="Title" onChange={onChangeTodo} value={todo.title} style={{ width: '100%', marginRight: 10 }}/>
                    <button onClick={() => show ? updateTodo() : addTodo()} disabled={isAdd}>{ show ? 'Update' : 'Add' }</button>
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
                {
                    todo.title.length === 0 && (
                        <div style={{ color: 'grey', fontSize: 12, marginTop: 2 }}>
                            You cannot add and update empty title.
                        </div>
                    )
                }
            </div>

            <div style={{ width: 300, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <input type="checkbox" checked={checkedAll} onChange={onSelectAllTodos} disabled={todos.length === 0} style={{ margin: 0 }} />
                {checkedAll && <button onClick={deleteAllTodos}>Delete All</button>}
            </div>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {todos.map((item, index) => (
                    <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', padding: 10 }}>
                        <div onClick={() => onSelectTodo(item)} style={{ textDecoration: checkedAll && 'line-through' }}>
                            {index + 1}. {item.title}
                        </div>
                        <div>
                            <button onClick={() => deleteTodo(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

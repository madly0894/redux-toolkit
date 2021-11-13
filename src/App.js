import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "./store/todo";
import {TodoSelector} from "./store/todo";

const initialState = {
    id: new Date().getTime(),
    title: ''
};

function App() {
    const dispatch = useDispatch();
    const todos = useSelector(TodoSelector);
    const [todo, setTodo] = useState(initialState);
    const [show, setShow] = useState(false);
    const isAdd = todos.some(t => t.title === todo.title) && todo.title !== '';

    const addTodo = () => {
        if (!isAdd) {
            dispatch(actions.addTodo(todo));
            setTodo(initialState);
        }
    };
    const updateTodo = (id) => {
        dispatch(actions.updateTodo({
            id,
            title: todo.title
        }));
    };
    const deleteTodo = (id) => {
        const confirm = window.confirm('Are you sure to delete this todo?');

        if (confirm) {
            dispatch(actions.deleteTodo(id));
        }
    };
    const onChangeTodo = (e) => {
        setTodo({
            id: new Date().getTime(),
            title: e.target.value
        });
    };
    const onSelectTodo = (obj) => {
        setTodo(obj);
        setShow(true);
    };

    return (
        <div className="App">
            <div>
                <input type="text" onChange={onChangeTodo} value={todo.title}/>&nbsp;
                <button onClick={() => show ? updateTodo(todo) : addTodo(todo)} disabled={isAdd}>{ show ? 'Update' : 'Add' }</button>
                {show &&
                <button onClick={() => {
                    setTodo(initialState);
                    setShow(false);
                }}>
                    Close
                </button>
                }
            </div>
            {isAdd && (
                <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                   We cannot add and update the same title.
                </div>
            )}

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {todos.map((item, index) => (
                    <li key={item.id} style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', padding: 10}}>
                        <div onClick={() => onSelectTodo(item)}>
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

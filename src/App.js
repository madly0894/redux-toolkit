import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "./store/todo";

function App() {
    const dispatch = useDispatch();
    const todo = useSelector(({todo}) => todo);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);

    const addTodo = () => {
        if (value !== '') {
            dispatch(actions.addTodo(value));
            setValue('');
        }
    };
    const updateTodo = (id) => {
        dispatch(actions.updateTodo({
            id,
            title: value
        }));
    };
    const deleteTodo = (id) => {
        dispatch(actions.deleteTodo(id));
    };

    return (
        <div className="App">
            <input type="text" onChange={(e) => setValue(e.target.value)} value={value}/>
            <button onClick={addTodo} disabled={show}>Add</button>

            <ul>
                {todo.map((item, index) => (
                    <li key={item.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div onClick={() => {
                            setValue(item.title);
                            setShow(index);
                        }}>
                            {index + 1} / {item.title}
                        </div>
                        <div>
                            {show === index && <button onClick={() => updateTodo(item.id)}>Update</button>}
                          <button onClick={() => deleteTodo(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

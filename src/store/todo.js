import {createAsyncThunk, createEntityAdapter, createSlice, nanoid} from "@reduxjs/toolkit";

// const createTodoThunk = createAsyncThunk('todo/create', async (params, { dispatch, getState, rejectWithValue }) => {
//     try {
//         const response = await axios.get('dada');
//         const data = await response.data;
//
//         return data;
//     } catch (ex) {
//         return rejectWithValue(ex.response.data);
//     }
// });

// const initialState = {
//     id: new Date().getTime(),
//     title: ''
// }

const todoAdapter = createEntityAdapter({
    // sortComparer: (a, b) => b.id - a.id
});

export const {selectAll: TodoSelector, selectIds: TodosIdsSelector} = todoAdapter.getSelectors(({todo}) => todo);

const initialState = todoAdapter.getInitialState({
    loading: false,
});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                // // state.push({
                // //     id: Math.random(),
                // //     title: action.payload
                // // });
                todoAdapter.setOne(state, action.payload);
            },
            prepare: title => ({
                payload: {
                    id: nanoid(),
                    title
                }
            })
        },
        addManyTodo: (state) => {
            const arr = [];

            for (let i = 0; i < 100; i++) {
                arr.push({
                    id: nanoid(),
                    title: nanoid()
                })
            }

            todoAdapter.setMany(state, arr);
        },
        updateTodo: (state, action) => {
            // const index = state.findIndex(x => x.id === action.payload.id);
            //
            // state[index].title = action.payload.title;
            todoAdapter.upsertOne(state, action.payload);
        },
        deleteTodo: (state, action) => {
            // const index = state.findIndex(x => x.id === action.payload);
            //
            // state.splice(index, 1);
            todoAdapter.removeOne(state, action.payload);
        },
        deleteManyTodos: state => {
            todoAdapter.setAll(state, []);
        },
    },
    extraReducers: {
        // [createTodoThunk.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [createTodoThunk.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     entityAdapter.setAll(state, action.payload);
        // },
        // [createTodoThunk.rejected]: (state, action) => {
        //     state.loading = false;
        // },
    }
});

export const {addTodo, addManyTodo, deleteTodo, updateTodo, deleteManyTodos} = todoSlice.actions

export default todoSlice.reducer;
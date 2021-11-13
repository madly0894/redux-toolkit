import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const initialState = [
    {id: 1, title: 'Yaver'},
    {id: 2, title: 'Vugar'}
];


const createTodoThunk = createAsyncThunk('todo/create', async (params, { dispatch, getState, rejectWithValue }) => {
    try {
        const response = await axios.get('dada');
        const data = await response.data;

        return data;
    } catch (ex) {
        return rejectWithValue(ex.response.data);
    }
});

const entityAdapter = createEntityAdapter({});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: Math.random(),
                title: action.payload
            });
        },
        deleteTodo: (state, action) => {
            const index = state.findIndex(x => x.id === action.payload);

            state.splice(index, 1);
        },
        updateTodo: (state, action) => {
            const index = state.findIndex(x => x.id === action.payload.id);

            state[index].title = action.payload.title;
        },
    },
    extraReducers: {
        [createTodoThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [createTodoThunk.fulfilled]: (state, action) => {
            state.loading = false;
            entityAdapter.setAll(state, action.payload);
        },
        [createTodoThunk.rejected]: (state, action) => {
            state.loading = false;
        },
    }
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer;
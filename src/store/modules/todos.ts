import axios, { AxiosResponse } from 'axios';
import { ITodo } from '@/entities/ITodo';
import { TodoMapper } from '@/persistence/mapper/TodoMapper'

export interface State {
    todos: ITodo[];
    todo: ITodo | null;
    limTodos: ITodo[];
}

const Todos = {
    state: () => ({
        todos: [] as ITodo[],
        todo: null as ITodo | null,
        limTodos: [] as ITodo[]
    }),
    getters: {
        allTodos: (state: State) => state.todos,
        limTodos: (state: State) => state.limTodos
    },
    mutations: {
        setTodos(state: State, payload: ITodo[]) {
            state.todos = payload;
        },
        setTodo(state: State, payload: ITodo) {
            state.todo = payload
        },
        setLimTodos(state: State, payload: ITodo[]) {
            state.limTodos = payload
        }
    },
    actions: {
        async fetchTodos(context: {commit: (arg0: string, arg1: ITodo[]) => void}) {
            const response: AxiosResponse = await axios.get
            ('https://wong801todoapi.herokuapp.com/api/todos');
            const todo = TodoMapper(response)
            await context.commit('setTodos', todo);
            return todo;
        },
        async addTodo(context: any, payload: {
            title: string,
            desc: string
        }) {
            const response: AxiosResponse = await axios.post
            ('https://wong801todoapi.herokuapp.com/api/todos', { ...payload });
            await context.commit('newTodo', response.data)
        },
        async deleteTodo(context: any, payload: {
            id: string
        }) {
            const response: AxiosResponse = await axios.delete
            (`https://wong801todoapi.herokuapp.com/api/todos/${payload}`);
            return response 
        },
        async editTodo(context: any, payload: {
            id: string,
            title: string,
            desc: string
        }) {
            const editedTodo = {
                title: payload.title,
                desc: payload.desc
            }
            const response: AxiosResponse = await axios.put
            (`https://wong801todoapi.herokuapp.com/api/todos/${payload.id}`, { ...editedTodo })
            return response
        },
        async limitTodos(context: {commit: (arg0: string, arg1: ITodo[]) => void}, payload: {
            limit: number
        }) {
            const response: AxiosResponse = await axios.get
            (`https://wong801todoapi.herokuapp.com/api/todos/${payload}`)
            const todo = TodoMapper(response)
            await context.commit('setLimTodos', todo);
            return todo;
        }
    }
}

export default Todos;
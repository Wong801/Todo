import axios, { AxiosResponse } from 'axios';
import { IHope } from '@/entities/IHope';
import { HopeMapper } from '@/persistence/mapper/HopeMapper'

export interface State {
    hopes: IHope[];
    hope: IHope | null;
    limHopes: IHope[];
}

const Hopes = {
    state: () => ({
        hopes: [] as IHope[],
        hope: null as IHope | null,
        limHopes: [] as IHope[]
    }),
    getters: {
        allHopes: (state: State) => state.hopes,
        limHopes: (state: State) => state.limHopes
    },
    mutations: {
        setHopes(state: State, payload: IHope[]) {
            state.hopes = payload;
        },
        setHope(state: State, payload: IHope) {
            state.hope = payload
        },
        setLimHopes(state: State, payload: IHope[]) {
            state.limHopes = payload
        }
    },
    actions: {
        async fetchHopes(context: {commit: (arg0: string, arg1: IHope[]) => void}) {
            const response: AxiosResponse = await axios.get
            ('https://wong801simpleapi.herokuapp.com/api/hopes');
            const hope = HopeMapper(response)
            await context.commit('setHopes', hope);
            return hope;
        },
        async addHope(context: any, payload: {
            from: string,
            to: string,
            hope: string
        }) {
            const response: AxiosResponse = await axios.post
            ('https://wong801simpleapi.herokuapp.com/api/hopes', { ...payload });
            await context.commit('newTodo', response.data)
        },
        async deleteHope(context: any, payload: {
            id: string
        }) {
            const response: AxiosResponse = await axios.delete
            (`https://wong801simpleapi.herokuapp.com/api/hopes${payload}`);
            return response 
        },
        async editHope(context: any, payload: {
            id: string,
            from: string,
            to: string,
            hope: string
        }) {
            const editedHope = {
                from: payload.from,
                to: payload.to,
                hope: payload.hope
            }
            const response: AxiosResponse = await axios.put
            (`https://wong801simpleapi.herokuapp.com/api/hopes${payload.id}`, { ...editedHope })
            return response
        },
        async limitHopes(context: {commit: (arg0: string, arg1: IHope[]) => void}, payload: {
            limit: number
        }) {
            const response: AxiosResponse = await axios.get
            (`https://wong801simpleapi.herokuapp.com/api/hopes${payload}`)
            const hope = HopeMapper(response)
            await context.commit('setLimHopes', hope);
            return hope;
        }
    }
}

export default Hopes;
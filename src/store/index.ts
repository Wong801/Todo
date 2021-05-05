import { createStore } from 'vuex'
import Todos from '@/store/modules/todos'

export const store = createStore<any>({
  modules: {
    Todos
  }
})

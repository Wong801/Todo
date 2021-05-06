import { createStore } from 'vuex'
import Todos from '@/store/modules/todos'
import Hopes from '@/store/modules/hopes'

export const store = createStore<any>({
  modules: {
    Todos,
    Hopes
  }
})

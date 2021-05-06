<template>
  <div v-if="loading" class="min-h-screen">
    <h1 class="text-4xl font-bold text-center py-8 bg-blue border-b-2">To Do List</h1>
    <form class="my-6 m-auto w-4/5 flex border rounded-xl" @submit="searchTodo">
      <input type="search" placeholder="Search Todos..." v-model="keyword" class="w-full text-center h-8 py-4 rounded-xl">
      <input type="submit" value="Search" class="w-1/5 rounded-xl cursor-pointer">
    </form>
    <button class="m-4 mb-6 border w-52 h-16 bg-gray-300 rounded-lg font-bold text-xl" @click="newTodo">Create new Todo</button>
    <label for="select">Set Limit: </label>
    <select v-model="limit" class="w-20" @change="setLimit">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option :value="allTodos.length">{{ allTodos.length }}</option>
    </select>
    <div v-show="searchResult.length > 0">
      <h1 class="m-4 text-2xl font-lg">Search Result:</h1>
      <div class="grid grid-cols-2 grid-gap-4 md:grid-cols-4">
      <div v-for="(todo, index) in searchResult" :key="todo._id">
        <div class="border max-w-md m-4 rounded-lg">
          <h1 class="py-2 text-center text-xl font-bold rounded-t-lg bg-blue">{{ index + 1 }}</h1>
          <h1 class="text-center font-bold text-2xl">{{ todo.title }}</h1>
          <p class="p-2">{{ todo.desc }}</p>
          <p class="p-2" v-if="todo.isCompleted">This task is completed</p>
          <p class="p-2" v-else>This task is not completed yet</p>
          <p class="p-2">Created at: {{ todo.createdAt }}</p>
          <div class="flex justify-evenly py-4">
            <button class="border w-20 py-2" @click="editTodo(todo._id)">Edit</button>
            <button class="border w-48 py-2" @click="isComplete(todo._id)">
              <p v-if="todo.isCompleted">
                Mark as not complete
              </p>
              <p v-else>
                Mark as complete
              </p>
            </button>
            <button class="border w-20 py-2" @click="deleteTodo(todo._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div v-if="limTodos.length > 0">
      <div class="grid grid-cols-2 grid-gap-4 md:grid-cols-4">
        <div v-for="(todo, index) in limTodos" :key="todo._id">
          <div class="border max-w-md m-4 rounded-lg">
            <h1 class="py-2 text-center text-xl font-bold rounded-t-lg bg-blue">{{ index + 1 }}</h1>
            <h1 class="text-center font-bold text-2xl">{{ todo.title }}</h1>
            <p class="p-2">{{ todo.desc }}</p>
            <p class="p-2" v-if="todo.isCompleted">This task is completed</p>
            <p class="p-2" v-else>This task is not completed yet</p>
            <p class="p-2">Created at: {{ todo.createdAt }}</p>
            <div class="flex justify-evenly py-4">
              <button class="border w-20 py-2" @click="editTodo(todo._id)">Edit</button>
              <button class="border w-48 py-2" @click="isComplete(todo._id)">
                <p v-if="todo.isCompleted">
                  Mark as not complete
                </p>
                <p v-else>
                  Mark as complete
                </p>
              </button>
              <button class="border w-20 py-2" @click="deleteTodo(todo._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="grid md:grid-cols-2 grid-gap-4 xl:grid-cols-4 lg:grid-cols-3">
        <div v-for="(todo, index) in allTodos" :key="todo._id">
          <div class="border max-w-md m-4 rounded-lg">
            <h1 class="py-2 text-center text-xl font-bold rounded-t-lg bg-blue">{{ index + 1 }}</h1>
            <h1 class="text-center font-bold text-xl md:text-2xl">{{ todo.title }}</h1>
            <p class="p-2 text-sm md:text-base">{{ todo.desc }}</p>
            <p class="p-2 text-sm md:text-base" v-if="todo.isCompleted">This task is completed</p>
            <p class="p-2 text-sm md:text-base" v-else>This task is not completed yet</p>
            <p class="p-2 text-sm md:text-base">Created at: {{ todo.createdAt }}</p>
            <div class="flex justify-evenly py-4">
              <button class="border w-20 py-2" @click="editTodo(todo._id)">Edit</button>
              <button class="border w-48 py-2" @click="isComplete(todo._id)">
                <p v-if="todo.isCompleted">
                  Mark as not complete
                </p>
                <p v-else>
                  Mark as complete
                </p>
              </button>
              <button class="border w-20 py-2" @click="deleteTodo(todo._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddTodo @close-add-todo="newTodo" @add-todo="addNewTodo" v-show="toggleAddTodo" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70"/>
    <div v-if="toggleEditTodo">
      <EditTodo @close-edit-todo="editTodo" @edit-todo="changeTodo" :todo="todo" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70"/>
    </div>
  </div>
  <div v-else>
    <div class="fixed overflow-x-hidden overflow-y-auto inset-0 flex flex-col justify-center items-center z-50 bg-gray-50 cursor-wait">
      <h1 class="text-4xl font-lg">Loading...</h1>
      <h1 class="text-4xl font-lg">Welcome to my project :D</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store';
import AddTodo from '@/components/todo/AddTodo.vue';
import EditTodo from '@/components/todo/EditTodo.vue'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      loading: false,
      toggleAddTodo: false,
      toggleEditTodo: false,
      idTodo: '' as string,
      keyword: '' as string,
      search: '' as string,
      limit: '' as string
    }
  },
  components: {
    AddTodo,
    EditTodo
  },
  methods: {
    newTodo() {
      this.toggleAddTodo = !this.toggleAddTodo
    },
    isComplete(id : string) {
      let todos: Array<Object> = this.allTodos
      todos.forEach((todo: any) => {
        if(todo._id === id) {
          todo.isCompleted = !todo.isCompleted
        }
      })
    },
    addNewTodo(newTodo: Object) {
      store.dispatch('addTodo', newTodo)
      .then(() => location.reload())
    },
    deleteTodo(id: string) {
      store.dispatch('deleteTodo', id)
      .then(() => location.reload())
    },
    editTodo(id: string) {
      this.toggleEditTodo = !this.toggleEditTodo
      this.idTodo = id
    },
    changeTodo(editedTodo: Object,) {
      const changedTodo = {
        id: this.idTodo,
        ...editedTodo
      }
      store.dispatch('editTodo', changedTodo)
      .then(() => location.reload())
    },
    searchTodo(e: Event) {
      e.preventDefault()
      this.search = this.keyword
    },
    setLimit(e: Event) {
      e.preventDefault();
      const param: number = parseInt(this.limit) 
      store.dispatch('limitTodos', param)
    } 
  },
  computed: {
    allTodos() {
      return store.getters.allTodos
    },
    limTodos() {
      return store.getters.limTodos
    },
    todo() {
      let todos: Array<Object> = this.allTodos
      let id: string = this.idTodo
      if(id.length > 0) {
        return todos.find((todo: any) => todo._id === id)
      } else {
        return ''
      }
    },
    searchResult() {
      let todos: Array<Object> = this.allTodos
      let keyword: string = this.search
      if(keyword === '') {
        return ''
      }
      return todos.filter((todo: any) => todo.title.toLowerCase().match(keyword.toLowerCase()))
    }
  },
  async created() {
    setTimeout(async() => {
      this.loading = await store.dispatch('fetchTodos');
    }, 2000)
  }
});
</script>

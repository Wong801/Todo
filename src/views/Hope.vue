<template>
  <div v-if="loading" class="min-h-screen">
    <h1 class="text-4xl font-bold text-center py-8 bg-blue border-b-2">Wall of Hopes</h1>
    <form class="my-6 m-auto w-4/5 flex border rounded-xl" @submit="searchTodo">
      <input type="search" placeholder="Search who write the hopes..." v-model="keyword" class="w-full text-center h-8 py-4 rounded-xl">
      <input type="submit" value="Search" class="w-1/5 rounded-xl cursor-pointer">
    </form>
    <button class="m-4 mb-6 border w-52 h-16 bg-gray-300 rounded-lg font-bold text-xl" @click="newHope">Make new Hope</button>
    <label for="select">Set Limit: </label>
    <select v-model="limit" class="w-20" @change="setLimit">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option :value="allHopes.length">{{ allHopes.length }}</option>
    </select>
    <div v-show="searchResult.length > 0">
      <h1 class="m-4 text-2xl font-lg">Search Results:</h1>
      <div class="grid md:grid-cols-2 grid-gap-4 xl:grid-cols-4 lg:grid-cols-3">
        <div v-for="(hope, index) in searchResult" :key="hope._id">
          <div class="border max-w-md m-4 rounded-lg">
            <h1 class="py-2 text-center text-xl font-bold rounded-t-lg bg-blue">{{ index + 1 }}</h1>
            <h1 class="text-center font-bold text-xl md:text-2xl">From: {{ hope.from }}</h1>
            <h1 class="text-center font-bold text-xl md:text-2xl">To: {{ hope.to }}</h1>
            <p class="p-2 text-sm md:text-base">Hope: {{ hope.hope }}</p>
            <p class="p-2 text-sm md:text-base">Created at: {{ hope.createdAt }}</p>
            <div class="flex justify-evenly py-4">
              <button class="border w-20 py-2" @click="edithope(hope._id)">Edit</button>
              <button class="border w-20 py-2" @click="deletehope(hope._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="limHopes.length > 0">
      <div class="grid md:grid-cols-2 grid-gap-4 xl:grid-cols-4 lg:grid-cols-3">
        <div v-for="(hope, index) in limHopes" :key="hope._id">
          <div class="border max-w-md m-4 rounded-lg">
            <h1 class="py-2 text-center text-xl font-bold rounded-t-lg bg-blue">{{ index + 1 }}</h1>
            <h1 class="text-center font-bold text-xl md:text-2xl">From: {{ hope.from }}</h1>
            <h1 class="text-center font-bold text-xl md:text-2xl">To: {{ hope.to }}</h1>
            <p class="p-2 text-sm md:text-base">Hope: {{ hope.hope }}</p>
            <p class="p-2 text-sm md:text-base">Created at: {{ hope.createdAt }}</p>
            <div class="flex justify-evenly py-4">
              <button class="border w-20 py-2" @click="editHope(hope._id)">Edit</button>
              <button class="border w-20 py-2" @click="deleteHope(hope._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="grid md:grid-cols-2 grid-gap-4 xl:grid-cols-4 lg:grid-cols-3">
        <div v-for="(hope, index) in allHopes" :key="hope._id">
          <div class="border max-w-md m-4 rounded-lg">
            <h1 class="py-2 text-center text-xl font-bold rounded-t-lg bg-blue">{{ index + 1 }}</h1>
            <h1 class="text-center font-bold text-xl md:text-2xl">From: {{ hope.from }}</h1>
            <p class="p-2 text-sm md:text-base">To: {{ hope.to }}</p>
            <p class="p-2 text-sm md:text-base">Hope: {{ hope.hope }}</p>
            <p class="p-2 text-sm md:text-base">Created at: {{ hope.createdAt }}</p>
            <div class="flex justify-evenly py-4">
              <button class="border w-20 py-2" @click="editHope(hope._id)">Edit</button>
              <button class="border w-20 py-2" @click="deleteHope(hope._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddHope @close-add-hope="newHope" @add-hope="addNewHope" v-show="toggleAddHope" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70"/>
    <div v-if="toggleEditHope">
      <EditHope @close-edit-hope="editHope" @edit-hope="changeHope" :hopes="hopes" class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70"/>
    </div>
  </div>
  <div v-else>
    <div class="fixed overflow-x-hidden overflow-y-auto inset-0 flex flex-col justify-center items-center z-50 bg-gray-50 cursor-wait">
      <h1 class="text-4xl font-lg">Loading...</h1>
      <h1 class="text-4xl font-lg">Welcome to Wall of Hopes :'D</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store';
import AddHope from '@/components/hope/AddHope.vue';
import EditHope from '@/components/hope/EditHope.vue'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      loading: false,
      toggleAddHope: false,
      toggleEditHope: false,
      idHope: '' as string,
      keyword: '' as string,
      search: '' as string,
      limit: '' as string
    }
  },
  components: {
    AddHope,
    EditHope
  },
  methods: {
    newHope() {
      this.toggleAddHope = !this.toggleAddHope
    },
    addNewHope(newTodo: Object) {
      store.dispatch('addHope', newTodo)
      .then(() => location.reload())
    },
    deleteHope(id: string) {
      store.dispatch('deleteHope', id)
      .then(() => location.reload())
    },
    editHope(id: string) {
      this.toggleEditHope = !this.toggleEditHope
      this.idHope = id
    },
    changeHope(editedHope: Object,) {
      const changedHope = {
        id: this.idHope,
        ...editedHope
      }
      store.dispatch('editHope', changedHope)
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
    allHopes() {
      return store.getters.allHopes
    },
    limHopes() {
      return store.getters.limHopes
    },
    hopes() {
      let hopes: Array<Object> = this.allHopes
      let id: string = this.idHope
      if(id.length > 0) {
        return hopes.find((hope: any) => hope._id === id)
      } else {
        return ''
      }
    },
    searchResult() {
      let hopes: Array<Object> = this.allHopes
      let keyword: string = this.search
      if(keyword === '') {
        return ''
      }
      return hopes.filter((hope: any) => hope.from.toLowerCase().match(keyword.toLowerCase()))
    }
  },
  async created() {
    setTimeout(async() => {
      this.loading = await store.dispatch('fetchHopes');
    }, 2000)
  }
});
</script>

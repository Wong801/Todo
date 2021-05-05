<template>
	<div>
		<div class="w-11/12 lg:w-10/12 xl:w-2/4 md:w-11/12 h-5/6 bg-white text-center rounded-lg">
			<h1 class="text-2xl font-bold bg-blue w-full p-8">Edit Task</h1>
			<form @submit="editTodo" class="flex flex-col p-8">
				<label class="text-xl py-2 border-b-2">Title: </label>
				<input type="text" v-model="title" class="border my-10 p-4" placeholder="Insert title...">
				<label class="text-xl py-2 border-b-2">Description: </label>
				<input type="text" v-model="desc" class="border my-10 p-4" placeholder="Insert description...">
				<input type="submit" value="Edit Task" class="my-10 py-4 rounded-lg hover:bg-gray-200 cursor-pointer">
				<button class="my-4 py-4 bg-gray-100 rounded-lg hover:bg-gray-200" @click="close"> Close</button>
			</form>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EditTodo',
	props: ["todo"],
	data() {
		return {
			title: this.todo.title as string,
			desc: this.todo.desc as string
		}
	},
	methods: {
		editTodo(e: Event) {
			e.preventDefault();
			const editedTodo = {
				title: this.title,
				desc: this.desc
			}
			this.$emit('edit-todo', editedTodo)
		},
		close(e: Event) {
			e.preventDefault();
			this.$emit('close-edit-todo')
		}
	}
})
</script>
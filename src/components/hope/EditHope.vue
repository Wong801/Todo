<template>
  <div>
    <div class="overflow-auto w-11/12 lg:w-10/12 xl:w-2/4 md:w-11/12 h-10/12 max-h-full bg-white text-center rounded-lg">
      <h1 class="text-2xl font-bold bg-blue w-full p-8">Edit Hope</h1>
      <form @submit="editHope" class="flex flex-col p-8">
        <label class="text-xl py-2 border-b-2">From: </label>
        <input type="text" v-model="from" class="border my-10 p-4" placeholder="Who are you?">
        <label class="text-xl py-2 border-b-2">To: </label>
        <input type="text" v-model="to" class="border my-10 p-4" placeholder="Who are you trying to tell to?">
        <label class="text-xl py-2 border-b-2">Hope: </label>
        <input type="text" v-model="hope" class="border my-10 p-4" placeholder="What is your hope?">
        <input type="submit" value="Edit Hope" class="my-10 py-4 rounded-lg hover:bg-gray-200 cursor-pointer">
        <button class="my-4 py-4 bg-gray-100 rounded-lg hover:bg-gray-200" @click="close"> Close</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EditHope',
	props: ["hopes"],
	data() {
		return {
			from: this.hopes.from as string,
			to: this.hopes.to as string,
			hope: this.hopes.hope as string
		}
	},
	methods: {
		editHope(e: Event) {
			e.preventDefault();
			if(!this.to) {
        alert('Please let us know for who :)');
        return
      } else if(!this.hope) {
				alert('Please let they know your hope')
				return
      } else {
				const editedHope : any = {
					from: this.from === '' ? 'Anonymous' : this.from as string,
					to: this.to as string,
					hope: this.hope as string
				}
				this.$emit('edit-hope', editedHope)
			}
		},
		close(e: Event) {
			e.preventDefault();
			this.$emit('close-edit-hope')
		}
	}
})
</script>
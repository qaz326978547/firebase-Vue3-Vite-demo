<template>
    <div>
        single IDIDIDIDIDIDIDID
        {{ store.data }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { apiStore } from '@/stores/api.js'
const store = apiStore()
const route = useRoute()
const id = ref(route.params.id)
console.log('id', id.value)
onMounted(async () => {
    store.getProduct(id.value)
})

</script>
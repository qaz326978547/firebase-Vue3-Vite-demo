<template>
    <div style="margin: 20px;">
        <router-link to="/data">data</router-link>
    </div>
    <hr>
    <div style="margin-top: 25px;">
        <router-view></router-view>

    </div>
</template>
  
  
<script setup>
import { RouterView, RouterLink } from 'vue-router'



</script>
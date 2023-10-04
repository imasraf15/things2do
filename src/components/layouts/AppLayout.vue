<template>
  <div>
    <AppHeader />
    <div class="px-5 py-2">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AppHeader from "@/components/layouts/AppHeader.vue";
</script>

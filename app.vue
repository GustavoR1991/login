<template>
  <NuxtLoadingIndicator :throttle="0" :height="6" />
  
  <NuxtPage />
</template>

<style>
    .page-enter-active,
    .page-leave-active {
        transition: all 0.4s;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
    }
</style>

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const currentUser = localStorage.getItem('currentUser'); if (!currentUser) {
      return navigateTo('/');
    }
  }
});

<template>
  <div class="w-full h-screen flex items-center justify-center px-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl">Dashboard</CardTitle>
        <CardDescription>Bem-vindo ao seu painel!</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div v-if="currentUser" class="space-y-2">
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
          <p>
            <strong>Login em:</strong> {{ formatDate(currentUser.loginTime) }}
          </p>
        </div>

        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-2">Usuários Cadastrados</h3>
          <div v-if="allUsers.length === 0" class="text-gray-500">
            Nenhum usuário cadastrado
          </div>
          <div v-else class="space-y-1">
            <div v-for="(user, index) in allUsers" :key="index" class="text-sm">
              {{ user.email }}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex gap-2">
        <Button @click="logout" variant="outline" class="flex-1">Sair</Button>
        <Button @click="clearAllData" variant="destructive" class="flex-1">
          Limpar Dados
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

interface User {
  email: string;
  password: string;
}

interface CurrentUser {
  email: string;
  loginTime: string;
}

const currentUser = ref<CurrentUser | null>(null);
const allUsers = ref<User[]>([]);

// Verificar se o usuário está logado
onMounted(() => {
  const userData = localStorage.getItem("currentUser");
  if (!userData) {
    navigateTo("/");
    return;
  }

  currentUser.value = JSON.parse(userData);
  allUsers.value = JSON.parse(localStorage.getItem("users") || "[]");
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("pt-BR");
};

const logout = () => {
  localStorage.removeItem("currentUser");
  navigateTo("/");
};

const clearAllData = () => {
  if (
    confirm(
      "Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita."
    )
  ) {
    localStorage.removeItem("users");
    localStorage.removeItem("currentUser");
    navigateTo("/");
  }
};
</script>

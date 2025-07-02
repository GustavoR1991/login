<template>
  <div class="w-full h-screen flex items-center justify-center px-4">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Entre com seu email e senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <!-- Mensagens de feedback -->
        <div
          v-if="message.text"
          :class="message.type === 'error' ? 'text-red-500' : 'text-green-500'"
          class="text-sm"
        >
          {{ message.text }}
        </div>

        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Senha</Label>
          <Input
            id="password"
            v-model="form.password"
            type="password"
            required
          />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col gap-2">
        <Button @click="login" class="w-full" :disabled="loading">
          {{ loading ? "Entrando..." : "Entrar" }}
        </Button>
        <NuxtLink
          to="/cadastro"
          class="text-sm text-center text-gray-600 hover:underline"
        >
          Não tem uma conta? Cadastre-se
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
interface User {
  email: string;
  password: string;
}

interface Message {
  text: string;
  type: "success" | "error";
}

const form = reactive({
  email: "",
  password: "",
});

const message = reactive<Message>({
  text: "",
  type: "success",
});

const loading = ref(false);

const showMessage = (text: string, type: "success" | "error") => {
  message.text = text;
  message.type = type;
  setTimeout(() => {
    message.text = "";
  }, 3000);
};

const validateForm = (): boolean => {
  if (!form.email || !form.password) {
    showMessage("Email e senha são obrigatórios", "error");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    showMessage("Email inválido", "error");
    return false;
  }

  return true;
};

const login = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    // Verificar se existem usuários cadastrados
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      showMessage("Nenhuma conta encontrada. Cadastre-se primeiro.", "error");
      loading.value = false;
      return;
    }

    // Procurar usuário com email e senha correspondentes
    const user = users.find(
      (u: User) => u.email === form.email && u.password === form.password
    );

    if (user) {
      // Login bem-sucedido
      showMessage("Login realizado com sucesso!", "success");

      // Salvar sessão do usuário
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          email: user.email,
          loginTime: new Date().toISOString(),
        })
      );

      // Redirecionar para dashboard
      setTimeout(() => {
        navigateTo("/dashboard");
      }, 1500);
    } else {
      showMessage("Email ou senha incorretos", "error");
    }
  } catch (error) {
    showMessage("Erro ao fazer login. Tente novamente.", "error");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center px-4">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Cadastro</CardTitle>
        <CardDescription>
          Crie sua conta preenchendo os dados abaixo.
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
        <div class="grid gap-2">
          <Label for="confirmPassword">Confirme sua senha</Label>
          <Input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
          />
        </div>
      </CardContent>
      <CardFooter class="flex flex-col gap-2">
        <Button @click="createAccount" class="w-full" :disabled="loading">
          {{ loading ? "Criando..." : "Criar conta" }}
        </Button>
        <NuxtLink
          to="/"
          class="text-sm text-center text-gray-600 hover:underline"
        >
          Já tem uma conta? Faça login
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
  confirmPassword: "",
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
  if (!form.email || !form.password || !form.confirmPassword) {
    showMessage("Todos os campos são obrigatórios", "error");
    return false;
  }

  if (form.password !== form.confirmPassword) {
    showMessage("As senhas não coincidem", "error");
    return false;
  }

  if (form.password.length < 6) {
    showMessage("A senha deve ter pelo menos 6 caracteres", "error");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    showMessage("Email inválido", "error");
    return false;
  }

  return true;
};

const createAccount = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    // Verificar se já existe uma conta com este email
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.find(
      (user: User) => user.email === form.email
    );

    if (userExists) {
      showMessage("Este email já está cadastrado", "error");
      loading.value = false;
      return;
    }

    // Criar nova conta
    const newUser: User = {
      email: form.email,
      password: form.password,
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    showMessage("Conta criada com sucesso!", "success");

    // Limpar formulário
    form.email = "";
    form.password = "";
    form.confirmPassword = "";

    // Redirecionar para login após 2 segundos
    setTimeout(() => {
      navigateTo("/");
    }, 2000);
  } catch (error) {
    showMessage("Erro ao criar conta. Tente novamente.", "error");
  } finally {
    loading.value = false;
  }
};
</script>

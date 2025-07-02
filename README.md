# Sistema de Login com Nuxt.js

Um sistema simples de autenticação desenvolvido com Nuxt 3, Vue.js e TailwindCSS, utilizando localStorage para persistência de dados.

## 🚀 Funcionalidades

- **Autenticação de usuários** - Sistema de login e cadastro
- **Proteção de rotas** - Middleware de autenticação
- **Dashboard** - Painel do usuário logado
- **Gerenciamento de usuários** - Visualização de contas cadastradas
- **Interface responsiva** - Design moderno com Tailwind CSS
- **Validação de formulários** - Validação client-side
- **Mensagens de feedback** - Sistema de notificações para o usuário

## 🛠️ Tecnologias Utilizadas

- **[Nuxt 3](https://nuxt.com/)** - Framework Vue.js full-stack
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript reativo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Reka UI](https://reka-ui.com/)** - Biblioteca de componentes Vue
- **[Lucide Vue](https://lucide.dev/)** - Ícones SVG para Vue
- **[@nuxt/icon](https://nuxt.com/modules/icon)** - Sistema de ícones para Nuxt
- **[@nuxt/image](https://nuxt.com/modules/image)** - Otimização de imagens
- **[@nuxt/fonts](https://nuxt.com/modules/fonts)** - Otimização de fontes

## 📦 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/GustavoR1991/login.git
cd login
```

2. **Instale as dependências**

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:3000`

### Produção

```bash
# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📁 Estrutura do Projeto

```
login/
├── components/          # Componentes Vue reutilizáveis
│   └── ui/             # Componentes de interface
├── middleware/         # Middleware do Nuxt
│   └── auth.ts        # Middleware de autenticação
├── pages/             # Páginas da aplicação
│   ├── index.vue      # Página de login
│   ├── cadastro.vue   # Página de cadastro
│   └── dashboard.vue  # Dashboard do usuário
├── public/            # Arquivos estáticos
├── server/            # API server-side
├── lib/               # Utilitários e helpers
│   └── utils.ts       # Funções utilitárias
├── app.vue            # Componente raiz da aplicação
├── nuxt.config.ts     # Configuração do Nuxt
└── tailwind.config.js # Configuração do Tailwind
```

## 🔐 Sistema de Autenticação

### Como Usar

1. **Cadastro**: Acesse `/cadastro` para criar uma nova conta

   - Email válido obrigatório
   - Senha com mínimo de 6 caracteres
   - Confirmação de senha

2. **Login**: Na página inicial (`/`)

   - Email e senha cadastrados
   - Redirecionamento automático para dashboard

3. **Dashboard**: Página protegida (`/dashboard`)
   - Informações do usuário logado
   - Lista de usuários cadastrados
   - Opções de logout e limpeza de dados

### Middleware de Autenticação

O arquivo [`middleware/auth.ts`](middleware/auth.ts) protege rotas que requerem autenticação:

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      return navigateTo("/");
    }
  }
});
```

## 💾 Armazenamento de Dados

O projeto utiliza localStorage para persistir:

- **`users`**: Array com todos os usuários cadastrados
- **`currentUser`**: Dados do usuário logado (email e timestamp)

## 🎨 Componentes UI

O projeto utiliza uma biblioteca de componentes personalizada baseada em:

- Reka UI (primitivos de acessibilidade)
- TailwindCSS (estilização)
- Class Variance Authority (variantes de componentes)

Componentes disponíveis:

- `Button` - Botões com variantes
- `Card` - Cartões de conteúdo
- `Input` - Campos de entrada
- `Label` - Rótulos de formulário

## 🔧 Configuração

### Nuxt Config

Principais configurações em [`nuxt.config.ts`](nuxt.config.ts):

- Módulos habilitados (ESLint, Fonts, Icon, Image)
- Configuração do TailwindCSS
- TypeScript habilitado

### ESLint

Configuração personalizada em [`eslint.config.mjs`](eslint.config.mjs) com regras específicas para Nuxt.

## 📱 Responsividade

Interface totalmente responsiva com:

- Design mobile-first
- Breakpoints do TailwindCSS
- Componentes adaptativos

## 🚀 Deploy

O projeto pode ser deployed em qualquer plataforma que suporte Node.js:

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload da pasta .output/public
```

### Outros Provedores

Consulte a [documentação de deployment do Nuxt](https://nuxt.com/docs/getting-started/deployment)

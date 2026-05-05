# 🚀 Project Kaizen

**Project Kaizen** é uma aplicação focada em gamificação da vida real. O objetivo do sistema é permitir que os usuários gerenciem suas tarefas diárias, hábitos e missões, ganhando experiência (XP) e moedas para evoluir seus avatares.

Este repositório contém a estrutura Full-stack da aplicação, focando na integração de um **Backend** robusto, rápido e escalável.

## 🛠 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Fastify** - Framework web ultrarrápido
- **Prisma ORM** - Modelagem de banco de dados e migrações (Schema Design)
- **PostgreSQL** - Banco de dados relacional escolhido para integridade dos dados
- **JWT (JSON Web Token)** & **Bcrypt** - Autenticação e Segurança de requisições
- **Swagger (@fastify/swagger)** - Documentação interativa da API
- **Docker** - Containerização do banco de dados

## ✨ Funcionalidades Implementadas

- **Autenticação Segura:** Criação de conta e login com criptografia de senhas e geração de tokens JWT temporários.
- **Sistema de Tarefas (Tasks):** Gerenciamento de tarefas pontuais com recompensas de XP atreladas.
- **Rotinas Diárias (Dailies):** Tarefas com prazos, onde a conclusão e check-ins afetam o progresso e recursos do avatar.
- **Hábitos e Missões:** Estruturas complementares para acompanhar a consistência do usuário e entregar recompensas extras.
- **Gamificação Integrada:** Ao fazer o "check-in" de uma tarefa ou Daily, o sistema automaticamente credita XP e moedas, avaliando o possível *Level-Up* do Avatar de forma transacional.
- **Rotas Protegidas:** Middlewares de segurança no Fastify garantem que recursos privados só possam ser manipulados por seus respectivos donos.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- Docker e Docker Compose (para subir o PostgreSQL facilmente)

### Instalação e Execução

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd project-kaizen
```

2. Entre na pasta do backend e instale as dependências:
```bash
cd backend
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz da pasta `backend` baseando-se no que é necessário para a conexão com o banco e o segredo JWT. **(Por motivos de segurança, o arquivo `.env` nunca deve ser "comitado" no repositório).**
Exemplo de `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/kaizendb?schema=public"
JWT_SECRET="sua_super_senha_secreta"
```

4. Suba o banco de dados utilizando Docker (se possuir o docker-compose.yaml configurado):
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma para estruturar as tabelas do banco:
```bash
npx prisma migrate dev
```

6. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

## 📖 Documentação da API (Swagger)

Com o servidor rodando, a forma mais fácil e profissional de testar e interagir com o backend é acessando a documentação interativa gerada pelo Swagger:

👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

**Dica de Uso:** 
1. Crie um usuário na rota `POST /users`.
2. Faça o login na rota `POST /login` para obter o seu `token`.
3. Copie o token, clique no botão **Authorize** no topo do Swagger, cole-o e clique em Authorize. Isso irá liberar o uso de todas as rotas privadas do sistema (como gerenciamento de *Dailies* e *Tasks*)!

## 🔒 Segurança & Boas Práticas
- Nenhum dado sensível ou credencial real do banco de dados encontra-se exposto no repositório.
- A exclusão do arquivo `.env` através do `.gitignore` garante que dados do ambiente permaneçam apenas localmente.
- Senhas de usuários são transformadas em *hashes* por via do Bcrypt, impedindo leitura direta no banco de dados.

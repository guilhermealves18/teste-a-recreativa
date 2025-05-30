# 📚 Projeto - Gerenciamento de Planos de Aula

> **Nota**: Este documento foi elaborado com o auxílio do **GitHub Copilot**, uma ferramenta de inteligência artificial que ajuda a melhorar a escrita e a organização de textos técnicos. O objetivo é fornecer uma documentação clara e objetiva para facilitar o uso e a compreensão do projeto.

Este projeto é composto por três partes principais: **Frontend**, **Backend** e **Configurações do Insomnia**. Ele foi desenvolvido para facilitar o gerenciamento de planos de aula, permitindo o upload, visualização, exclusão e geração de documentos de forma eficiente.

---

## 🏗 Estrutura do Projeto

- **Frontend**: Interface de usuário desenvolvida com **Next.js** e **Ant Design**.
- **Backend**: API desenvolvida com **NestJS** e **Prisma** para gerenciar os dados e processar os arquivos.
- **Insomnia**: Configurações para testar as rotas da API.

---

## 🚀 Funcionalidades

### Frontend

- 📤 **Upload de Arquivos**: Suporte para arquivos PDF e DOCX.
- 📋 **Listagem de Planos de Aula**: Exibição de informações detalhadas em uma tabela.
- 👁 **Visualização de Documentos**: Visualize arquivos enviados e gerados diretamente na aplicação.
- ❌ **Exclusão de Planos de Aula**: Remova documentos de forma simples.

### Backend

- 🔗 **API REST**: Gerencia os planos de aula com suporte a upload, listagem e exclusão.
- 📄 **Processamento de Arquivos**: Extração de texto de arquivos PDF e DOCX.
- 🧾 **Geração de PDFs**: Criação de documentos PDF com base nos dados extraídos.

### Insomnia

- 🧪 Configurações para testar as rotas da API, incluindo upload, listagem e exclusão de planos de aula.

---

## 📂 Estrutura de Diretórios

```plaintext
recreativa/
├── frontend/       # Código do frontend
├── backend/        # Código do backend
├── insomnia/       # Configurações do Insomnia
└── README.md       # Documentação do projeto
```

---

## 🛠 Tecnologias Utilizadas

- **Frontend**: React, Next.js, Ant Design, React Query  
- **Backend**: NestJS, Prisma, SQLite  
- **Outras**: Insomnia (para testes de API)

---

## 📜 Como Executar o Projeto

### 🔧 Backend

1. Acesse o diretório do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados:

   ```bash
   npx prisma migrate dev
   ```

4. Inicie o servidor:

   ```bash
   npm run start:dev
   ```

---

### 💻 Frontend

1. Acesse o diretório do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

---

### 🧪 Insomnia

- Importe o arquivo `Insomnia_2025-05-16.yaml` no Insomnia.
- Teste as rotas disponíveis.

---

## ⚙️ Versões Utilizadas

### Backend
No desenvolvimento do backend, foram utilizadas as seguintes versões do Node.js e npm:

- **Node.js**: v22.15.0  
- **npm**: 11.3.0  

Certifique-se de utilizar essas versões ou versões compatíveis para evitar problemas de compatibilidade durante a instalação das dependências e execução do projeto.

### Frontend
No desenvolvimento do frontend, foram utilizadas as seguintes versões do Node.js e npm:

- **Node.js**: v20.19.1  
- **npm**: 10.8.2  

Recomenda-se utilizar essas versões ou versões compatíveis para garantir o funcionamento correto do ambiente de desenvolvimento.

---

## ⚠️ Observações

- Certifique-se de que o **backend esteja rodando antes de utilizar o frontend**.
- Configure as **variáveis de ambiente** corretamente nos arquivos `.env` de cada parte do projeto.

---

Feito com 💡 para facilitar o dia a dia de quem gerencia planos de aula.
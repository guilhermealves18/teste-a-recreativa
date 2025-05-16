# 📝 Projeto Frontend - Gerenciamento de Planos de Aula

Este projeto é uma aplicação **frontend** para gerenciamento de planos de aula. A plataforma permite **upload de arquivos PDF/DOCX**, visualização e exclusão dos documentos enviados e gerados, tudo em uma interface amigável.

---

## ⚙️ Funcionalidades

* 📤 **Upload de Planos de Aula**: Suporte para arquivos nos formatos **PDF** e **DOCX**.
* 📋 **Listagem**: Tabela com os planos enviados, exibindo informações detalhadas.
* 🔍 **Visualização de Documentos**: Visualize tanto o arquivo original quanto o documento processado diretamente na aplicação.
* ❌ **Exclusão**: Remova planos de aula da lista de forma simples e rápida.

---

## ✅ Pré-requisitos

Certifique-se de ter as seguintes versões instaladas:

* **Node.js**: `v20.19.1`
* **npm**: `10.8.2`

Caso utilize o [nvm](https://github.com/nvm-sh/nvm), você pode ativar a versão correta com:

```bash
nvm use 20
```

---

## 📦 Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd frontend
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Execução

Inicie o servidor de desenvolvimento com:

```bash
npm run dev
```

A aplicação estará disponível em: [http://localhost:3001](http://localhost:3001)

---

## 📜 Scripts Disponíveis

| Comando         | Descrição                                        |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Inicia o servidor de desenvolvimento             |
| `npm run build` | Gera a build de produção                         |
| `npm run start` | Inicia o servidor no modo de produção            |
| `npm run lint`  | Executa o linter para encontrar e corrigir erros |

---

## 🔧 Configuração do Ambiente

Antes de executar o projeto, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
# URL do backend para as requisições da API
NEXT_PUBLIC_URL=http://localhost:3001

# URL do backend para upload de arquivos
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

---

## ⚠️ Observações Importantes

* O **backend** precisa estar configurado e rodando corretamente para que as funcionalidades de **upload**, **listagem** e **exclusão** funcionem.
* Certifique-se de que o backend esteja rodando na **porta `3001`**, ou ajuste conforme configurado no projeto.

---

## 🛠️ Tecnologias Utilizadas

* **[React](https://reactjs.org/)** – Biblioteca para construção da interface de usuário.
* **[Next.js](https://nextjs.org/)** – Framework para SSR e geração de páginas estáticas.
* **[Ant Design](https://ant.design/)** – Biblioteca de componentes visuais modernos.
* **[React Query](https://tanstack.com/query)** – Gerenciamento de estado assíncrono e cache de dados.

# Backend - Guia de Instalação e Execução

Este é o backend do projeto. Ele foi desenvolvido utilizando o framework **NestJS**, que é baseado no **Express**, conforme solicitado na tarefa. A escolha do NestJS foi feita para aproveitar sua estrutura modular e ferramentas integradas, que facilitam o desenvolvimento e a manutenção do código.

Além disso, o conteúdo deste README foi aprimorado com a ajuda do **GitHub Copilot**, garantindo uma documentação clara e bem estruturada.

Siga as instruções abaixo para instalar e executar o ambiente.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

- **Node.js**: v22.15.0
- **npm**: v11.3.0
- **SQLite** (opcional, caso queira inspecionar o banco de dados local)

## Instalação

1. Clone este repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto.
- Adicione a seguinte configuração ao arquivo `.env`:
```properties
DATABASE_URL="file:./dev.db"
```

4. Gere o cliente Prisma e aplique as migrações:
```bash
npx prisma generate
npx prisma migrate dev
```

### Executando o Backend
Ambiente de Desenvolvimento
Para iniciar o servidor em modo de desenvolvimento com hot-reload:
```bash
npm run start:dev
```

O backend estará disponível em http://localhost:3000.

Ambiente de Produção
1. Compile o projeto:
```bash
npm run build
```

2. Inicie o servidor:
```bash
npm run start:prod
```

### Estrutura do Projeto
- `src/`: Contém o código-fonte principal.
- `prisma/`: Contém o esquema do banco de dados e as migrações.
- `uploads/`: Diretório para arquivos enviados.

### Rotas Disponíveis

#### **Rotas de Plano de Aula**

- **`GET /lesson-plan`**  
  Lista os planos de aula com suporte a paginação e filtros.  
  **Query Params**:
  - `order`: Ordenação (`asc` ou `desc`).
  - `page`: Página atual.
  - `per_page`: Número de itens por página.
  - `sort`: Campo para ordenação.
  - `term`: Termo de busca.

- **`POST /lesson-plan/upload`**  
  Faz o upload de um arquivo para criar um plano de aula.  
  **Body**:
  - `file`: Arquivo enviado (PDF ou DOCX).
  - `title`: Título do plano de aula (opcional).

- **`DELETE /lesson-plan/:id`**  
  Exclui um plano de aula pelo ID.  
  **Path Params**:
  - `id`: ID do plano de aula a ser excluído.  
  **Resposta**:
  ```json
  {
    "status": "success",
    "message": "Lesson plan deleted successfully."
  }
  ```

#### **Rotas de Status**

- **`GET /`**  
  Retorna o status do backend.  
  **Resposta**:
  ```json
  {
    "status": 200,
    "message": "The backend is working correctly."
  }
  ```

Adicione mais detalhes conforme necessário para cada rota, como exemplos de requisição e resposta.

#### Problemas Comuns
- **Erro de versão do Node.js ou npm**: Certifique-se de estar usando as versões corretas (Node.js v22.15.0 e npm v11.3.0).
- **Banco de dados não encontrado**: Verifique se o arquivo dev.db existe no diretório prisma/.

### Sugestões de Melhorias

Aqui estão algumas ideias para futuras melhorias no backend:

1. **Integração com IA para Análise de Conteúdo**  
   - Implementar uma integração com APIs de IA (como OpenAI ou Hugging Face) para analisar e melhorar o conteúdo dos arquivos PDF ou DOCX enviados.  
   - Exemplos de funcionalidades:
     - Sugestões de melhorias no texto.

2. **Sistema de Autenticação e Autorização**  
   - Adicionar autenticação para proteger as rotas do backend.
   - Implementar autorização baseada em papéis (ex.: administrador, professor, aluno).

3. **Suporte a Outros Bancos de Dados**  
   - Expandir o suporte para outros bancos de dados, como PostgreSQL ou MySQL, para maior flexibilidade em ambientes de produção.

4. **Upload e Processamento de Arquivos em Lote**  
   - Permitir o upload de múltiplos arquivos simultaneamente.
   - Implementar um sistema de fila para processar os arquivos de forma assíncrona.

5. **Documentação de API com Swagger**  
   - Adicionar documentação interativa da API usando o Swagger para facilitar o uso por outros desenvolvedores.

6. **Armazenamento de Arquivos em Serviços na Nuvem**  
   - Substituir o armazenamento local de arquivos (pasta `uploads/`) por serviços de armazenamento em nuvem, como **Azure Blob Storage** ou **AWS S3**.  
   - Benefícios:
     - Maior escalabilidade e confiabilidade.
     - Melhor gerenciamento de arquivos em ambientes de produção.
     - Redução de dependência do servidor local.




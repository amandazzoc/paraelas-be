# 1. Introdução
O projeto paraelas-be é o backend de um sistema de inscrições para um evento de tecnologia voltado para mulheres. Ele gerencia o cadastro de participantes, armazenamento de dados, envio de e-mails e geração de QR Codes.

**Objetivo do sistema:**  
Facilitar o registro de participantes, garantir a conformidade com a LGPD, armazenar documentos de autorização para menores e enviar QR Codes por e-mail.

**Escopo:**  
O backend cobre:
- Cadastro de inscritos (com upload de termo de autorização para menores)
- Validação de e-mail único
- Armazenamento dos dados no MongoDB
- Upload de arquivos para Supabase Storage
- Geração e envio de QR Code por e-mail

Não cobre:
- Interface do usuário (frontend)
- Autenticação de usuários
- Painel administrativo

---

# 2. Arquitetura do Sistema

**Diagrama geral:**  
```
Frontend (Next.js/React) <-> API REST (Express) <-> MongoDB
                                      |
                                 Supabase Storage
                                 E-mail (SMTP)
```

**Componentes principais:**
- **API REST:** Recebe requisições do frontend, processa dados e responde.
- **Banco de dados (MongoDB):** Armazena informações dos inscritos.
- **Serviços externos:** Supabase para armazenamento de PDFs, SMTP para envio de e-mails.
- **Serviços internos:** Geração de QR Code, validação de dados.

**Fluxo de dados:**  
1. Usuário envia formulário pelo frontend.
2. API recebe dados e arquivo via multipart/form-data.
3. Arquivo é enviado para Supabase Storage.
4. Dados são salvos no MongoDB.
5. QR Code é gerado e enviado por e-mail ao inscrito.

---

# 3. Tecnologias Utilizadas

- **Linguagem:** Node.js (JavaScript)
- **Framework:** Express
- **Banco de dados:** MongoDB (Atlas)
- **Principais bibliotecas:**
  - mongoose (ORM)
  - multer (upload de arquivos)
  - @supabase/supabase-js (integração com Supabase)
  - nodemailer (envio de e-mails)
  - qrcode (geração de QR Code)
  - dotenv (variáveis de ambiente)
- **Ferramentas de deploy:** Vercel (backend e frontend)

---

# 4. Estrutura do Projeto

```
config/
  db-connection.js
controllers/
  inscribedController.js
models/
  Inscribed.js
routes/
  inscribedRoutes.js
services/
  emailService.js
  emailTemplate.js
  inscribedService.js
  qrCodeService.js
  supabaseService.js
index.js
package.json
.env
```

- **Padrões de nomenclatura:**  
  - Pastas e arquivos em camelCase.
  - Classes iniciam com maiúscula.
- **Separação de responsabilidades:**  
  - Controllers: lógica de requisição/resposta.
  - Services: regras de negócio e integração externa.
  - Models: definição dos dados (mongoose).
  - Routes: definição das rotas da API.

---

# 5. Configuração do Ambiente

**Pré-requisitos:**
- Node.js >= 18
- MongoDB Atlas (ou local)
- Conta Supabase (Storage configurado)
- Conta de e-mail (Gmail SMTP)

**Variáveis de ambiente necessárias (.env):**
- DB_USER, DB_PASSWORD
- BASE_URL, BACKEND_URL
- EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM
- SUPABASE_URL, SUPABASE_SERVICE_KEY

**Configuração do banco de dados:**  
Configure o MongoDB Atlas e insira usuário/senha no .env.

**Passos para rodar localmente:**
1. Instale dependências:  
   `npm install`
2. Configure o arquivo .env com suas credenciais.
3. Inicie o servidor:  
   `npm start`
4. O backend estará disponível em `http://localhost:4000`

---

# 6. Endpoints da API

### Listar inscritos
- **GET** `/`
- **Parâmetros:** nenhum
- **Exemplo de resposta:**
```json
[
  {
    "_id": "123",
    "name": "Amanda",
    "email": "amanda@gmail.com",
    "phone": "1399640234",
    "agreeLGPD": true,
    "adult": true,
    "AuthorizationTerm": "https://.../file.pdf"
  }
]
```
- **Erros:** 500 (erro interno)

---

### Criar inscrito
- **POST** `/`
- **Parâmetros:**  
  - FormData: name, email, phone, agreeLGPD, adult, AuthorizationTerm (arquivo PDF)
- **Exemplo de requisição:**  
  Envio via FormData (multipart/form-data)
- **Exemplo de resposta:**
```json
{
  "_id": "123",
  "name": "Amanda",
  "email": "amanda@gmail.com",
  "phone": "1399640234",
  "agreeLGPD": true,
  "adult": true,
  "AuthorizationTerm": "https://.../file.pdf"
}
```
- **Erros:**  
  - 409: Email já cadastrado
  - 500: Erro interno

---

### Buscar inscrito por ID
- **GET** `/:id`
- **Parâmetros:**  
  - id: string
- **Exemplo de resposta:** igual ao de listar
- **Erros:** 404 (não encontrado), 500 (erro interno)

---

# 7. Banco de Dados

**Modelo de dados (Inscribed):**
- _id: ObjectId
- name: String
- email: String (único)
- phone: String
- agreeLGPD: Boolean
- adult: Boolean
- AuthorizationTerm: String (URL do arquivo PDF no Supabase)

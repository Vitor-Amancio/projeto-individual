# AutoTrack - Sistema de Gestão de Manutenção Automotiva

O **AutoTrack** é uma plataforma focada no monitoramento rigoroso e na gestão do ciclo de vida automotivo. Ele substitui a adivinhação e o "achismo" da mecânica por telemetria, dados exatos e um histórico confiável de todas as manutenções preventivas e corretivas do seu veículo.

## Tecnologias Utilizadas
Este projeto foi desenvolvido utilizando as seguintes tecnologias:
- **Front-end:** HTML, CSS, JavaScript (Vanilla)
- **Back-end:** Node.js, Express
- **Banco de Dados:** MySQL (Consultas via pacote `mysql2`)
- **Visualização de Dados:** Chart.js

## Como Configurar e Rodar o Projeto

Siga os passos abaixo para testar o projeto localmente:

### 1. Banco de Dados
1. Abra o MySQL Workbench (conectado localmente).
2. Copie o conteúdo do arquivo `src/database/script-tabelas.sql` e execute-o. Isso irá criar o banco de dados `autotrack` e suas respectivas tabelas.

### 2. Configurando o Ambiente(Localmente)
1. Abra o arquivo `.env.dev` na raiz do projeto.
2. Preencha as variáveis `DB_USER` e `DB_PASSWORD` com as credenciais do seu banco de dados MySQL.
3. Certifique-se de que a porta `DB_PORT` corresponde ao local onde seu banco está rodando (ex: `3306` local ou `3307` via VM).

### 3. Rodando a Aplicação
1. Abra o terminal na raiz do projeto (Ex: Prompt de Comando ou Git Bash).
2. Instale as dependências executando o comando:
   ```bash
   npm install
   ```
3. Inicie o servidor da API:
   ```bash
   npm start
   ```
4. Se a configuração estiver correta, a mensagem "Servidor rodando!" aparecerá no console.

### 4. Acesso ao Sistema
- Com o servidor rodando, abra o seu navegador e acesse a página inicial em: **`http://localhost:3333`**
- Acesse a página de Cadastro e utilize o "Código de Convite VIP" (ex: `FERRARI90`, `PORSCHE997`, `BMW2000`) para se registrar.

---
*Projeto desenvolvido para a disciplina de Pesquisa e Inovação (SPTech).*

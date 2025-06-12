# 🚀 Projeto Login Portfolio

![Image](https://github.com/user-attachments/assets/03451399-4878-4771-be88-72b9f34250f7)
*Imagem ilustrativa do projeto mostrando a tela de login*

---

## Sobre o Projeto

Este projeto é uma aplicação simples de sistema de autenticação usando React com TypeScript. O foco principal foi criar um sistema de registro, login e dashboard usando **localStorage** para armazenar os usuários, além de implementar modais para exibir mensagens para o usuário.

### Como foi feito?

- **React** + **TypeScript** para a estrutura do frontend.
- **localStorage** para persistência simples dos dados dos usuários no navegador.
- Componentes reutilizáveis e estilizados com CSS.
- Navegação entre páginas com **React Router**.
- Uso de modais personalizados para feedback do usuário (ex: login bem-sucedido).
- Validações básicas para login e registro.

### Aplicação

1. O usuário se registra com nome, email e senha.
2. Os dados são salvos no `localStorage`.
3. No login, o sistema valida email/usuário e senha contra os dados armazenados.
4. Se válido, exibe modal de sucesso e redireciona para a Dashboard.
5. Dashboard exibe as informações do usuário logado e sua imagem (via GitHub, se disponível).

---

## Tecnologias Utilizadas

- **React** (v18.x)
- **TypeScript**
- **React Router Dom** (para navegação)
- **CSS3**
- **localStorage API** (navegador)
- **Modal personalizado** em React

---

## Como rodar o projeto localmente

1. Clone o repositório:
  - git clone https://github.com/Luis-Batista-Code/login-portfolio.git
  - cd login-portfolio
  - npm install
  - npm run

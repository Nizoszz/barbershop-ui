# 🏠 Barber Shop UI - Sistema de Agendamento de Horários

Bem-vindo ao **Barber Shop UI**, um sistema completo para o agendamento de horários em barbearias. Este monorepo contém dois projetos distintos, um **backend** desenvolvido em Java com Spring e um **frontend** construído em Angular, garantindo uma experiência fluida e integrada para os clientes e barbeiros.

---

## 🚀 Sobre o Projeto

### Backend - Java com Spring
O backend é responsável pelo gerenciamento dos agendamentos, armazenamento de dados dos clientes e horários disponíveis na barbearia. As tecnologias utilizadas incluem:
- **Spring Boot** para criação da API REST.
- **JPA com Hibernate** para a persistência dos dados no banco **PostgreSQL**.
- **Flyway** para versionamento e controle das migrations do banco de dados.
- **Docker e Docker Compose** (opcional) para facilitar a execução do ambiente.

### Frontend - Angular
O frontend foi desenvolvido com **Angular**, utilizando a biblioteca **Angular Material** para uma interface moderna e responsiva. Ele permite:
- A visualização de horários disponíveis.
- O agendamento de atendimentos.
- A interação fluida entre barbeiro e cliente.

---

## 📚 Tecnologias Utilizadas

### Backend:
- **Java 17**
- **Spring Boot**
- **Maven**
- **JPA e Hibernate**
- **PostgreSQL**
- **Flyway**
- **Docker e Docker Compose** (opcional)

### Frontend:
- **Angular 17**
- **Angular Material**
- **TypeScript**
- **HTML5 e CSS3**
- **Docker e Docker Compose** (opcional)

---

## 🎯 Objetivos do Projeto

Após a conclusão do desenvolvimento, este sistema permitirá:
- Criar uma API REST funcional e escalável para o gerenciamento de horários na barbearia.
- Proporcionar um frontend intuitivo e moderno para clientes e barbeiros.
- Versionar e organizar a base de dados corretamente.
- Garantir integração eficiente entre frontend e backend.

---

## 🛠️ Como Executar o Projeto

### Backend:
1. Clone o repositório:
   ```sh
   git clone https://github.com/seuusuario/barbershop.git
    ```
2. Acesse a pasta do backend:
  ```sh
  cd backend
  ```
3. Execute os comandos para compilar e rodar com Maven:
  ```sh
  mvn clean install
  mvn spring-boot:run
  ```

### Frontend:
1. Acesse a pasta do frontend:
    ```sh
     cd frontend
    ```

2. Acesse a pasta do frontend:
    ```sh
    npm install
    ```

3. Acesse a pasta do frontend:
    ```sh
    ng serve
    ```

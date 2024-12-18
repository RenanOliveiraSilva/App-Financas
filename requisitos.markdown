# Elicitação de Requisitos - **Desafoga: Finanças**

## **Objetivo Principal**

Aplicativo para gerenciamento dos gastos pessoais.


---

## **Usuários e Necessidades**

### **Perfis de Usuários**
- **Perfil 1:** Adolescentes 
  - Necessidade: Controlar receitas e economizar para compras maiores, como roupas ou eletrônicos.
- **Perfil 2:** Adultos
  - Necessidade: Organizar finanças para pagar contas, poupar e controlar pequenos gastos.

### **Principais Dores**
- **Exemplo:** 
  - Falta de visibilidade sobre gastos.
  - Dificuldade em criar e seguir orçamentos.
  - Ausência de relatórios claros.
  - Falta de praticidade para anotar os gastos

---

## **Requisitos Funcionais**

| ID     | Nome                      | Descrição                                                                                     | Prioridade  |
|--------|---------------------------|-----------------------------------------------------------------------------------------------|-------------|
| RF01   | Cadastro de Despesas      | O sistema deve permitir que o usuário cadastre despesas com categorias, valores e datas.      | Must Have   |
| RF02   | Ciclo Personalizado       | O sistema deve permitir ao usuário definir o início e o fim do ciclo financeiro.              | Must Have   |
| RF03   | Receitas por Ciclo        | O sistema deve permitir registrar receitas em diferentes datas dentro de um ciclo financeiro. | Must Have   |
| RF04   | Geração de Relatórios     | O sistema deve gerar relatórios financeiros mensais com gráficos de gastos e receitas.        | Should Have |
| RF05   | Alertas de Gastos         | O sistema deve notificar o usuário quando um limite de gasto definido for ultrapassado.       | Could Have  |
| RF06   | Gerenciar Usuario         | O sistema deve gerenciar (CRUD) um usuário.                                                   | Must Have   |
| RF07   | Cadastro de categorias    | O sistema deve cadastrar categoria de gastos e receitas.                                      | Must Have   |


---

## **Requisitos Não Funcionais**

| ID     | Nome                      | Descrição                                                                                     | Prioridade  |
|--------|---------------------------|-----------------------------------------------------------------------------------------------|-------------|
| RNF01  | Responsividade            | O aplicativo deve funcionar perfeitamente em dispositivos móveis de diferentes tamanhos.      | Must Have   |
| RNF02  | Segurança de Dados        | Todos os dados devem ser armazenados e transmitidos de forma segura, utilizando criptografia. | Must Have   |
| RNF03  | Performance               | O sistema deve responder a solicitações em menos de 2 segundos em 95% dos casos.              | Should Have |
| RNF04  | Segurança e Login         | O sistema deve garantir que apenas usuários autenticados possam acessar seus dados pessoais, utilizando autenticação segura (e.g., e-mail e senha com criptografia).                                                              | Must Have   |

---

## **Priorização (MoSCoW)**

### **Must Have**
- Cadastro de despesas e receitas.
- Visualização de saldo atual.
- Definicição de período

### **Should Have**
- Relatórios mensais.
- Configuração de limites de gastos por categoria.

### **Could Have**
- Importação/exportação de dados.
- Integração com bancos.

### **Won’t Have**
- Funcionalidades relacionadas a investimentos (foco apenas em despesas/receitas).

---

## **Notas Adicionais**

- Outras ideias ou insights que surgirem durante a elicitação de requisitos.

---

## **Alterações Futuras**

Espaço para documentar modificações nos requisitos conforme o projeto evoluir.

# web3-trab-final
Trabalho da disciplina Sistemas Web 3. Este projeto implementa um sistema completo de venda e entrega de tomates, composto por três microserviços independentes que se integram através de um mashup.

Sistema de Venda e Entrega de Tomates

Arquitetura do Sistema
Serviços Implementados:

Serviço de Preço do Tomate (REST - Porta 8081)
Serviço de Cálculo de Frete (GraphQL - Porta 8082)
Mashup de Venda e Entrega (REST - Porta 8080)

Como Executar
Pré-requisitos

Java 17+
Maven 3.6+
Portas 8080, 8081 e 8082 disponíveis

Executando os Serviços

Clone o repositório e navegue para cada pasta de serviço
Execute o Serviço de Preço do Tomate (Porta 8081):

bashcd preco-tomate-service
mvn spring-boot:run

Execute o Serviço de Frete (Porta 8082):

bashcd frete-service
mvn spring-boot:run

Execute o Mashup (Porta 8080):

bashcd mashup-service
mvn spring-boot:run

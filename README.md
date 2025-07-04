# web3-trab-final
Trabalho da disciplina Sistemas Web 3, desenvolvido por Kauã Santos Lima.
Este projeto implementa um sistema completo de venda e entrega de tomates, composto por dois microserviços independentes que se integram através de um outro serviço, denominado "mashup".

# Sistema de Cotação Integrada - Tomate + Frete

Sistema distribuído com 3 serviços integrados: cálculo de preço de tomate, cálculo de frete e serviço mashup para cotação completa.

## Arquitetura

- **Serviço Tomate**: Java Spring Boot + REST API (porta 8081)
- **Serviço Frete**: Node.js + GraphQL (porta 8082)  
- **Serviço Mashup**: Node.js + GraphQL (porta 8080) - Integra os outros dois

## Como Executar

### 1. Serviço de Tomate (Java)
```bash
cd preco-tomate-service
mvn spring-boot:run
```
- **Endpoint**: `http://localhost:8081/api/tomate/preco`

### 2. Serviço de Frete (Node.js)
```bash
cd frete-service
npm install
npm run dev
```
- **GraphQL**: `http://localhost:8082/graphql`

### 3. Serviço Mashup (Node.js)
```bash
cd mashup-service
npm install
npm run dev
```
- **GraphQL**: `http://localhost:8080/graphql`

## Endpoints e Exemplos

### Serviço Tomate (REST)
```bash
# GET - Calcular preço
curl "http://localhost:8080/api/tomate/preco?quantidade=25"

# Resposta
{
  "quantidade": 25,
  "precoUnitario": 50.0,
  "precoTotal": 1250.0,
  "percentualDesconto": 11.0,
  "precoFinal": 1112.5
}
```

### Serviço Frete (GraphQL)
```graphql
# Query
query {
  calcularFrete(quilometragem: 150, tipoVeiculo: CAMINHAO) {
    valorTotal
    tipoVeiculo
    capacidade
  }
}

# Resposta
{
  "data": {
    "calcularFrete": {
      "valorTotal": 3200.0,
      "tipoVeiculo": "CAMINHAO",
      "capacidade": 250
    }
  }
}
```

### Serviço Mashup (GraphQL)
```graphql
# Query - Cotação Completa
query {
  calcularCotacaoCompleta(
    quantidade: 25, 
    quilometragem: 150, 
    tipoVeiculo: CAMINHAO
  ) {
    valorTotalGeral
    resumo {
      valorTomate
      valorFrete
      valorTotalGeral
    }
  }
}

# Resposta
{
  "data": {
    "calcularCotacaoCompleta": {
      "valorTotalGeral": 4312.5,
      "resumo": {
        "valorTomate": 1112.5,
        "valorFrete": 3200.0,
        "valorTotalGeral": 4312.5
      }
    }
  }
}
```

## Regras de Negócio:

Serviço 1: Preço do Tomate
Configuração Base

- Preço base por caixa: R$ 50,00
- O valor deve ser configurável através de variável

Descontos por Quantidade

- Até 9 caixas: 0% de desconto
- 10 a 19 caixas: 5% de desconto no total
- 20 a 29 caixas: 11% de desconto no total
- 30 caixas ou mais: 22% de desconto no total

Serviço 2: Cálculo de Frete

Tipos de Veículos:
Caminhão
- Capacidade: 250 caixas
- Preço por km: R$ 20,00
- Taxa fixa: R$ 200,00
- Desconto acima de 100km: 20% no valor do km após 100km

Carreta
- Capacidade: 1500 caixas
- Preço por km: R$ 40,00
- Taxa fixa: R$ 400,00
- Desconto acima de 100km: 20% no valor do km após 100km

Exemplo de Cálculo
Para 120km com carreta:

- 100km a R$ 40,00 = R$ 4.000,00
- 20km a R$ 32,00 (com desconto de 20%) = R$ 640,00
- Taxa fixa: R$ 400,00
- Total: R$ 5.040,00

Mashup: Serviço Integrador de Venda e Entrega
Entrada

- Quantidade de caixas de tomate
- Distância a ser percorrida para entrega

Regras de Cálculo
1. Cálculo Base

Soma do preço do tomate + valor do frete

2. Aplicação de Lucro

Lucro fixo: +55% sobre o valor base (preço do tomate + frete)

3. Descontos por Volume

- Acima de 50 caixas: 7,5% de desconto
- Acima de 300 caixas: 12% de desconto

4. Impostos

- +27% sobre o valor final com lucro e desconto aplicados

Fluxo de Cálculo

- Obter preço do tomate (Serviço 1)
- Obter valor do frete (Serviço 2)
- Somar preço do tomate + frete
- Aplicar lucro de 55%
- Aplicar desconto por volume (se aplicável)
- Aplicar impostos de 27%
- Retornar valor final

Integração

- Consome os dois serviços anteriores
- Aplica as regras comerciais específicas
- Retorna o preço final para o cliente

## Testes Rápidos

### Verificar se todos os serviços estão online:
```graphql
query {
  testarServicos {
    tomate { status }
    frete { status }
  }
}
```

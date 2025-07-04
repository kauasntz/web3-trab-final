# web3-trab-final
Trabalho da disciplina Sistemas Web 3, desenvolvido por Kauã Santos Lima.
Este projeto implementa um sistema completo de venda e entrega de tomates, composto por dois microserviços independentes que se integram através de um outro serviço, denominado "mashup".


Serviços Implementados:

Serviço de Preço do Tomate (REST - Porta 8081)
Serviço de Cálculo de Frete (GraphQL e Node.js - Porta 8082)
Mashup de Venda e Entrega (GraphQL e Node.js - Porta 8080)
-----------------------------------------------------------------
Regras de Negócio:

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

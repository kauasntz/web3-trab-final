const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    calcularCotacaoCompleta(
      quantidade: Int!
      quilometragem: Int!
      tipoVeiculo: TipoVeiculo!
    ): CotacaoCompleta!
    
    calcularPrecoTomate(quantidade: Int!): PrecoTomate!
    calcularFrete(quilometragem: Int!, tipoVeiculo: TipoVeiculo!): FreteResponse!
    testarServicos: StatusServicos!
    hello: String!
  }

  enum TipoVeiculo {
    CAMINHAO
    CARRETA
  }

  type CotacaoCompleta {
    tomate: PrecoTomate!
    frete: FreteResponse!
    valorTotalGeral: Float!
    resumo: ResumoOperacao!
  }

  type PrecoTomate {
    quantidade: Int!
    precoUnitario: Float!
    precoTotal: Float!
    percentualDesconto: Float!
    precoFinal: Float!
  }

  type FreteResponse {
    quilometragem: Int!
    tipoVeiculo: String!
    capacidade: Int!
    precoPorKm: Float!
    taxaFixa: Float!
    valorBase: Float!
    valorTotal: Float!
  }

  type ResumoOperacao {
    quantidadeTomate: Int!
    valorTomate: Float!
    quilometragem: Int!
    tipoVeiculo: String!
    valorFrete: Float!
    valorTotalGeral: Float!
  }

  type StatusServicos {
    tomate: StatusServico!
    frete: StatusServico!
  }

  type StatusServico {
    status: String!
    erro: String
  }
`;

module.exports = { typeDefs };
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    calcularFrete(quilometragem: Int!, tipoVeiculo: TipoVeiculo!): FreteResponse!
    hello: String!
  }

  enum TipoVeiculo {
    CAMINHAO
    CARRETA
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
`;

module.exports = { typeDefs };
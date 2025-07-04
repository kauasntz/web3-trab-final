const { FreteService } = require('./services/FreteService');

const resolvers = {
  Query: {
    calcularFrete: (_, { quilometragem, tipoVeiculo }) => {
      return FreteService.calcularFrete(quilometragem, tipoVeiculo);
    },
    hello: () => {
      return "Serviço de Frete GraphQL funcionando!";
    }
  }
};

module.exports = { resolvers };
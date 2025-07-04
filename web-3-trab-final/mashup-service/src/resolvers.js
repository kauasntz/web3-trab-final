const { MashupService } = require('./services/MashupService');

const resolvers = {
  Query: {
    calcularCotacaoCompleta: async (_, { quantidade, quilometragem, tipoVeiculo }) => {
      return await MashupService.calcularCotacaoCompleta(quantidade, quilometragem, tipoVeiculo);
    },

    calcularPrecoTomate: async (_, { quantidade }) => {
      return await MashupService.calcularPrecoTomate(quantidade);
    },

    calcularFrete: async (_, { quilometragem, tipoVeiculo }) => {
      return await MashupService.calcularFrete(quilometragem, tipoVeiculo);
    },

    testarServicos: async () => {
      return await MashupService.testarServicos();
    },

    hello: () => {
      return "Serviço Mashup (Tomate + Frete) funcionando!";
    }
  }
};

module.exports = { resolvers };
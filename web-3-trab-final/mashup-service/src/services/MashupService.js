// src/services/MashupService.js
const axios = require('axios');

class MashupService {
  
  // URLs dos serviços
  static TOMATE_SERVICE_URL = 'http://localhost:8081/api/tomate';
  static FRETE_SERVICE_URL = 'http://localhost:8082/graphql';

  // Buscar preço do tomate
  static async calcularPrecoTomate(quantidade) {
    try {
      const response = await axios.get(`${this.TOMATE_SERVICE_URL}/preco`, {
        params: { quantidade }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao consultar serviço de tomate: ${error.message}`);
    }
  }

  // Buscar frete
  static async calcularFrete(quilometragem, tipoVeiculo) {
    try {
      const query = `
        query {
          calcularFrete(quilometragem: ${quilometragem}, tipoVeiculo: ${tipoVeiculo}) {
            quilometragem
            tipoVeiculo
            capacidade
            precoPorKm
            taxaFixa
            valorBase
            valorTotal
          }
        }
      `;

      const response = await axios.post(this.FRETE_SERVICE_URL, {
        query: query
      });

      return response.data.data.calcularFrete;
    } catch (error) {
      throw new Error(`Erro ao consultar serviço de frete: ${error.message}`);
    }
  }

  // Calcular cotação completa (tomate + frete)
  static async calcularCotacaoCompleta(quantidade, quilometragem, tipoVeiculo) {
    try {
      // Buscar dados dos dois serviços em paralelo
      const [precoTomate, dadosFrete] = await Promise.all([
        this.calcularPrecoTomate(quantidade),
        this.calcularFrete(quilometragem, tipoVeiculo)
      ]);

      // Calcular total geral
      const valorTotalGeral = precoTomate.precoFinal + dadosFrete.valorTotal;

      return {
        tomate: precoTomate,
        frete: dadosFrete,
        valorTotalGeral,
        resumo: {
          quantidadeTomate: quantidade,
          valorTomate: precoTomate.precoFinal,
          quilometragem: quilometragem,
          tipoVeiculo: tipoVeiculo,
          valorFrete: dadosFrete.valorTotal,
          valorTotalGeral
        }
      };
    } catch (error) {
      throw new Error(`Erro ao calcular cotação completa: ${error.message}`);
    }
  }

  // Teste de conectividade dos serviços
  static async testarServicos() {
    const resultados = {
      tomate: { status: 'offline', erro: null },
      frete: { status: 'offline', erro: null }
    };

    // Testar serviço de tomate
    try {
      await axios.get(`${this.TOMATE_SERVICE_URL}/preco?quantidade=1`);
      resultados.tomate.status = 'online';
    } catch (error) {
      resultados.tomate.erro = error.message;
    }

    // Testar serviço de frete
    try {
      const query = `query { hello }`;
      await axios.post(this.FRETE_SERVICE_URL, { query });
      resultados.frete.status = 'online';
    } catch (error) {
      resultados.frete.erro = error.message;
    }

    return resultados;
  }
}

module.exports = { MashupService };
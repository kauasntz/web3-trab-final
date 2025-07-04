const { TipoVeiculo } = require('../models/TipoVeiculo');

class FreteService {
  static calcularFrete(quilometragem, tipoVeiculo) {
    const veiculo = TipoVeiculo.getVeiculo(tipoVeiculo);
    
    // Cálculo do valor base com desconto após 100km
    const valorBase = quilometragem <= 100 
      ? quilometragem * veiculo.precoPorKm
      : 100 * veiculo.precoPorKm + (quilometragem - 100) * veiculo.precoPorKm * 0.8;
    
    const valorTotal = valorBase + veiculo.taxaFixa;
    
    return {
      quilometragem,
      tipoVeiculo: veiculo.nome,
      capacidade: veiculo.capacidade,
      precoPorKm: veiculo.precoPorKm,
      taxaFixa: veiculo.taxaFixa,
      valorBase: Math.round(valorBase * 100) / 100,
      valorTotal: Math.round(valorTotal * 100) / 100
    };
  }
}

module.exports = { FreteService };
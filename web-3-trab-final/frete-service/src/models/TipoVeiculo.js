class TipoVeiculo {
  constructor(nome, capacidade, precoPorKm, taxaFixa) {
    this.nome = nome;
    this.capacidade = capacidade;
    this.precoPorKm = precoPorKm;
    this.taxaFixa = taxaFixa;
  }

  static getVeiculo(tipo) {
    const veiculos = {
      CAMINHAO: new TipoVeiculo('CAMINHAO', 250, 20.0, 200.0),
      CARRETA: new TipoVeiculo('CARRETA', 1500, 40.0, 400.0)
    };

    const veiculo = veiculos[tipo];
    if (!veiculo) {
      throw new Error(`Tipo de veículo inválido: ${tipo}`);
    }
    
    return veiculo;
  }
}

module.exports = { TipoVeiculo };
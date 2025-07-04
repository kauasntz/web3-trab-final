package com.tomate.preco_tomate_service;

import org.springframework.web.bind.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RestController
@RequestMapping("/api/tomate")
public class TomateApplication {

	private static final double PRECO_BASE = 50.0;

	public static void main(String[] args) {
		SpringApplication.run(TomateApplication.class, args);
	}

	@GetMapping("/preco")
    public PrecoResponse calcularPreco(@RequestParam int quantidade) {
        double precoTotal = quantidade * PRECO_BASE;
        double desconto = calcularDesconto(quantidade);
        double precoComDesconto = precoTotal * (1 - desconto);
        
        return new PrecoResponse(
            quantidade,
            PRECO_BASE,
            precoTotal,
            desconto * 100,
            precoComDesconto
        );
    }

    @PostMapping("/preco")
    public PrecoResponse calcularPrecoPost(@RequestBody PrecoRequest request) {
        return calcularPreco(request.getQuantidade());
    }

    private double calcularDesconto(int quantidade) {
        if (quantidade >= 30) {
            return 0.22; // 22%
        } else if (quantidade >= 20) {
            return 0.11; // 11%
        } else if (quantidade >= 10) {
            return 0.05; // 5%
        } else {
            return 0.0; // 0%
        }
    }

    // Classes de Request e Response
    public static class PrecoRequest {
        private int quantidade;
        
        public int getQuantidade() { return quantidade; }
        public void setQuantidade(int quantidade) { this.quantidade = quantidade; }
    }

    public static class PrecoResponse {
        private int quantidade;
        private double precoUnitario;
        private double precoTotal;
        private double percentualDesconto;
        private double precoFinal;

        public PrecoResponse(int quantidade, double precoUnitario, double precoTotal, 
                           double percentualDesconto, double precoFinal) {
            this.quantidade = quantidade;
            this.precoUnitario = precoUnitario;
            this.precoTotal = precoTotal;
            this.percentualDesconto = percentualDesconto;
            this.precoFinal = precoFinal;
        }

        // Getters
        public int getQuantidade() { return quantidade; }
        public double getPrecoUnitario() { return precoUnitario; }
        public double getPrecoTotal() { return precoTotal; }
        public double getPercentualDesconto() { return percentualDesconto; }
        public double getPrecoFinal() { return precoFinal; }
    }
}

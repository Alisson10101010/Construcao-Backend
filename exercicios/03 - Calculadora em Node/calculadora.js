function ensureNumber(value, name = 'valor') {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`O parâmetro "${name}" deve ser um número válido.`);
    }
  }
  

  function somar(a, b) {
    ensureNumber(a, 'a');
    ensureNumber(b, 'b');
    return a + b;
  }
  
  function subtrair(a, b) {
    ensureNumber(a, 'a');
    ensureNumber(b, 'b');
    return a - b;
  }
  
  function multiplicar(a, b) {
    ensureNumber(a, 'a');
    ensureNumber(b, 'b');
    return a * b;
  }
  
  function dividir(a, b) {
    ensureNumber(a, 'a');
    ensureNumber(b, 'b');
    if (b === 0) throw new Error('Divisão por zero não é permitida.');
    return a / b;
  }
  

  function aoQuadrado(a) {
    ensureNumber(a, 'a');
    return a * a;
  }
  
  function raizQuadrada(a) {
    ensureNumber(a, 'a');
    if (a < 0) throw new Error('Não é possível calcular a raiz quadrada de número negativo.');
    return Math.sqrt(a);
  }
  
  module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir,
    aoQuadrado,
    raizQuadrada,
  };
  
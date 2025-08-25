const { CalcularNotaA1, CalcularNotaA2, CalcularNotaFinal } = require('./CalculadoraNota')

console.log ("#### Projeto 02 - Calculadora de Nota ####")

let prompt = require ('prompt-sync') ()

let nome = prompt ("Qual é o seu nome ?")

console.log ( "Olá" + nome )

let {calcularNotaA1, calcularNotaA2, calcularNotaFinal} = require ('./CalculadoraNota')

console.log ( "###Calculando Nota A1###")
let exercicioA1 = parseFloat(prompt("Qual a sua nota do exercicio ?"))
let trabalhoA1 = parseFloat(prompt("Qual a sua nota do trabalho ?"))
let provaA1 = parseFloat(prompt("Qual a sua nota do prova ?"))
let notaA1 = calcularNotaA1 ( exercicioA1, trabalhoA1, provaA1)

console.log ("Nota A1 calculada:" + notaA1)
console.log ("#### Finalizado calculo do aluno ###")

console.log ("#### Finalizado calculo NotaA2 ###")
let exercicioA2 = parseFloat(prompt("Qual a sua nota do exercicio ?"))
let trabalhoA2 = parseFloat(prompt("Qual a sua nota do trabalho ?"))
let provaA2 = parseFloat(prompt("Qual a sua nota do prova ?"))
let notaA2 = calcularNotaA2 ( exercicioA2, trabalhoA2, provaA2)

console.log ("Nota A2 calculada:" + notaA2)
console.log ("Finalizado calculo Nota A2")

console.log ("#### Calculando Media Final ####")
let media = calcularNotaFinal (notaA1, notaA2)

console.log ("Media Final:" + media)

if (media >= 5 ) {
    console.log ("Parabens" + nome + " voce foi aprovado!!!!!")
} else {
    console.log ( nome + " , estude mais, voce foi reprovado!")
}
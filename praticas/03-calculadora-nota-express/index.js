// importar o express
const exepress = require ('express')

//criar uma instancia no meu backend com o express
const app = exepress ()

// intermediarios (Middlewares)

   // intermediario de log
    //toda requisição passara por ele e imprimi no terminal
    // informação de requisição

app.use((req, res, next) => {
    console.log ("Time: ", new Date().toLocaleString())
    console.log ("Metodo", req, method)
    console.log ("Rota", req, url)
    next ()

})


//Helo World
// reg -> a requisição ( os dados da requisição)
// manipulador de resposta
// next -> chama o proximo intermediario 
app.get ('hello', (req, res, next ) => {
// envio da resposta
res.send('Hello World!!')
})

//endpoint da minha API
app.get ('/pessoas', (req, res, next) => {
    const pessoas = [
        {
        id: 1, 
        nome: "Joao Pedro"
    },
{
    id: 2,
    nome: "Ana Paula"
}

]
res.json(pessoas)
})

// executar a aplicação escolhendo a porta que ela vai executar 
app.listen(3000, () => {
    console.log("Minha aplicação esta rodando em http://localhost:3000")
})
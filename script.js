const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let gravidade = 0.5

let gameOver = false
document.addEventListener("click", (e) => {
    if (gameOver==true){
        location.reload()
    }
})

document.addEventListener('keypress', (e) =>{
    if (e.code == 'Space' && personagem.pulando == false){
        personagem.velocidadey = -15
        personagem.pulando = true
    }
})


const personagem = {
    posicaox:50,
    posicaoy: canvas.height -50,
    largura: 50,
    altura: 50,
    velocidadey: 0,
    pulando: false
}
function desenhaPersonagem () {
    ctx.fillStyle = 'white'
    ctx.fillRect(personagem.posicaox, personagem.posicaoy, personagem.largura, personagem.altura)
}
function atualizaPersonagem (){
    if(personagem.pulando == true){
        personagem.velocidadey += gravidade
        personagem.posicaoy += personagem.velocidadey
        if(personagem.posicaoy>=canvas.height-50){
            personagem.velocidadey = 0
            personagem.pulando=false
        }
    }
}

const obstaculo = {
    posicaoXObstaculo: canvas.width-100,
    posicaoYObstaculo: canvas.height - 100,
    altura: 100,
    largura: 50,
    velocidade: 5
}
function desenhaObstaculo (){
    ctx.fillStyle = 'red'
    ctx.fillRect(
        obstaculo.posicaoXObstaculo,
        obstaculo.posicaoYObstaculo,
        obstaculo.largura,
        obstaculo.altura
    )
}

function atualizaObstaculo(){
    obstaculo.posicaoXObstaculo -= obstaculo.velocidade
    if (obstaculo.posicaoXObstaculo <= 0-obstaculo.largura){
        obstaculo.posicaoXObstaculo = canvas.width-100
        let altura_random = (Math.random() * 50)+90
        obstaculo.altura = altura_random
        obstaculo.posicaoYObstaculo = canvas.height - altura_random
        obstaculo.velocidade += 0.5
    }
}

function verificaColisao(){
    if(
        personagem.posicaox < obstaculo.posicaoXObstaculo + obstaculo.largura &&
        personagem.posicaox + personagem.largura > obstaculo.posicaoXObstaculo &&
        personagem.posicaoy < obstaculo.posicaoYObstaculo + obstaculo.altura &&
        personagem.posicaoy + personagem.altura > obstaculo.posicaoYObstaculo
    ){  
        houveColisao()
    }
}

function houveColisao (){
    obstaculo.velocidade = 0
    atualizaObstaculo()
    ctx.fillStyle='red'
    ctx.fillRect((canvas.width/2)-200,(canvas.height/2)-50,400,100)
    ctx.fillStyle='black'
    ctx.font="50px Arial"
    ctx.fillText("GAME OVER",(canvas.width/2)-150,(canvas.height/2))
    gameOver=true
}

function loop () {
    ctx.clearRect(0,0,canvas.width, canvas.height)

    desenhaObstaculo()
    desenhaPersonagem()
    atualizaObstaculo()
    atualizaPersonagem()
    verificaColisao()
 
    requestAnimationFrame(loop)
}

loop()
const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');
let gameOver = false;
let pontuacao = 0;
let recorde = localStorage.getItem('recorde') || 0;

class Entidade {
    #gravidade;
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5;
    }
    desenhar(ctx, cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
    atualizar() {}
    getGravidade() {
        return this.#gravidade;
    }
}


class Personagem extends Entidade {
    #velocidadey;
    #pulando;
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#velocidadey = 0;
        this.#pulando = false;
    }
    saltar() {
        this.#velocidadey -= 15;
        this.#pulando = true;
    }
    isPersonagemPulando() {
        return this.#pulando;
    }
    atualizar() {
        if (this.#pulando) {
            this.#velocidadey += this.getGravidade();
            this.y += this.#velocidadey;
            if (this.y >= canvas.height - 50) {
                this.#velocidadey = 0;
                this.#pulando = false;
            }
        }
    }
    verificarColisao(obstaculo) {
        if (
            this.x < obstaculo.x + obstaculo.largura &&
            this.x + this.largura > obstaculo.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + this.altura > obstaculo.y
        ) {
            this.#houveColisao();
        }
    }
    #houveColisao() {
        gameOver = true;
        if (pontuacao > recorde) {
            recorde = pontuacao;
            localStorage.setItem('recorde', recorde);
        }
        ctx.fillStyle = 'red';
        ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 100, 400, 150);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText("GAME OVER", (canvas.width / 2) - 80, (canvas.height / 2) - 40);
        ctx.fillText(`Pontuação: ${pontuacao}`, (canvas.width / 2) - 100, (canvas.height / 2));
        ctx.fillText(`Recorde: ${recorde}`, (canvas.width / 2) - 100, (canvas.height / 2) + 40);
    }
    mover(direcao) {
        if (direcao === 'esquerda' && this.x > 0) {
            this.x -= 10;
        } else if (direcao === 'direita' && this.x + this.largura < canvas.width) {
            this.x += 10;
        } else if (direcao === 'baixo' && this.y + this.altura < canvas.height) {
            this.y += 10;
        }
    }
}

class Obstaculo extends Entidade {
    #velocidadex;
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#velocidadex = 4;
    }
    getVelocidadeX() {
        return this.#velocidadex;
    }
    aumentarVelocidade() {
        this.#velocidadex += 0.5;
    }
    atualizar() {
        if (!gameOver) {
            this.x -= this.getVelocidadeX();
            if (this.x <= -this.largura) {
                this.x = canvas.width - 100;
                this.altura = (Math.random() * 50) + 90;
                this.y = canvas.height - this.altura;
                pontuacao++;
                this.aumentarVelocidade();
            }
        }
    }
}

const obstaculo = new Obstaculo(canvas.width - 100, canvas.height - 100, 50, 100);
const personagem = new Personagem(50, canvas.height - 50, 50, 50);

document.addEventListener('click', () => {
    if (gameOver) {
        location.reload();
    }
});

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.isPersonagemPulando()) {
        personagem.saltar();
    } else if (e.code === 'KeyA') {
        personagem.mover('esquerda');
    } else if (e.code === 'KeyD') {
        personagem.mover('direita');
    } else if (e.code === 'KeyS') {
        personagem.mover('baixo');
    }
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 20);
    ctx.fillText(`Recorde: ${recorde}`, 10, 40);
    
    obstaculo.desenhar(ctx, 'red');
    personagem.desenhar(ctx, 'white');
    personagem.verificarColisao(obstaculo);
    obstaculo.atualizar();
    personagem.atualizar();
    
    if (!gameOver) {
        requestAnimationFrame(loop);
    }
}

loop();

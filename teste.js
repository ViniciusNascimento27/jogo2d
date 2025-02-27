class Veiculo {
    #velocidade
    #marca
    constructor(propriedades, velocidade=0, passageiros=[]) {
        this.tipo = propriedades.tipo;
        this.ano = propriedades.ano;
        this.#marca = propriedades.marca;
        this.cor = propriedades.cor;
        this.#velocidade = velocidade
        this.passageiros = passageiros
    }
    acelerar = function () {
        this.#velocidade += 10
        console.log('a velocidade atual é ', this.#velocidade)
    }
    freiar = function () {
        this.#velocidade -= 5
        console.log('a velocidade atual é ', this.#velocidade)
    }
    pegarVelocidade = function () {
        return this.#velocidade
    }
    getMarca = function () {
        return this.#marca
    }

}

class Carro extends Veiculo{
    constructor(propriedades){
        super(propriedades)
        this.tipo = 'Carro'
        this.marca = this.getMarca()
    }
}
class Barco extends Veiculo{
    #noz
    constructor(propriedades){
        super(propriedades)
        this.tipo = 'Barco'
        this.#noz = propriedades.noz
        this.marina = propriedades.marina
    }
    acelerar = function (){
        this.#noz += 1
        console.log(`a velocidade relativa do barco é ${this.#noz}`)
    }
    freiar = function (){
        this.#noz -= 0.5
        console.log(`a velocidade relativa do barco é ${this.#noz}`)
    }
}
class Aviao extends Veiculo{
    #mach
    constructor(propriedades){
        super(propriedades)
        this.tipo = 'Aviao'
        this.#mach = propriedades.mach
    }
    acelerar = function (){
        this.#mach += 0.1
        console.log(`a velocidade relativa do aviao é ${this.#mach}`)
    }
    freiar = function (){
        this.#mach -= 0.05
        console.log(`a velocidade relativa do aviao é ${this.#mach}`)
    }
}

let propriedadesCarro = { 
    ano: 2020,
    marca: 'Renault', 
    cor: 'prata'
}
let propriedadesBarco = { 
    ano: 2025,
    marca: 'Focker', 
    cor: 'branca',
    marina:'itajai',
    noz:0
}
let propriedadesAviao = { 
    ano: 2006,
    marca: 'Embraer', 
    cor: 'branca',
    mach:0
}
let propriedadesCarro2 = { 
    ano: 2025,
    marca: 'Ferrari', 
    cor: 'vermelha'
}
const carro = new Carro(propriedadesCarro)
const outroCarro = new Carro(propriedadesCarro2)
const barco = new Barco(propriedadesBarco)
const aviao = new Aviao(propriedadesAviao)

console.log(carro)
console.log(barco)
console.log(aviao)
carro.acelerar()
carro.acelerar()
carro.acelerar()
carro.freiar()
carro.acelerar()
carro.freiar()
aviao.acelerar()
aviao.acelerar()
aviao.acelerar()
aviao.acelerar()
aviao.freiar()
barco.acelerar()
barco.freiar()

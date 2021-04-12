var cartaMillennium = {
    nome: "Millennium Falcon",
    imagem: "https://s2.glbimg.com/coHwdDkMeRVO9T2A_v1EIWLuHTE=/e.glbimg.com/og/ed/f/original/2019/08/27/31618033034_1dcde167ed_k.jpg",
    atributos: {
        velocidade: 1200, //km/h
        carga: 100000, //kg
        armamento: 7 //numero
    }
}

var cartaTieLN = {
    nome: "Caça estelar TIE/LN",
    imagem: "https://static.wikia.nocookie.net/ptstarwars/images/d/db/Tiefighter.jpg",
    atributos: {
        velocidade: 1200, //km/h
        carga: 65, //kg
        armamento: 4
    }
}

var cartaXwing = {
    nome: "T-65 X-wing",
    imagem: "http://1.bp.blogspot.com/_i9YbREpfcd4/S_2GECJlYaI/AAAAAAAAALc/JsQrkcsIfLA/s1600/xwing.jpg",
    atributos: {
        velocidade: 1050,
        carga: 110,
        armamento: 6
    }
}

var cartaTieSA = {
    nome: "Bombardeiro TIE/SA",
    imagem: "https://static.wikia.nocookie.net/starwars/images/1/17/TIE_Bomber_BF2.png",
    atributos: {
        velocidade: 850,
        carga: 200,
        armamento: 8
    }
}

var cartaImperial = {
    nome: "Classe Imperial-I",
    imagem: "https://static.wikia.nocookie.net/ptstarwars/images/c/c8/Imperial-Star-Destroyer.png",
    atributos: {
        velocidade: 975,
        carga: 10000,
        armamento: 150
    }
}

var cartaInterceptador = {
    nome: "TIE/IN Interceptador",
    imagem: "https://static.wikia.nocookie.net/starwars/images/6/65/Tieinter2.jpg",
    atributos: {
        velocidade: 2000,
        carga: 100,
        armamento: 10
    }
}

var cartaEstrela = {
    nome: "Estrela da Morte (DS-1)",
    imagem: "http://s2.glbimg.com/DbI2nopMNTs-Wz8PEiOpSjPeu9g=/e.glbimg.com/og/ed/f/original/2015/12/18/estrela-da-morte.jpg",
    atributos: {
        velocidade: 1079252848,
        carga: 100000000,
        armamento: 1000
    }
}

var cartaTantive = {
    nome: "Tantive IV",
    imagem: "https://static.wikia.nocookie.net/ptstarwars/images/1/12/MP-Tantive.png",
    atributos: {
        velocidade: 950,
        carga: 3000000,
        armamento: 6
    }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaMillennium, cartaTieSA, cartaTieLN, cartaXwing, cartaInterceptador, cartaImperial, cartaEstrela, cartaTantive]
//            0           1           2          3         4            5            6           7     

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeCartas()

function atualizaPlacar() {
  var divPlacar = document.getElementById('placar')
  var html = "Jogador " + pontosJogador + " x " + pontosMaquina + " Máquina"
  divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
 
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }
  
    if (cartas.length == 0) {
      alert("Fim de jogo") 
      if (pontosJogador > pontosMaquina) {
        htmlResultado = "<p class='resultado-final'>Venceu</p>"
      } else if (pontosMaquina < pontosJogador) {
        htmlResultado = "<p class='resultado-final'>Perdeu</p>"
      } else {
        htmlResultado = "<p class='resultado-final'>Empatou</p>"
      }
    } else {
      document.getElementById('btnProximaRodada').disabled = false
    }

    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true
    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function atualizaQuantidadeCartas() {
 var divQuantidadeCartas = document.getElementById('quantidade-cartas')
 var html = "Quantidade de cartas no jogo: " + cartas.length
 divQuantidadeCartas.innerHTML = html
}

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = ""
}

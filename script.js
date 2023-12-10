// use o modo estrito para evitar erros e bugs
'use strict'

// obtenha o objeto document, as colunas e o botão de reset
const _ = document,
          cols = Array.from(_.querySelectorAll('.board > span')),
					reset = _.querySelector('#reset')

const vitoria = new Audio('../sons/vitoria.mp3'); // criando som de vitória

// defina uma variável booleana para acompanhar o jogador atual
let cur = true

// defina um array para armazenar o estado do tabuleiro
let arr = new Array(9).fill(null)

// defina um array de possíveis combinações vencedoras
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// defina uma função para adicionar ou remover ouvintes de eventos nas colunas
function event(can) {
  // adicione um ouvinte de clique ao botão de reset
	reset.addEventListener('click', fnreset)
  for(let col of cols)
    if(can)
      // adicione um ouvinte de clique a cada coluna
      col.addEventListener('click', play)
    else
      // remova o ouvinte de clique de cada coluna
      col.removeEventListener('click', play)
}

// chame a função event com true como argumento para habilitar os ouvintes
event(true)

// defina uma função para lidar com o evento de clique em uma coluna
function play(e) {
  // obtenha o elemento alvo do evento
  const __ = e.target
  // verifique se o elemento alvo está vazio
  if(!__.innerHTML){
    // alterne o jogador atual
    cur = !cur
    // defina o HTML interno do elemento alvo para O ou X dependendo do jogador atual
    __.innerHTML = cur ? '<h1 name="O">O</h1>' :  '<h1 name="X">X</h1>'
    // chame a função move com o índice e o sinal do elemento alvo
    move(parseInt(__.id.split(/\D+/g)[1]), __.childNodes[0].getAttribute('name'))
  }
}

// defina uma função para mover o sinal no tabuleiro
function move(ind, sign) {
  // atribua o sinal ao array na posição do índice
  arr[ind] = sign
  // mostre o array no console
  console.log(arr)

  // percorra o array de combinações vencedoras
  for (let i = 0; i < wins.length; i++) {
     // obtenha os índices de cada combinação
     let [a, b, c] = wins[i] 
      // verifique se os sinais nas posições correspondem
      if(cmp(arr[a], arr[b], arr[c])){
        // mostre o sinal vencedor no console
        console.log(sign, ' wins')
        // desabilite os ouvintes de eventos
        event(false)
        // adicione uma classe de vitória às colunas vencedoras
        vitoria.play();
        cols[a].classList.add('win')
        cols[b].classList.add('win')
        cols[c].classList.add('win')
      }
  }
}

// defina uma função para comparar os sinais
function cmp(a, b, c) {
  // verifique se os sinais existem
  if(a && b && c)
    // retorne verdadeiro se os sinais forem iguais
    return (a === b) && (a === c) && (b === c)
}

// defina uma função para reiniciar o jogo
function fnreset() {
    // percorra as colunas
    for(let col of cols){
      // remova a classe de vitória
      col.classList.remove('win')
      // limpe o HTML interno
      col.innerHTML = ''
    }
    // redefina o array
    arr = new Array(9).fill(null)
    // habilite os ouvintes de eventos
    event(true)
}

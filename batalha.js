//Batalha Naval 
//por Murilo Röedel


const prompt = require('prompt-sync')();
console.log('------------Bem-vindo ao Batalha Naval!-------------');
console.log('Você tem 10 tiros para afundar 3 navios escondidos em um tabuleiro 5x5.');
console.log('As coordenadas vão de 0 a 4 para linhas e colunas. Boa sorte!');
console.log('----------------------------------------------------');
console.log('Legenda: ~ = água, X = acerto, O = erro');
//tabuleiro 5x5
let tabuleiro = [
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~']
];

let tabuleiroVisivel = [
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~'],
  ['~', '~', '~', '~', '~']
];

let tiros = 10;
let navios = 3;

//função para exibir o tabuleiro
function exibirTabuleiro() {
  console.log('  0 1 2 3 4');
    for (let i = 0; i < tabuleiroVisivel.length; i++) {
        let linha = i + ' ';
        for (let j = 0; j < tabuleiroVisivel[i].length; j++) {
            linha += tabuleiroVisivel[i][j] + ' ';
        }
        console.log(linha);
    }
}
//função para posicionar navios aleatoriamente
function posicionarNavios() {
  let posicionado = 0;
    while (posicionado < navios) {
        let linha = Math.floor(Math.random() * 5);
        let coluna = Math.floor(Math.random() * 5);
        if (tabuleiro[linha][coluna] === '~') {
            tabuleiro[linha][coluna] = 'Navio';
            posicionado++;
        }
    }
}
posicionarNavios();

//função para atirar
function atirar(linha, coluna) {
  if (linha < 0 || linha >= 5 || coluna < 0 || coluna >= 5) {
    console.log('Coordenadas inválidas. Tente novamente.');
    return;
  }
  if (tabuleiroVisivel[linha][coluna] !== '~') { 
    console.log('------------Você já atirou aqui. Tente outro lugar.--------------');
    return;
  }

  if (tabuleiro[linha][coluna] === 'Navio') { 
    console.log('----------Acertou um navio!-------------');
    tabuleiroVisivel[linha][coluna] = 'X'; 
    navios--;
  } else { 
    console.log('-----------Água!--------------');
    tabuleiroVisivel[linha][coluna] = 'O'; 
  }
}


//início da rodada do jogo
while (tiros > 0 && navios > 0) { 
    console.log('Fique de olho no mar:');
    exibirTabuleiro();
    let linha = parseInt(prompt('Digite a linha (0-4): '));
    let coluna = parseInt(prompt('Digite a coluna (0 a 4): '));
    atirar(linha, coluna);
    tiros--;
    console.log(`Tiros restantes: ${tiros}`);
    console.log(`Navios restantes: ${navios}`);
}

//mensagem final
exibirTabuleiro();
if (navios === 0) {
    console.log('Parabéns! Você afundou todos os navios!');
} else {
    console.log('Fim de jogo! Você ficou sem tiros.');
}
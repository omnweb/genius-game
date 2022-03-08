let order = [];
let clickedOrder = [];
let level = 0;

/* 
 * Números e respectivas cores
    0 = red, 
    1 = green, 
    2 = blue
    3 = yellow, 
*/

const red = document.querySelector(".red");
const green = document.querySelector(".green");
const blue = document.querySelector(".blue");
const yellow = document.querySelector(".yellow");

const redAudio = document.querySelector(".redAudio");
const greenAudio = document.querySelector(".greenAudio");
const blueAudio = document.querySelector(".blueAudio");
const yellowAudio = document.querySelector(".yellowAudio");


//* Função de sortear a orderm de acendimento

let randomOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    setTimeout(() => {
        let elementColor = createColorElement(order[i]);
        brightnessColor(elementColor, Number(i) + 1);
    }, 500);
  }
};

//* Função que adiciona e remove o brilho conforme sorteio
let brightnessColor = (element, number) => {
  number = number * 500;

  setTimeout(() => {
    element.classList.add("selected");
    soundEffectAdd(element.classList[0])
    setTimeout(() => {
      element.classList.remove("selected");
    }, number - 100);
  }, number - 150)

};

//* Compara os arrays de ordem sorteada com a order clicada
let compareOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      setTimeout(() => {
        gameOver();
      }, 1000);
      break; //para a iteração do for
    }
  }

  if (clickedOrder.length == order.length) {
      setTimeout(() => {          
        nextLevel();
      }, 1000);
    }
};

//* Adiciona e remove o brilho conforme o clique
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");
  soundEffectAdd(color);  

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    compareOrder();
  }, 250);
};

//* Retorna a cor de acordo com o número de 1 a 4 sorteado
let createColorElement = (color) => {
    if ( color === 0 ) {
        return red;
    } else if ( color === 1 ) {  
        return green;
    } else if ( color === 2 ) { 
        return blue;
    } else if ( color === 3 ) {   
        return yellow;
    }
};

//* Função retorna o efeito sonoro
let soundEffectAdd = (color) => {
  if ( color === 'red' || color === 0) {
      return redAudio.play();
  } else if ( color === 'green' || color === 1) {
      return greenAudio.play();
  } else if ( color === 'blue' || color === 2) {
      return  blueAudio.play();
  } else if ( color === 'yellow' || color === 3) {
      return yellowAudio.play();;
  }
}

//* Função para passar de nível
// Soma o level e sorteia nova sequencia
let nextLevel = () => {
  randomOrder();
  level++;
};

// Função que encerra o jogo
let gameOver = () => {
  alert(
    `Pontuação: ${level} \n Jogo Encerrado \n Clique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];
  playGame();
};


let playGame = () => {
  alert("Bem vindo ao Genius!!");
  level = 0;
  nextLevel();
};

red.onclick = () => click(0);
green.onclick = () => click(1);
blue.onclick = () => click(2);
yellow.onclick = () => click(3);

playGame();
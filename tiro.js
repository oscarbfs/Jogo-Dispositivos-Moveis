//Arquivo: tiro.js
//Função construtura para objeto tiro

var SOM_TIRO = new Audio();
SOM_TIRO.src = 'snd/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

function Tiro(context, vaca, teclado) {
   this.context = context;
   this.vaca = vaca;
   // Posicionar o tiro no bico da vaca | Começa na posição de x e centraliza o tiro no bico da vaca
   this.velocidade = 400;
   this.largura = 3;
   this.altura = 10;   
   this.x = vaca.x + 65;  // 36 / 2
   this.y = vaca.y + 35;
   if (teclado.pressionada(SETA_ESQUERDA)) {
      this.x = vaca.x + 15;
      this.y = vaca.y + 70;
   } else if(teclado.pressionada(SETA_DIREITA)) {
      this.x = vaca.x + 115;
      this.y = vaca.y + 70;
   }
   
   this.cor = 'yellow';
   SOM_TIRO.currentTime = 0.0;
   SOM_TIRO.play();
}

/*Devemos cronometrar o movimento do 'Tiro' aplicando no método 
'atualizar', a fórmula a seguir: 

O incremento da posição do sprite, em pixels = 
velocidade * tempoDecorrido / 1000

Sendo:

• 'velocidade' em pixels por segundo;
• 'tempoDecorrido' em segundos (como o tempo dado por 'Date.getTime()' 
é em milissegundos, dividimos esse valor por 1000).

Podemos ajustar novas velocidades com valores maiores.*/

Tiro.prototype = {
   atualizar: function() {
      //Sobe na tela, subtraindo a posição y
      this.y -= this.velocidade * this.animacao.decorrido / 1000;
      
      // Excluir o tiro quando sumir da tela
      if (this.y < -this.altura) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   },
   desenhar: function() {
      //imgVaca.src = 'image/vaca.png'
      var ctx = this.context;
      //Salvar a cofiguração e subir na pilha
      ctx.save();
      //Define cor da imagem
      ctx.fillStyle = this.cor;
      ctx.fillRect(this.x, this.y, this.largura, this.altura);
      //Voltamos para o nível anterior na pilha
      ctx.restore();
   },
   //Tratar colisão | Definir retângulos de colisão
   retangulosColisao: function() {
      return [ {x: this.x, y: this.y, largura: this.largura,
            altura: this.altura} ];
   },
   colidiuCom: function(outro) {
   
   }
}

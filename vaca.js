//Arquivo: vaca.js
//Função construtura para objeto vaca
/*No construtor da classe 'Vaca', vamos iniciar o objeto que 
 controla a spritesheet. Usaremos inicialmente a linha zero, 
 que representa a vaca parada. */

function Vaca(context, teclado, imagem, imgExplosao) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;
   //O sprite inicia na linha 3 e coluna 2
   this.spritesheet = new Spritesheet(context, imagem, 4, 4);
   this.spritesheet.linha = 0;
   this.spritesheet.intervalo = 100;
   this.imgExplosao = imgExplosao;
   this.acabaramVidas = null;
   this.vidasExtras = 3;
}
/*Devemos cronometrar o movimento da 'Vaca' aplicando no método 
'atualizar', a fórmula a seguir: 

O incremento da posição do sprite, em pixels = 
velocidade * tempoDecorrido / 1000

Sendo:

• 'velocidade' em pixels por segundo;
• 'tempoDecorrido' em segundos (como o tempo dado por 'Date.getTime()' 
é em milissegundos, dividimos esse valor por 1000).

Podemos ajustar novas velocidades com valores maiores em 
'vaca.velocidade' da página HTML.*/

Vaca.prototype = {
   /*São quatro 'if', sem o uso do 'else', para permitir que 
   mais de uma seta possam estar pressionadas ao mesmo tempo.
   Isso permite mover a vaca na diagonal.*/
   atualizar: function() {
      var incremento = 
          this.velocidade * this.animacao.decorrido / 1000;
      
      if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
         this.x -= incremento;
         
      if (this.teclado.pressionada(SETA_DIREITA) && 
               this.x < this.context.canvas.width - 100)
         this.x += incremento;
         
      if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
         this.y -= incremento;
         
      if (this.teclado.pressionada(SETA_ABAIXO) &&
               this.y < this.context.canvas.height - 120)
         this.y += incremento;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   /*Tratando a spritesheet da vaca:
   - Selecionar o quadro da spritesheet
   - Para definir a linha a ser animada, lemos o estado das setas do teclado
   */
   desenhar: function() {
      if (this.teclado.pressionada(SETA_ESQUERDA))
         this.spritesheet.linha = 1;
      else if (this.teclado.pressionada(SETA_DIREITA))
         this.spritesheet.linha = 3;
      else if (this.teclado.pressionada(SETA_ABAIXO))
         this.spritesheet.linha = 2;
      else
         this.spritesheet.linha = 0;      
      
      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   atirar: function() {
      var t = new Tiro(this.context, this, this.teclado);
      this.animacao.novoSprite(t);
      this.colisor.novoSprite(t);
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   //Tratar as colisões | Definir retângulos de colisão
   retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets = 
      [ 
         {x: this.x+50, y: this.y+40, largura: 30, altura: 60},
      ];
      
      if (this.teclado.pressionada(SETA_ESQUERDA) || this.teclado.pressionada(SETA_DIREITA)) {
         rets[0].x = this.x+30;
         rets[0].y = this.y+50;
         rets[0].largura = 60;
         rets[0].altura = 30;
      }
      
      // Desenhando os retângulos para visualização | Comentar após concluir modificações
      var ctx = this.context;
      
      for (var i in rets) {
         ctx.save();
         ctx.strokeStyle = 'yellow';
         ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
                        rets[i].altura);
         ctx.restore();
      }
      
      return rets;
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   colidiuCom: function(outro) {
      // Se colidiu com um Ovni...
      if (outro instanceof Ovni) {
         this.animacao.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(this);
         this.colisor.excluirSprite(outro);
         
         var exp1 = new ExplosaoCarne(this.context, this.imgExplosao,
                                 this.x, this.y);
         // var exp2 = new Explosao(this.context, this.imgExplosao,
         //                         outro.x, outro.y);
         
         this.animacao.novoSprite(exp1);
         // this.animacao.novoSprite(exp2);
         
         var vaca = this;
         exp1.fimDaExplosao = function() {
            vaca.vidasExtras--;
            
            if (vaca.vidasExtras < 0) {
               if (vaca.acabaramVidas) vaca.acabaramVidas();
            }
            else {
               // Recolocar a vaca no engine
               vaca.colisor.novoSprite(vaca);
               vaca.animacao.novoSprite(vaca);
               
               vaca.posicionar();
            }
         }
      }
   },//Não esquecer dessa vírgula sempre que for criar um novo método.

   /*Na imagem 'vaca-spritesheet.png' temos a vaca parada, movendo-se 
   para a esquerda e movendo-se para a direita. Em uma linha, a 
   animação ocorre avançando as colunas. Em cada uma destas linhas, 
   há duas colunas que animam o fogo na cauda. */
   posicionar: function() {
      var canvas = this.context.canvas;
      this.x = canvas.width / 2 - 100;  // 36 / 2
      this.y = canvas.height - 100;
   }
}

        /*}
        1) drawImage(imagem, x, y, largura, altura): desenha a imagem
        inteira, na posição e tamanho especificados
        
        2) drawImage(imagem, xOrigem, yOrigem, larguraOrigem, alturaOrigem, 
        xDestino, yDestino, larguraDestino, alturaDestino): desenha parte 
        da imagem.*/

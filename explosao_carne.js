//Arquivo: explosao_carne.js
//Função construtura para objeto explosão

var SOM_EXPLOSAO_CARNE = new Audio();
SOM_EXPLOSAO_CARNE.src = 'snd/facada.mp3';
SOM_EXPLOSAO_CARNE.volume = 0.4;
SOM_EXPLOSAO_CARNE.load();

function ExplosaoCarne(context, imagem, x, y) {
   this.context = context;
   this.imagem = imagem;

   //Definindo o quadro do spritesheet | linha 1 e coluna 5
   this.spritesheet = new Spritesheet(context, imagem, 1, 4);
   //Definir um intervalo de tempo para mudança de quadro
   this.spritesheet.intervalo = 100;
   this.x = x;
   this.y = y;
   this.animando = false;
   
   var explosao = this;
   this.fimDaExplosao = null;
   this.spritesheet.fimDoCiclo = function() {
      explosao.animacao.excluirSprite(explosao);
      if (explosao.fimDaExplosao) explosao.fimDaExplosao();
   }
   
   SOM_EXPLOSAO_CARNE.currentTime = 0.0;
   SOM_EXPLOSAO_CARNE.play();
}
ExplosaoCarne.prototype = {
   atualizar: function() {
      
   },//Não esquecer dessa vírgula sempre que for criar um novo método.
   //Desenhamos o quadro atual e animamos a spritesheet
   desenhar: function() {
      this.spritesheet.desenhar(this.x, this.y);
      this.spritesheet.proximoQuadro();
   }
}
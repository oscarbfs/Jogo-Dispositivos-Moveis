//Arquivo: painel.js
//Função construtura para objeto painel

function Painel(context, vaca) {
   this.context = context;
   this.vaca = vaca;
   this.spritesheet = new Spritesheet(context, vaca.imagem, 3, 2);
   this.pontuacao = 0;
};

Painel.prototype = {
   atualizar: function() {
      
   },
   desenhar: function() {
      // Reduz o desenho pela metade
      this.context.scale(0.5, 0.5);
      
      var x = 20;
      var y = 20;
      
      for (var i = 1; i <= this.vaca.vidasExtras; i++) {
         this.spritesheet.desenhar(x, y);
         x += 40;
      }
      
      // Torna a dobrar
      this.context.scale(2, 2);
      
      // Para facilitar um pouco.
      var ctx = this.context;
      
      // Pontuação
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '18px sans-serif';
      ctx.fillText(this.pontuacao, 100, 27);
      ctx.restore();   
   },

   resetar: function (context, vaca) {
      this.context = context;
      this.vaca = vaca;
      this.spritesheet = new Spritesheet(context, vaca.imagem, 3, 2);
      this.pontuacao = 0;
   }
}

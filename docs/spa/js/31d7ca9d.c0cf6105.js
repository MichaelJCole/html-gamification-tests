(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["31d7ca9d"],{"156d":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{nativeOn:{keydown:function(t){return e.console.log(t)}}},[i("canvas",{attrs:{id:"myCanvas",width:"900",height:"500"}}),i("p",[e._v("Move to the right, dodging the blocks with <- and -> arrows")])])},s=[],h=i("fc74"),a=i.n(h),o=i("59a1"),r=i.n(o),c=function(){function e(t,i,n,s,h,o,r){a()(this,e),this.x=t,this.y=i,this.width=n,this.height=s,this.color=h,this.speed=o,this.dy=o,this.maxY=r}return r()(e,[{key:"draw",value:function(e){e.fillStyle=this.color,e.fillRect(this.x,this.y,this.width,this.height)}},{key:"move",value:function(e,t){this.x+=e,this.y+=t}},{key:"go",value:function(){this.y<0&&(this.dy=this.speed),this.y>this.maxY-this.height&&(this.dy=-this.speed),this.move(0,this.dy)}}]),e}(),d=function(){function e(t){a()(this,e),this.gameOver=!1,this.drawingContext=t,this.screenWidth=t.canvas.width,this.screenHeight=t.canvas.height,this.controls={dx:0},this.player=new c(150,200,50,50,"rgb(255,255,55)",2,this.screenHeight),this.rectangles=[new c(250,50,50,50,"rgb(0,0,255)",2,this.screenHeight),new c(450,450,50,50,"rgb(0,0,255)",4,this.screenHeight),new c(650,150,50,50,"rgb(0,0,255)",3,this.screenHeight)],this.goal=new c(this.screenWidth-50,0,50,this.screenHeight,"rgb(255,255,55)")}return r()(e,[{key:"keyDown",value:function(e){switch(e.keyCode){case 37:this.controls.dx=-1;break;case 39:this.controls.dx=1;break}}},{key:"keyUp",value:function(e){switch(e.keyCode){case 37:case 39:this.controls.dx=0;break}}},{key:"setup",value:function(){this._saveKeyDown=this.keyDown.bind(this),this._saveKeyUp=this.keyUp.bind(this),window.document.addEventListener("keydown",this._saveKeyDown),window.document.addEventListener("keyup",this._saveKeyUp)}},{key:"teardown",value:function(){window.document.removeEventListener("keydown",this._saveKeyDown),window.document.removeEventListener("keyup",this._saveKeyUp)}},{key:"update",value:function(){this.player.move(this.player.speed*this.controls.dx,0),this.rectangles.forEach(function(e){e.go()})}},{key:"draw",value:function(){var e=this;this.drawingContext.clearRect(0,0,this.screenWidth,this.screenHeight),this.rectangles.forEach(function(t){t.draw(e.drawingContext)}),this.goal.draw(this.drawingContext),this.player.draw(this.drawingContext)}},{key:"step",value:function(){this.update(),this.draw(),this.checkEnd(),this.gameOver||window.requestAnimationFrame(this.step.bind(this))}},{key:"checkEnd",value:function(){var e=this;this.gameOver||(this.checkCollision(this.goal,this.player)&&this.endGame("You Win!"),this.rectangles.forEach(function(t){e.checkCollision(t,e.player)&&e.endGame("Game over!")}))}},{key:"endGame",value:function(e){this.gameOver=!0,alert(e),window.location="crossing-canvas"}},{key:"checkCollision",value:function(e,t){var i=Math.abs(e.x-t.x)<=Math.max(e.width,t.width),n=Math.abs(e.y-t.y)<=Math.max(e.height,t.height);return i&&n}}]),e}(),u={data:function(){return{game:!1}},mounted:function(){this.game&&!this.game.gameOver||(this.game=new d(this.$el.querySelector("#myCanvas").getContext("2d"))),this.game.setup(),this.game.step()},methods:{move:function(e){this.game&&(this.game.controls.dy=e),console.log(e)}},destroyed:function(){this.game.teardown()}},l=u,w=(i("9a92"),i("42e1")),g=Object(w["a"])(l,n,s,!1,null,null,null);t["default"]=g.exports},"59a1":function(e,t,i){var n=i("85f2");function s(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),n(e,s.key,s)}}function h(e,t,i){return t&&s(e.prototype,t),i&&s(e,i),e}e.exports=h},"9a92":function(e,t,i){"use strict";var n=i("cf24"),s=i.n(n);s.a},cf24:function(e,t,i){},fc74:function(e,t){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}e.exports=i}}]);
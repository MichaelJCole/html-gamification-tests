(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["44cd3b49"],{"24d9":function(t,e,i){t.exports=i.p+"82804a2a5e1d4770d72f2f8566fe7523.png"},"41ca":function(t,e,i){t.exports=i.p+"64e8dba1d5dbe6f7900541d35277df6d.png"},"4d22":function(t,e,i){t.exports=i.p+"074117f4ba5a5c2d070ebda86ddee252.png"},"67d9":function(t,e,i){t.exports=i.p+"95844b5bfb99e5af3c24cd8e86e45128.png"},c982:function(t,e,i){t.exports=i.p+"40f736eedf53497544dd9c04583c3911.png"},dd15:function(t,e,i){t.exports=i.p+"94b0131a2fba53a52e8670550e23c775.png"},f6ef:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-page",{staticClass:"flex flex-center"},[i("vue-phaser",{attrs:{game:t.game}})],1)},a=[],n=i("4409"),h=i("fc74"),c=i.n(h),o=i("59a1"),r=i.n(o),d=i("6430"),l=i.n(d),p=i("ffe3"),u=i.n(p),f=i("37d9"),g=i.n(f),y=i("64b8"),m=i.n(y),k=function(t){function e(){return c()(this,e),l()(this,u()(e).call(this,"Loading"))}return g()(e,t),r()(e,[{key:"preload",value:function(){this.load.spritesheet("pet",i("24d9"),{frameWidth:97,frameHeight:83,margin:1,spacing:1})}},{key:"create",value:function(){var t=this.sys.game.config;this.anims.create({key:"funnyfaces",frames:this.anims.generateFrameNames("pet",{frames:[0,1,2,3]}),frameRate:7,yoyo:!0,repeat:0}),this.textBackground=this.add.graphics(),this.textBackground.fillStyle("purple",.5),this.textBackground.fillRect(35,180,295,75),this.text=this.add.text(t.width/2,t.height/2-100,"😊 Virtual Pet!",{font:"40px Arial",fill:"white"}),this.text.setOrigin(.5),this.pet=this.add.sprite(180,360,"pet",0).setInteractive(),this.pet.play("funnyfaces"),this.pet.on("animationcomplete",function(){this.pet.play("funnyfaces")},this),this.progressBar=this.add.graphics(),this.progressBar.fillStyle(10035865,1),this.load.image("backyard",i("4d22")),this.load.image("apple",i("dd15")),this.load.image("candy",i("67d9")),this.load.image("rotate",i("c982")),this.load.image("toy",i("41ca")),this.load.on("progress",function(t){this.progressBar.clear(),this.progressBar.fillRect(170,385,20,140*(1-t))},this),this.load.on("complete",function(t){this.scene.start("Home")},this),this.load.start()}}]),e}(m.a.Scene),x=function(t){function e(){return c()(this,e),l()(this,u()(e).call(this,"Home"))}return g()(e,t),r()(e,[{key:"create",value:function(){var t=this.sys.game.config;this.background=this.add.sprite(0,0,"backyard").setInteractive(),this.background.setOrigin(0,0),this.textBackground=this.add.graphics(),this.textBackground.fillStyle("purple",.5),this.textBackground.fillRect(35,180,295,75),this.text=this.add.text(t.width/2,t.height/2-100,"😊 Virtual Pet!",{font:"40px Arial",fill:"white"}),this.text.setOrigin(.5),this.pet=this.add.sprite(200,400,"pet",0).setInteractive(),this.background.on("pointerdown",this.startGame,this),this.text.on("pointerdown",this.startGame,this),this.pet.on("pointerdown",this.startGame,this),this.pet.play("funnyfaces"),this.timedEventStats=this.time.addEvent({delay:1e4,repeat:-1,callbackScope:this,callback:function(){this.pet.play("funnyfaces")}})}},{key:"startGame",value:function(){console.log(this),this.scene.start("Game")}}]),e}(m.a.Scene),v=function(t){function e(){return c()(this,e),l()(this,u()(e).call(this,"Game"))}return g()(e,t),r()(e,[{key:"init",value:function(){this.stats={health:100,fun:100},this.scoreDecay={health:-5,fun:-2},this.uiBlocked=!1,this.dead=!1}},{key:"create",value:function(){this.background=this.add.sprite(0,0,"backyard").setInteractive(),this.background.setOrigin(0,0),this.background.on("pointerdown",this.placeItem,this),this.pet=this.add.sprite(200,400,"pet",0).setInteractive(),this.input.setDraggable(this.pet),this.input.on("drag",function(t,e,i,s){e.x=i,e.y=s}),this.appleBtn=this.add.sprite(72,560,"apple").setInteractive(),this.appleBtn.scoreChange={health:20,fun:0},this.appleBtn.on("pointerdown",this.pickItem),this.candyBtn=this.add.sprite(144,560,"candy").setInteractive(),this.candyBtn.scoreChange={health:-10,fun:10},this.candyBtn.on("pointerdown",this.pickItem),this.toyBtn=this.add.sprite(216,560,"toy").setInteractive(),this.toyBtn.scoreChange={health:0,fun:15},this.toyBtn.on("pointerdown",this.pickItem),this.rotateBtn=this.add.sprite(288,560,"rotate").setInteractive(),this.rotateBtn.scoreChange={fun:20},this.rotateBtn.on("pointerdown",this.rotatePet),this.createHud(),this.timedEventStats=this.time.addEvent({delay:1e3,repeat:-1,callbackScope:this,callback:function(){this.updateScore(this.scoreDecay)}})}},{key:"createHud",value:function(){this.healthText=this.add.text(20,20,"Health: "+this.stats.health,{font:"26px Arial",fill:"purple"}),this.funText=this.add.text(20,60,"Fun: "+this.stats.fun,{font:"26px Arial",fill:"purple"})}},{key:"updateScore",value:function(t){if(t)for(var e in t)t.hasOwnProperty(e)&&(this.stats[e]+=t[e]);this.stats.health<0&&(this.stats.health=0),this.stats.fun<0&&(this.stats.fun=0),this.stats.fun&&this.stats.health||this.gameOver(),this.healthText.setText("Health: "+this.stats.health),this.funText.setText("Fun: "+this.stats.fun)}},{key:"gameOver",value:function(){this.dead=!0,this.uiBlocked=!0,this.pet.setFrame(4),this.time.addEvent({delay:3e3,repeat:0,callbackScope:this,callback:function(){this.scene.start("Home")}})}},{key:"uiReady",value:function(){this.selectedItem=!1,this.appleBtn.alpha=1,this.candyBtn.alpha=1,this.toyBtn.alpha=1,this.rotateBtn.alpha=1,this.uiBlocked=!1,this.dead&&(this.uiBlocked=!0)}},{key:"rotatePet",value:function(){if(!this.scene.uiBlocked){this.scene.uiReady(),this.alpha=.5,this.scene.uiBlocked=!0;this.scene.tweens.add({targets:this.scene.pet,duration:600,angle:360,pause:!1,callbackScope:this,onComplete:function(t,e){this.scene.updateScore(this.scoreChange),this.scene.uiReady()}})}}},{key:"pickItem",value:function(){this.scene.uiBlocked||(this.scene.uiReady(),this.scene.selectedItem=this,this.alpha=.5)}},{key:"placeItem",value:function(t,e,i){if(this.selectedItem&&!this.uiBlocked){this.uiBlocked=!0;var s=this.selectedItem,a=this.add.sprite(e,i,s.texture.key);this.tweens.add({targets:this.pet,duration:500,x:a.x,y:a.y,paused:!1,callbackScope:this,onComplete:function(t,e){this.pet.on("animationcomplete",function(){this.uiReady()},this),this.pet.play("funnyfaces"),this.updateScore(s.scoreChange),a.destroy()}})}}}]),e}(m.a.Scene),B={height:640,width:360,title:"Virtual Pet",pixelArt:!1,backgroundColor:"ffffff",scene:[new k,new x,new v]},b={name:"VirtualPet",components:{vuePhaser:n["a"]},computed:{game:function(){return B}}},w=b,I=i("42e1"),S=Object(I["a"])(w,s,a,!1,null,null,null);e["default"]=S.exports}}]);
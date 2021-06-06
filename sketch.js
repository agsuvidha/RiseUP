const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Render = Matter.Render;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

var gameState="play";
var engine, world;
var ballon;
var shapes=[];
var mConstraint;

function preload()
{
    life=loadImage("ballon.png");
}
function setup() 
{
    var canvas = createCanvas(600, 600);
    engine = Engine.create();
    world = engine.world;

    ballon = new Ballon(300, 460, 70, 120);

    ball = new Ball(300, 350, 20, 20);


  lifeA = createSprite(495,35,20,20);
  lifeA.addImage("life", life);
  lifeA.scale = 0.1;
  lifeB = createSprite(515,35,20,20);
  lifeB.addImage("life", life);
  lifeB.scale = 0.1;
  lifeC = createSprite(535,35,20,20);
  lifeC.addImage("life", life);
  lifeC.scale = 0.1;
  lifeD = createSprite(555,35,20,20);
  lifeD.addImage("life", life);
  lifeD.scale = 0.1;
  lifeE = createSprite(575,35,20,20);
  lifeE.addImage("life", life);
  lifeE.scale = 0.1;
  
  lives=[lifeE,lifeD,lifeC,lifeB,lifeA];
}

function draw() 
{
    background("#FCBD70");
    Engine.update(engine);
//    text(mouseX + "," + mouseY, mouseX, mouseY);

    if (frameCount % 20 === 0) {
      shapes.push(new Shape(random(200, 400), 10, 8, 8));
    }
    for (var i = 0; i < shapes.length; i++) {
      shapes[i].display();
    }
    ballon.display();
    ball.display();

    for(var x=0;x<shapes.length;x++)
    {
        var collision = Matter.SAT.collides(ballon.body, shapes[x].body);
        if (collision.collided)
         {
         
             //World.remove(world,shapes[x].body);
             shapes[x].body.position.x=0;
             //shapes.slice(x,1);
            // x--;
           
            lives[lives.length-1].destroy();
            console.log(lives.length);
            lives.pop();
            console.log("collided")
        }
        if(lives.length===0)
        {
          gameState="Lost";
          break;
          //text("Lost");
        }
    }
    if(gameState==="Lost")
    {
        end();
    }
    drawSprites();      
}

function keyPressed()
 {
    if (keyCode === 38)
     {
        Matter.Body.setVelocity(ball.body, { x: 0, y: -5 });
     }
      else if (keyCode === 37)
      {
          Matter.Body.setVelocity(ball.body, { x: -5, y: 0 });
      }
         else if (keyCode === 39) 
      {
          Matter.Body.setVelocity(ball.body, { x: 5, y: 0 });
      }
  }
function end()
{
    swal(
        {
          title: `Game Over!!!`,
          text: "Thanks for playing!!",
          imageUrl:
            "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
          imageSize: "150x150",
          confirmButtonText: "Play Again"
        },
        function(isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        }
      );
}
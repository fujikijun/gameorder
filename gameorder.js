//-------------------------------------------------------------------------
//
// gameorder for Processing
//
// You can download Processing at the following URL.
//                           https://processing.org/
//                                                            by Jun Fujiki
//
//-------------------------------------------------------------------------

let canvas;
let imgBack = 0;
let imgCoin;
let g_imgCoin1, g_imgCoin2;
let g_imgTitle;
let g_imgStart;
let g_vecSozai = [];
let g_vecCoin = [];
let area = [];
let current_area = null;
let imgSprite;
let up=false, down=false, left=false, right=false;
let pup=false, pdown=false, pleft=false, pright=false;
let g_bPlay = false;

let bgm;
let metro;
let sndJump;
let sndPipe;
let sndMiss;
let sndGoal;
let sndCoin;

//------------------------------------------------------------------------------------------
// mouse
//------------------------------------------------------------------------------------------

function mousePressed()
{
  for ( let i=0; i<area.length; i++ )
  {
    area[i].g_Player.reset();
  }
  current_area = area[0];
  current_area.g_Player.state = STATE_STAND;
  g_bPlay = true;

  bgm.stop();
  metro.stop();
  bgm.loop();
}

//------------------------------------------------------------------------------------------
// key
//------------------------------------------------------------------------------------------

function keyPressed()
{  
  switch( key )
  {
  case ' ':
    console.log("start");
    mousePressed();
    break;
  }
  
  switch( keyCode )
  {
  case RIGHT_ARROW:
    right = true;
    break;
  case LEFT_ARROW:
    left = true;
    break;
  case DOWN_ARROW:
    down = true;
    break;
  case UP_ARROW:
    up = true;
    break;
  }
}

function keyReleased()
{
  switch( keyCode )
  {
  case RIGHT_ARROW:
    right = false;
    break;
  case LEFT_ARROW:
    left = false;
    break;
  case DOWN_ARROW:
    down = false;
    break;
  case UP_ARROW:
    up = false;
    break;
  }
}

function preload()
{
  imgSprite = loadImage( "data/sprite.png" );
  imgBack = loadImage( "data/gameborder.jpg" );
  for ( let i=0; i<4; i++ )
  {
    area[i] = new Area( i+1 );
  }
  area[2].robot = new Robot( area[2] );
  area[3].robot = new Robot( area[3] );
  area[2].robot.img = loadImage( "data/robot.png" );
  area[3].robot.img = loadImage( "data/robot2.png" );

  imgCoin = loadImage( "data/coin.png" );
  g_imgTitle = loadImage( "data/title.png" );
  g_imgStart  = loadImage( "data/start.png" );

  bgm = loadSound( 'data/green.wav' );
  metro = loadSound( 'data/metro.wav' );
  sndJump = loadSound( 'data/jump.wav' );
  sndPipe = loadSound( 'data/pipe.wav' );
  sndMiss = loadSound( 'data/miss.wav' );
  sndGoal = loadSound( 'data/goal.wav' );
  sndCoin = loadSound( 'data/coin.wav' );
}

function setup()
{
  canvas = createCanvas( windowWidth, windowHeight );  
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');

  loadSozai();
  g_imgCoin1 = createImage( 16, 16 );
  g_imgCoin1.copy( imgCoin, 0, 0, 16, 16, 0, 0, 16, 16 );
  g_imgCoin2 = createImage( 16, 16 );
  g_imgCoin2.copy( imgCoin, 16, 0, 16, 16, 0, 0, 16, 16 );
  for ( let i=0; i<area.length; i++ )
  {
    area[i].setup();
  }

  let mx;
  area[2].g_Player.START_X = area[2].g_currentStage.pipeMaxX*BASE_SPRITE_SIZE+BASE_SPRITE_SIZE/2;
  area[2].g_Player.reset();
  area[2].robot.g_robotStartLength = 500;
  area[2].robot.g_robotGoalLength = 1132;
  mx = map( area[2].g_Player.START_X, 
    area[2].g_currentStage.pipeMinX*BASE_SPRITE_SIZE, 
    area[2].g_currentStage.pipeMaxX*BASE_SPRITE_SIZE, 
    area[2].robot.g_robotGoalLength, area[2].robot.g_robotStartLength );
  area[2].robot.sx = mx;
  area[2].robot.sy = 628;
  area[2].robot.setup();

  area[3].g_Player.START_X = area[3].g_currentStage.pipeMinX*BASE_SPRITE_SIZE-BASE_SPRITE_SIZE/2;
  area[3].g_Player.reset();
  area[3].robot.g_robotStartLength = 500-180;
  area[3].robot.g_robotGoalLength = 1132-196;
  mx = map( area[3].g_Player.START_X, 
    area[3].g_currentStage.pipeMinX*BASE_SPRITE_SIZE, 
    area[3].g_currentStage.pipeMaxX*BASE_SPRITE_SIZE, 
    area[3].robot.g_robotGoalLength, area[3].robot.g_robotStartLength );
  area[3].robot.sx = mx;
  area[3].robot.sy = 174;
  area[3].robot.setup();


  area[0].move = false;
  area[0].x1 = 89;
  area[0].y1 = 367;
  area[0].w1 = 283;
  area[0].h1 = 173; 

  area[0].x2 = 383;
  area[0].y2 = 368;
  area[0].w2 = 277;
  area[0].h2 = 173; 

  area[0].x3 = 673;
  area[0].y3 = 368;
  area[0].w3 = 279;
  area[0].h3 = 171;

  area[1].move = false;
  area[1].x1 = 965;
  area[1].y1 = 369;
  area[1].w1 = 281;
  area[1].h1 = 169; 

  area[1].x2 = 1258;
  area[1].y2 = 369;
  area[1].w2 = 282;
  area[1].h2 = 168; 

  area[1].x3 = 1552;
  area[1].y3 = 371;
  area[1].w3 = 287;
  area[1].h3 = 164;

  area[2].move = true;
  area[2].x1 = 19;
  area[2].y1 = 15;
  area[2].w1 = 276;
  area[2].h1 = 157; 

  area[3].move = true;
  area[3].x1 = 19;
  area[3].y1 = 15;
  area[3].w1 = 276;
  area[3].h1 = 157;

  current_area = area[0];
}

function draw()
{
  background( 0 );

  let sw = float(width)/float(imgBack.width);
  let sh = float(height)/float(imgBack.height);
  let s;
  if ( sw < sh )
  {
    s = sw;
  } else
  {
    s = sh;
  }

  push();

  //translate( -width/2, -height/2 );
  translate( (float(width)-float(imgBack.width)*s)*0.5, (float(height)-float(imgBack.height)*s)*0.5 );
  scale( s, s );

  image( imgBack, 0, 0 );
  for ( let i=0; i<area.length; i++ )
  {
    area[i].draw();
  }

  pop();
}

function windowResized() 
{ 
  resizeCanvas( windowWidth, windowHeight );
}
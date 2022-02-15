let MESSAGE_SETTING = 0;
let MESSAGE_START = 1;
let MESSAGE_PLAY = 2;
let MESSAGE_WARP_BEGIN1 = 3;
let MESSAGE_WARP_BEGIN2 = 4;
let MESSAGE_WARP_BEGIN3 = 5;
let MESSAGE_WARP_BEGIN4 = 6;
let MESSAGE_WARP_BEGIN5 = 7;
let MESSAGE_WARP_FINISH1 = 8;
let MESSAGE_WARP_FINISH2 = 9;
let MESSAGE_WARP_FINISH3 = 10;
let MESSAGE_WARP_FINISH4 = 11;
let MESSAGE_WARP_FINISH5 = 12;
let MESSAGE_GOAL = 13;
let MESSAGE_DEAD = 14;
let MESSAGE_READY = 15;

let STATE_STAND = 0;
let STATE_MOVE = 1;
let STATE_JUMP = 2;
let STATE_WARP_BEGIN1 = 3;
let STATE_WARP_BEGIN2 = 4;
let STATE_WARP_BEGIN3 = 5;
let STATE_WARP_BEGIN4 = 6;
let STATE_WARP_BEGIN5 = 7;
let STATE_WARP_FINISH1 = 8;
let STATE_WARP_FINISH2 = 9;
let STATE_WARP_FINISH3 = 10;
let STATE_WARP_FINISH4 = 11;
let STATE_WARP_FINISH5 = 12;
let STATE_WAIT = 13;

let GRAVITY = 0.1;
let MAX_DROP_SPEED = 2.0;
let MOVE_SPEED = 1.1;
let MOVE_ACCUR = 0.2;
let FRAME_SPEED = 0.1;
let JUMP_SPEED = 4.0;

let BASE_SCREEN_WIDTH = 270;
let BASE_SCREEN_HEIGHT = 270;
let ONE_SCREEN_WIDTH = 270;
let ONE_SCREEN_HEIGHT = 270;
let BASE_SPRITE_SIZE = 16;
let BASE_PLAYER_X = BASE_SPRITE_SIZE*5;
let START_STAGE = 1;

function loadSozai()
{
  imgSprite.loadPixels();

  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    s.through = true;
    g_vecSozai.push( s );
  }

  // 11.pipe    
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*4, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*5, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }

  // 13.flag    
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*6, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
    s.goal = true;
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*6, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
    s.goal = true;
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*7, BASE_SPRITE_SIZE*0, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
    s.goal = true;
  }

  // 16.pipe side    
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*4, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*4, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*5, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*5, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*6, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*6, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }

  // 22.grass
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
  }

  // 24.cloud
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
  }
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE*2, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
  }

  // 26.cloud lift
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*7, BASE_SPRITE_SIZE*1, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
  }

  // 27.star 
  {
    let s = new Sozai();
    s.load( imgSprite, BASE_SPRITE_SIZE*7, BASE_SPRITE_SIZE*3, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    g_vecSozai.push( s );
    s.through = true;
  }
}
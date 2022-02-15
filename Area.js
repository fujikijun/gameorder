class Area
{
  constructor( index )
  {
    this.index = index;
    this.g_currentStage = new Stage( index );
    this.g_Player = new Player();
    this.g_vecCoin = [];
    this.move = false;

    this.x1 = 101;
    this.y1 = 343;
    this.w1 = 292;
    this.h1 = 162; 

    this.x2 = 407;
    this.y2 = 344;
    this.w2 = 284;
    this.h2 = 167; 

    this.x3 = 704;
    this.y3 = 343;
    this.w3 = 278;
    this.h3 = 164;
    
    this.robot = null;
  }

  setup()
  {
    this.g_currentStage.g_vecCoin = g_vecCoin;
    this.g_Player.g_vecCoin = g_vecCoin;

    this.g_currentStage.setup();
    this.g_Player.setup();
    this.pg = createGraphics( this.g_currentStage.m_iMapWidth*BASE_SPRITE_SIZE, this.g_currentStage.m_iMapHeight*BASE_SPRITE_SIZE );
    this.pg.smooth();
  }

  draw()
  {    
    this.pg.push();
    //this.pg.translate( -this.pg.width/2, -this.pg.height/2 );
    if ( this.index == 3 )
    {
      this.pg.background( 0 );
    } else
    {
      this.pg.background( 80, 128, 255 );
    }

    for ( let i=0; i<g_vecCoin.length; i++ )
    {
      g_vecCoin[i].draw( this.g_currentStage.index, this.pg );
    }
    this.g_currentStage.draw( this.pg, false );
    if ( current_area == this )
    {
      this.g_Player.update( this.g_currentStage, this.g_vecCoin );
    }
    this.g_Player.draw( this.pg );
    this.g_currentStage.draw( this.pg, true );

    if ( this.index == START_STAGE && this.g_Player.state == STATE_WAIT && !g_bPlay )
    {
      this.pg.image( g_imgTitle, (480-g_imgTitle.width)/2, (ONE_SCREEN_HEIGHT-g_imgTitle.height)/4);
      this.pg.image( g_imgStart, (480-g_imgStart.width)/2, (ONE_SCREEN_HEIGHT-g_imgStart.height)/11*6);
    }

    this.pg.pop();
    if ( !this.move )
    {
      image( this.pg, this.x1, this.y1, this.w1, this.h1, 0, 0, this.pg.width/3, this.pg.height );
      image( this.pg, this.x2, this.y2, this.w2, this.h2, this.pg.width/3, 0, this.pg.width/3, this.pg.height );
      image( this.pg, this.x3, this.y3, this.w3, this.h3, this.pg.width/3*2, 0, this.pg.width/3, this.pg.height );
    } else
    {
      if( this.robot != null )
      {
        this.robot.draw();
      }
      image( this.pg, this.x1+this.robot.x, this.y1+this.robot.y, this.w1, this.h1, 0, 0, this.pg.width, this.pg.height );
    }
  }
}
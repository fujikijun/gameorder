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

  computeTrans()
  {
    pfocusx = focusx;
    pfocusy = focusy;

    if ( !this.move )
    {            
      if ( this.g_Player.x < this.pg.width/3 )
      {
        let sx = float(this.w1)/float(this.pg.width/3);
        let sy = float(this.h1)/float(this.pg.height);
        focusx = -(this.x1+this.g_Player.x*sx);
        focusy = -(this.y1+this.g_Player.y*sy);
      } else if ( this.g_Player.x < this.pg.width/3*2 )
      {
        let sx = float(this.w2)/float(this.pg.width/3);
        let sy = float(this.h2)/float(this.pg.height);
        focusx = -(this.x2+(this.g_Player.x-this.pg.width/3)*sx);
        focusy = -(this.y2+this.g_Player.y*sy);
      } else
      {
        let sx = float(this.w3)/float(this.pg.width/3);
        let sy = float(this.h3)/float(this.pg.height);
        focusx = -(this.x3+(this.g_Player.x-this.pg.width/3*2)*sx);
        focusy = -(this.y3+this.g_Player.y*sy);
      }
    } else
    {
      let sx = float(this.w1)/float(this.pg.width);
      let sy = float(this.h1)/float(this.pg.height);
      focusx = -(this.x1+this.g_Player.x*sx + this.robot.x);
      focusy = -(this.y1+this.g_Player.y*sy + this.robot.y);
    }
  }

  trans()
  {
    /*
    if ( !this.move )
     {            
     if ( this.g_Player.x < this.pg.width/3 )
     {
     let sx = float(this.w1)/float(this.pg.width/3);
     let sy = float(this.h1)/float(this.pg.height);
     //translate( -(this.x1+this.g_Player.x*sx), -(this.y1+this.g_Player.y*sy) );
     } else if ( this.g_Player.x < this.pg.width/3*2 )
     {
     let sx = float(this.w2)/float(this.pg.width/3);
     let sy = float(this.h2)/float(this.pg.height);
     //translate( -(this.x2+(this.g_Player.x-this.pg.width/3)*sx), -(this.y2+this.g_Player.y*sy) );
     } else
     {
     let sx = float(this.w3)/float(this.pg.width/3);
     let sy = float(this.h3)/float(this.pg.height);
     //translate( -(this.x3+(this.g_Player.x-this.pg.width/3*2)*sx), -(this.y3+this.g_Player.y*sy) );
     }
     } else
     {
     let sx = float(this.w1)/float(this.pg.width);
     let sy = float(this.h1)/float(this.pg.height);
     //translate( -(this.x1+this.g_Player.x*sx + this.robot.x), -(this.y1+this.g_Player.y*sy + this.robot.y) );
     }*/

    let t = 0.5;
    focusx = focusx*t + pfocusx*(1.0-t);
    focusy = focusy*t + pfocusy*(1.0-t);
    translate( focusx, focusy );
  }

  update()
  { 
    if ( this.robot != null )
    {
      this.robot.update();
    }
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
      //this.pg.background( 80, 128, 255 );
      this.pg.background( 36, 93, 255 );
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
      if ( this.robot != null )
      {
        this.robot.draw();
      }
      image( this.pg, this.x1+this.robot.x, this.y1+this.robot.y, this.w1, this.h1, 0, 0, this.pg.width, this.pg.height );
    }
  }
}
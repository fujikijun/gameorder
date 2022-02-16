//------------------------------------------------------------------------------------------
//
//          Robot
//
//------------------------------------------------------------------------------------------

class Robot
{
  constructor( area )
  {
    this.x = 0;
    this.px = 0;
    this.y = 0;
    this.sx = 0;
    this.sy = 0;
    this.ex = 0;
    this.ey = 0;
    this.img = null;
    this.g_robotStartLength = 0;
    this.g_robotGoalLength = 200;
    this.area = area;
    this.SPEED = 3;
    this.sndOn = false;
    this.psndOn = false;
  }

  setup()
  {
    this.x = this.sx;
    this.y = this.sy;
    this.px = this.x;
  }

  update()
  {
    if ( this.area != current_area )
    {
      this.area.g_Player.x = this.area.g_Player.START_X;
    }

    //console.log( this.area.g_Player.x, this.area.g_currentStage.pipeMinX, this.area.g_currentStage.pipeMaxX);
    let mx = 0;
    mx = map( this.area.g_Player.x, 
      this.area.g_currentStage.pipeMinX*BASE_SPRITE_SIZE, 
      this.area.g_currentStage.pipeMaxX*BASE_SPRITE_SIZE, 
      this.g_robotGoalLength, this.g_robotStartLength );

    if ( mx < this.area.g_currentStage.g_robotStartLength )
    {
      mx = this.area.g_currentStage.g_robotStartLength;
    }
    if ( mx > this.area.g_currentStage.g_robotGoalLength )
    {
      mx = this.area.g_currentStage.g_robotGoalLength;
    }

    this.px = this.x;
    this.psndOn = this.sndOn;
    this.sndOn = false;
    if ( this.x > mx + this.SPEED )
    {
      this.x -= this.SPEED;
    }
    if ( this.x < mx - this.SPEED )
    {
      this.x += this.SPEED;
    }
    if( ( int(this.x) != int(this.px) ) || 
      ( current_area==this.area && 
       ( int(current_area.g_Player.x) != int(current_area.g_Player.oldx) ) && 
      !( current_area.g_Player.state>=STATE_WARP_BEGIN1 && current_area.g_Player.state<=STATE_WARP_FINISH5 ) && 
      ( left || right ) ) )
    {
      this.sndOn = true;
    }
    
    if( this.sndOn && !this.psndOn )
    {
      sndRobot.loop();
    }
    else if( !this.sndOn && this.psndOn )
    {
      sndRobot.stop();
    }
  }

  draw()
  {    
    image( this.img, this.x, this.y );
  }
}
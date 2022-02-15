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
  }

  setup()
  {
    this.x = this.sx;
    this.y = this.sy;
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

    //this.x = mx;
    if ( this.x > mx + this.SPEED )
    {
      this.x -= this.SPEED;
    }
    if ( this.x < mx - this.SPEED )
    {
      this.x += this.SPEED;
    }
  }

  draw()
  {    
    image( this.img, this.x, this.y );
  }
}
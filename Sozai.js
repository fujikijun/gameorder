//------------------------------------------------------------------------------------------
//
//          Sozai
//
//------------------------------------------------------------------------------------------

class Coin
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.on = false;
    this.count = 0;
    this.index = 0;
  }

  reset()
  {
    this.on = true;
  }

  hitTest( index, _x, _y )
  {
    if ( !this.on || this.index!=index )
    {
      return false;
    }

    let dis = dist( this.x, this.y+BASE_SPRITE_SIZE, _x, _y );
    if ( dis <= BASE_SPRITE_SIZE/2 )
    {
      this.on = false;
      sndCoin.stop();
      sndCoin.play();
      return true;
    }
    return false;
  }

  draw( index, pg )
  {    
    if( this.index != index )
    {
      return;
    }
    
    if ( this.on )
    {
      if ( this.count < 15)
      {
        pg.image( g_imgCoin1, this.x, this.y );
      } else
      {
        pg.image( g_imgCoin2, this.x, this.y );
      }
    }

    this.count++;
    if ( this.count >= 30 )
    {
      this.count = 0;
    }
  }
}

class Sozai
{
  constructor()
  {
    this.imgSprite = null;
    this.warp_to = 0;
    this.warp_num= 0;
    this.warp_type = 0;
    this.through = false;
    this.goal = false;
  }

  //----------------------------------------------------------------------------------------
  // load
  //----------------------------------------------------------------------------------------

  load( imgSrc, x, y, w, h )
  {
    this.imgSprite = createImage( w, h );
    this.imgSprite.copy( imgSrc, x, y, w, h, 0, 0, w, h );
  }

  //----------------------------------------------------------------------------------------
  // update
  //----------------------------------------------------------------------------------------

  update()
  {
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw( pg, x, y )
  {
    pg.image( this.imgSprite, x, y );
  }
}
//------------------------------------------------------------------------------------------
//
//          Player
//
//------------------------------------------------------------------------------------------

class Sprites
{
  constructor()
  {
    this.vecImage = [];
  }
}

class Player
{
  constructor()
  {
    this.START_X = BASE_PLAYER_X;
    this.START_Y = BASE_SCREEN_HEIGHT-BASE_SPRITE_SIZE*2+2;

    this.x = 0;
    this.y = 0;
    this.sx = 0;
    this.sy = 0;
    this.ax = 0;
    this.ay = 0;
    this.state = STATE_WAIT;
    this.old_state = 0;
    this.frame = 0;
    this.direction = 0;
    this.goal = false;
    this.goal_timer = 0;

    this.oldx = 0;
    this.oldy = 0;
    this.drop_speed = 0;
    this.count = 0;
    this.currentPipe = null;
    this.vecSprites = [];

    this.imgPlayer = loadImage( "data/player.png" );

    this.g_vecCoin = null;
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup()
  {
    this.reset();

    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
      sp.vecImage.push( this.getImage( this.imgPlayer, 1, 0) );
      sp.vecImage.push( this.getImage( this.imgPlayer, 2, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 1) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
    {
      let sp = new Sprites();
      this.vecSprites.push( sp );
      sp.vecImage.push( this.getImage( this.imgPlayer, 0, 0) );
    }
  }

  getImage( imgPlayer, x, y )
  {
    let imgSprite = createImage( BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    imgSprite.copy( imgPlayer, x*BASE_SPRITE_SIZE, y*BASE_SPRITE_SIZE, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE, 0, 0, BASE_SPRITE_SIZE, BASE_SPRITE_SIZE );
    return imgSprite;
  }

  //----------------------------------------------------------------------------------------
  // reset
  //----------------------------------------------------------------------------------------

  reset()
  {
    this.x = this.START_X;
    this.y = this.START_Y;
    this.sx = 0;
    this.sy = 0;
    this.ax = 0;
    this.ay = 0;
    this.oldx = this.START_X;
    this.oldy = this.START_Y;
    this.state = STATE_WAIT;
    this.old_state = this.state;
    this.frame = 0;
    this.direction = 0;
    this.count = 0;
    this.goal = false;

    up=false; 
    down=false; 
    left=false; 
    right=false;
    pup=false; 
    pdown=false; 
    pleft=false; 
    pright=false;

    for ( let i=0; i<this.g_vecCoin.length; i++ )
    {
      this.g_vecCoin[i].reset();
    }

    this.goal_timer = 0;
  }

  //----------------------------------------------------------------------------------------
  // update
  //----------------------------------------------------------------------------------------

  getSozai( stage, x, y )
  {
    let xx = floor( (x-stage.x) / BASE_SPRITE_SIZE );
    let yy = floor( (y-stage.y) / BASE_SPRITE_SIZE );

    if ( xx < 0 || xx >= stage.m_iMapWidth )
    {
      return null;
    }
    if ( yy < 0 || yy >= stage.m_iMapHeight )
    {
      return null;
    }

    if ( stage.m_Map[int(xx)][int(yy)] != null )
    {
      return stage.m_Map[int(xx)][int(yy)];
    }

    return null;
  }

  collision( stage, x, y )
  {
    let xx = floor( (x-stage.x) / BASE_SPRITE_SIZE );
    let yy = floor( (y-stage.y) / BASE_SPRITE_SIZE );

    if ( xx < 0 || xx >= stage.m_iMapWidth )
    {
      return false;
    }
    if ( yy < 0 || yy >= stage.m_iMapHeight )
    {
      return false;
    }

    if ( stage.m_Map[int(xx)][int(yy)] != null && !stage.m_Map[int(xx)][int(yy)].through )
    {
      return true;
    }

    return false;
  }

  collision2( stage )
  {
    let bAir = true;

    // left / right
    if ( this.collision( stage, this.x+BASE_SPRITE_SIZE, this.y-BASE_SPRITE_SIZE+1) )
    {
      this.x = floor( (this.x-stage.x) / BASE_SPRITE_SIZE ) * BASE_SPRITE_SIZE -1  + stage.x;
    }
    if ( this.collision( stage, this.x, this.y-BASE_SPRITE_SIZE+1) )
    {
      this.x = floor( (this.x-stage.x) / BASE_SPRITE_SIZE +1 ) * BASE_SPRITE_SIZE + stage.x;
    }

    if ( this.collision( stage, this.x+BASE_SPRITE_SIZE, this.y-1) )
    {
      this.x = floor( (this.x-stage.x) / BASE_SPRITE_SIZE ) * BASE_SPRITE_SIZE -1 + stage.x;
    }
    if ( this.collision( stage, this.x, this.y-1) )
    {
      this.x = floor( (this.x-stage.x) / BASE_SPRITE_SIZE +1 ) * BASE_SPRITE_SIZE + stage.x;
    }

    // down
    if ( this.collision( stage, this.x+BASE_SPRITE_SIZE-1, this.y) )
    {
      this.y = floor( (this.y-stage.y) / BASE_SPRITE_SIZE ) * BASE_SPRITE_SIZE + stage.y;
      this.drop_speed = 0;
      this.state = STATE_STAND;
      bAir = false;
    }
    if ( this.collision( stage, this.x+1, this.y) )
    {
      this.y = floor( (this.y-stage.y) / BASE_SPRITE_SIZE ) * BASE_SPRITE_SIZE + stage.y;
      this.drop_speed = 0;
      this.state = STATE_STAND;
      bAir = false;
    }

    // up
    if ( this.collision( stage, this.x+BASE_SPRITE_SIZE-1, this.y-BASE_SPRITE_SIZE) )
    {
      this.y = floor( (this.y-stage.y) / BASE_SPRITE_SIZE +1 ) * BASE_SPRITE_SIZE +1 + stage.y;
      this.drop_speed = 0;
    }
    if ( this.collision( stage, this.x+1, this.y-BASE_SPRITE_SIZE) )
    {
      this.y = floor( (this.y-stage.y) / BASE_SPRITE_SIZE +1 ) * BASE_SPRITE_SIZE +1 + stage.y;
      this.drop_speed = 0;
    }

    if ( bAir )
    {
      return false;
    }

    return true;
  }

  control( g_currentStage )
  {
    if ( this.state == STATE_WAIT )
    {
      return false;
    }

    if ( !this.goal )
    {
      let sozai = this.getSozai( g_currentStage, this.x+BASE_SPRITE_SIZE, this.y+BASE_SPRITE_SIZE/2 );
      if ( sozai != null )
      {
        if ( sozai.goal == true )
        {
          bgm.stop();
          metro.stop();
          sndGoal.play();
          this.goal = true;
        }
      }
    }

    ///////////////////////////////////////////////////////////
    if ( this.goal == true )
    {
      if ( this.state != STATE_JUMP )
      {
        this.state = STATE_MOVE;
      }
      this.x += MOVE_SPEED*0.25;

      this.frame += FRAME_SPEED;
      if ( int(this.frame) >= this.vecSprites[this.state].vecImage.length )
      {
        this.frame -= this.vecSprites[this.state].vecImage.length;
      }

      if ( this.x >= (g_currentStage.m_iMapWidth+1)*BASE_SPRITE_SIZE )
      {
        this.reset();
      }

      return true;
    }
    ///////////////////////////////////////////////////////////
    else if ( this.state == STATE_WARP_BEGIN1 )
    {
      //bgm.pause();
      this.y += MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x, this.y-BASE_SPRITE_SIZE );
      if ( sozai != null )
      {
        this.state = STATE_WAIT;
        if ( this.currentPipe != null )
        {
          this.warp( MESSAGE_WARP_BEGIN1, this.currentPipe.warp_to, this.currentPipe.warp_num );
          //client.write( MESSAGE_WARP_BEGIN1 + "," + currentPipe.warp_to + "," + currentPipe.warp_num );
        }
      }
    } else if ( this.state == STATE_WARP_FINISH1 )
    {
      if ( this.old_state != STATE_WARP_FINISH1 )
      {
        bgm.stop();
        metro.stop();
        if ( current_area.index == 3 )
        {
          metro.loop();
        } else
        {
          bgm.loop();
        }
      }
      this.y += MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x, this.y-BASE_SPRITE_SIZE );
      if ( sozai == null )
      {
        this.state = STATE_STAND;
      }
    } 
    // ------------------------------------------------
    else if ( this.state == STATE_WARP_BEGIN2 )
    {
      //bgm.pause();
      this.y -= MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x, this.y );
      if ( sozai != null )
      {
        this.state = STATE_WAIT;
        if ( this.currentPipe != null )
        {
          this.warp( MESSAGE_WARP_BEGIN2, this.currentPipe.warp_to, this.currentPipe.warp_num );
          //client.write( MESSAGE_WARP_BEGIN2 + "," + currentPipe.warp_to + "," + currentPipe.warp_num );
        }
      }
    } else if ( this.state == STATE_WARP_FINISH2 )
    {
      if ( this.old_state != STATE_WARP_FINISH2 )
      {
        bgm.stop();
        metro.stop();
        if ( current_area.index == 3 )
        {
          metro.loop();
        } else
        {
          bgm.loop();
        }
      }
      this.y -= MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x, this.y );
      if ( sozai == null )
      {
        this.state = STATE_STAND;
      }
    }
    // ------------------------------------------------
    else if ( this.state == STATE_WARP_BEGIN3 )
    {
      //bgm.pause();
      this.x += MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x, this.y-BASE_SPRITE_SIZE/2 );
      if ( sozai != null )
      {
        this.state = STATE_WAIT;
        if ( this.currentPipe != null )
        {
          this.warp( MESSAGE_WARP_BEGIN3, this.currentPipe.warp_to, this.currentPipe.warp_num );
          //client.write( MESSAGE_WARP_BEGIN3 + "," + currentPipe.warp_to + "," + currentPipe.warp_num );
        }
      }
    } else if ( this.state == STATE_WARP_FINISH3 )
    {
      if ( this.old_state != STATE_WARP_FINISH3 )
      {
        bgm.stop();
        metro.stop();
        if ( current_area.index == 3 )
        {
          metro.loop();
        } else
        {
          bgm.loop();
        }
      }
      this.x += MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x, this.y-BASE_SPRITE_SIZE/2 );
      if ( sozai == null )
      {
        this.state = STATE_STAND;
      }
    }
    // ------------------------------------------------
    else if ( this.state == STATE_WARP_BEGIN4 )
    {
      //bgm.pause();
      this.x -= MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x+BASE_SPRITE_SIZE/2, this.y-BASE_SPRITE_SIZE/2 );
      if ( sozai != null )
      {
        this.state = STATE_WAIT;
        if ( this.currentPipe != null )
        {
          this.warp( MESSAGE_WARP_BEGIN4, this.currentPipe.warp_to, this.currentPipe.warp_num );
          //client.write( MESSAGE_WARP_BEGIN4 + "," + currentPipe.warp_to + "," + currentPipe.warp_num );
        }
      }
    } else if ( this.state == STATE_WARP_FINISH4 )
    {
      if ( this.old_state != STATE_WARP_FINISH4 )
      {
        bgm.stop();
        metro.stop();
        if ( current_area.index == 3 )
        {
          metro.loop();
        } else
        {
          bgm.loop();
        }
      }
      this.x -= MOVE_SPEED*0.5;
      let sozai = this.getSozai( g_currentStage, this.x+BASE_SPRITE_SIZE, this.y-BASE_SPRITE_SIZE/2 );
      if ( sozai == null )
      {
        this.state = STATE_STAND;
      }
    }
    ///////////////////////////////////////////////////////////
    else
    {
      if ( this.state == STATE_STAND )
      {
        {
          if ( up )
          {
            this.state = STATE_JUMP;
            this.drop_speed = -JUMP_SPEED;
            this.frame = 0;
            sndJump.stop();
            sndJump.play();
          }
          if ( right )
          {
            this.state = STATE_MOVE;
          }
          if ( left )
          {
            this.state = STATE_MOVE;
          }
          if ( down )
          {
            let sozai1 = this.getSozai( g_currentStage, this.x, this.y+BASE_SPRITE_SIZE/2 );
            let sozai2 = this.getSozai( g_currentStage, this.x+BASE_SPRITE_SIZE, this.y+BASE_SPRITE_SIZE/2 );
            if ( sozai1!=null && sozai2!=null && sozai1.warp_to!=0 && sozai2.warp_to!=0 )
            {
              this.state = STATE_WARP_BEGIN1; // <----------------------------
              this.currentPipe = sozai1;
              sndPipe.stop();
              sndPipe.play();

              this.sx = 0;
              this.sy = 0;
              this.ax = 0;
              this.ay = 0;
            }
          }
        }
      }
    }

    if ( this.state == STATE_MOVE )
    {
      this.frame += FRAME_SPEED;
      if ( int(this.frame) >= this.vecSprites[this.state].vecImage.length )
      {
        this.frame -= this.vecSprites[this.state].vecImage.length;
      }

      {
        if ( right )
        {
          this.ax = MOVE_ACCUR;
          this.state = STATE_MOVE;
          this.direction = 0;

          let sozai1 = this.getSozai( g_currentStage, this.x+BASE_SPRITE_SIZE*2, this.y-BASE_SPRITE_SIZE/2 );
          let sozai2 = this.getSozai( g_currentStage, this.x+BASE_SPRITE_SIZE*2, this.y-BASE_SPRITE_SIZE-BASE_SPRITE_SIZE/2 );
          if ( sozai1!=null && sozai2!=null && sozai1.warp_to!=0 && sozai2.warp_to!=0 )
          {
            this.state = STATE_WARP_BEGIN3; // <----------------------------
            this.currentPipe = sozai1;
            sndPipe.stop();
            sndPipe.play();

            this.sx = 0;
            this.sy = 0;
            this.ax = 0;
            this.ay = 0;
          }
        } else if ( left )
        {
          this.ax = -MOVE_ACCUR;
          this.state = STATE_MOVE;
          this.direction = 1;

          let sozai1 = this.getSozai( g_currentStage, this.x-BASE_SPRITE_SIZE, this.y-BASE_SPRITE_SIZE/2  );
          let sozai2 = this.getSozai( g_currentStage, this.x-BASE_SPRITE_SIZE, this.y-BASE_SPRITE_SIZE-BASE_SPRITE_SIZE/2 );
          if ( sozai1!=null && sozai2!=null && sozai1.warp_to!=0 && sozai2.warp_to!=0 )
          {
            this.state = STATE_WARP_BEGIN4; // <----------------------------
            this.currentPipe = sozai1;
            sndPipe.stop();
            sndPipe.play();

            this.sx = 0;
            this.sy = 0;
            this.ax = 0;
            this.ay = 0;
          }
        } else
        {
          this.state = STATE_STAND;
          this.frame = 0;
        }
      }
    }

    if ( this.state == STATE_JUMP )
    {       
      {
        if ( up )
        {
          let sozai1 = this.getSozai( g_currentStage, this.x, this.y-BASE_SPRITE_SIZE-BASE_SPRITE_SIZE/2 );
          let sozai2 = this.getSozai( g_currentStage, this.x+BASE_SPRITE_SIZE, this.y-BASE_SPRITE_SIZE-BASE_SPRITE_SIZE/2 );

          if ( sozai1!=null && sozai2!=null && sozai1.warp_to!=0 && sozai2.warp_to!=0 )
          {
            this.state = STATE_WARP_BEGIN2; // <----------------------------
            this.currentPipe = sozai1;
            sndPipe.stop();
            sndPipe.play();

            this.sx = 0;
            this.sy = 0;
            this.ax = 0;
            this.ay = 0;
          }
        } 

        if ( right )
        {
          this.ax = MOVE_ACCUR;
          this.direction = 0;
        } 
        if ( left )
        {
          this.ax = -MOVE_ACCUR;
          this.direction = 1;
        }
      }
    }

    return true;
  }

  update( g_currentStage )
  {
    this.old_state = this.state;

    if ( this.goal )
    {
      this.goal_timer++;
      if ( this.goal_timer >= 30*20 )
      {
        this.goal_timer = 0;

        for ( let i=0; i<area.length; i++ )
        {
          area[i].g_Player.reset();
        }
        current_area = area[0];
        current_area.computeTrans();
        pfocusx = focusx;
        pfocusy = focusy;

        g_bPlay = false;
      }
    }

    this.oldx = this.x;
    this.oldy = this.x;

    if ( this.state == STATE_WAIT )
    {      
      return;
    }

    if ( !this.goal )
    {
      if ( this.y > (g_currentStage.m_iMapHeight+1)*BASE_SPRITE_SIZE  )
      {
        bgm.stop();
        metro.stop();
        sndMiss.stop();
        sndMiss.play();

        this.goal = true;
        /*
        delay( 5000 );
         
         this.reset();
         current_area = area[0];
         g_bPlay = false;
         */
        return;
      }
    }

    let total_drop = this.drop_speed;
    this.drop_speed += GRAVITY;
    if ( this.drop_speed > MAX_DROP_SPEED )
    {
      this.drop_speed = MAX_DROP_SPEED;
    }

    let bWarp = false;
    if ( this.state>=STATE_WARP_BEGIN1 && this.state<=STATE_WARP_FINISH5 )
    {
      bWarp = true;
    }

    if ( !bWarp )
    {
      let bAir = true;
      for ( let i=0; i<4; i++ )
      {
        this.y += total_drop*0.25;
        if ( this.collision2( g_currentStage ) )
        {
          bAir = false;
        }
      }
      if ( bAir && !bWarp )
      {
        this.state = STATE_JUMP;
      }
    }

    this.ax = 0;

    this.control( g_currentStage );

    this.x += this.sx;
    this.sx += this.ax;
    if ( this.sx > MOVE_SPEED )
    {
      this.sx = MOVE_SPEED;
    }
    if ( this.sx < -MOVE_SPEED )
    {
      this.sx = -MOVE_SPEED;
    }
    this.sx *= 0.95;

    for ( let i=0; i<this.g_vecCoin.length; i++ )
    {
      this.g_vecCoin[i].hitTest( g_currentStage.index, this.x, this.y );
    }
  }

  warp( message, to, num )
  {
    current_area = area[to-1];

    for ( let i=0; i<current_area.g_currentStage.vecPipe.length; i++ )
    {
      let pipe = current_area.g_currentStage.vecPipe[i];

      if ( pipe.num == num )
      {        
        current_area.g_Player.old_state = current_area.g_Player.STATE_WAIT;
        if ( message == STATE_WARP_BEGIN1 )
        {
          current_area.g_Player.state = STATE_WARP_FINISH1;
          current_area.g_Player.x = pipe.x*BASE_SPRITE_SIZE + BASE_SPRITE_SIZE/2;
          current_area.g_Player.y = pipe.y*BASE_SPRITE_SIZE + BASE_SPRITE_SIZE;
          current_area.g_Player.frame = 0;
        } else if ( message == STATE_WARP_BEGIN2 )
        {
          current_area.g_Player.state = STATE_WARP_FINISH2;
          current_area.g_Player.x = pipe.x*BASE_SPRITE_SIZE + BASE_SPRITE_SIZE/2;
          current_area.g_Player.y = pipe.y*BASE_SPRITE_SIZE + BASE_SPRITE_SIZE;
          current_area.g_Player.frame = 0;
        } else if ( message == STATE_WARP_BEGIN3 )
        {
          current_area.g_Player.state = STATE_WARP_FINISH3;
          current_area.g_Player.x = pipe.x*BASE_SPRITE_SIZE;
          current_area.g_Player.y = pipe.y*BASE_SPRITE_SIZE + BASE_SPRITE_SIZE+BASE_SPRITE_SIZE/2;
          current_area.g_Player.frame = 0;
        } else if ( message == STATE_WARP_BEGIN4 )
        {
          current_area.g_Player.state = STATE_WARP_FINISH4;
          current_area.g_Player.x = pipe.x*BASE_SPRITE_SIZE + BASE_SPRITE_SIZE/2;
          current_area.g_Player.y = pipe.y*BASE_SPRITE_SIZE + BASE_SPRITE_SIZE+BASE_SPRITE_SIZE/2;
          current_area.g_Player.frame = 0;
        }
        current_area.g_Player.control( current_area.g_currentStage );
        break;
      }
    }
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw( pg )
  {
    if ( this.state == STATE_WAIT )
    {
      if ( this.myIndex == START_STAGE && !g_bPlay )
      {
        this.reset();
      } else
      {
        //return;
      }
    }

    if ( this.frame >= this.vecSprites[this.state].vecImage.length )
    {
      this.frame = 0;
    }

    pg.imageMode( CENTER );

    if ( this.direction == 0 )
    {
      pg.push();
      pg.translate( this.x+BASE_SPRITE_SIZE/2, this.y-BASE_SPRITE_SIZE/2 );
      pg.image( this.vecSprites[this.state].vecImage[int(this.frame)], 0, 0 );
      pg.pop();
    } else
    {
      pg.push();
      pg.translate( this.x+BASE_SPRITE_SIZE/2, this.y-BASE_SPRITE_SIZE/2 );
      pg.scale( -1, 1 );
      pg.image( this.vecSprites[this.state].vecImage[int(this.frame)], 0, 0 );
      pg.pop();
    }

    pg.imageMode( CORNER );
  }
}
//------------------------------------------------------------------------------------------
//
//          Stage
//
//------------------------------------------------------------------------------------------

class Pipe
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.to = 0;
    this.num = 0;
    this.type = 0;
  }
}

class Stage
{
  constructor( index )
  {
    this.index = index;
    this.m_Map = [];
    this.x=0;
    this.y=0;
    this.m_iMapWidth=0;
    this.m_iMapHeight=0;
    this.vecPipe = [];
    this.pipeMinX = 0;
    this.pipeMaxX = 0;
    
    this.imgMap = loadImage( "data/stage"+index+".png" );
    this.g_imgTitle = loadImage( "data/title.png" );
    
    this.g_vecCoin = null;
    
    this.pgFront = null;
    this.pgBack = null;
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup()
  {
    this.imgMap.loadPixels();

    this.m_iMapWidth = this.imgMap.width;
    this.m_iMapHeight = this.imgMap.height;

    for ( let x=0; x<this.m_iMapWidth; x++ )
    {
      this.m_Map[x] = [];

      for ( let y=0; y<this.m_iMapHeight; y++ )
      {
        let r = this.imgMap.pixels[ ( y*this.imgMap.width+x ) * 4 + 0 ];
        let g = this.imgMap.pixels[ ( y*this.imgMap.width+x ) * 4 + 1 ];
        let b = this.imgMap.pixels[ ( y*this.imgMap.width+x ) * 4 + 2 ];

        if ( r==0 && g==0 && b==0 )
        {
          this.m_Map[x][y] = g_vecSozai[0];
        } else if ( r==255 && g==0 && b==0 )
        {
          this.m_Map[x][y] = g_vecSozai[1];
        } else if ( r==127 && g==0 && b==0 )
        {
          this.m_Map[x][y] = g_vecSozai[2];
        } else if ( r==127 && g==127 && b==0 ) 
        {
          this.m_Map[x][y] = g_vecSozai[5];
        } else if ( r==127 && g==127 && b==127 ) 
        {
          this.m_Map[x][y] = g_vecSozai[6];
        } else if ( r==0 && g==64 && b==64 ) 
        {
          this.m_Map[x][y] = g_vecSozai[7];
        } else if ( r==0 && g==0 && b==64 ) 
        {
          this.m_Map[x][y] = g_vecSozai[8];
        } else if ( r==64 && g==0 && b==64 ) 
        {
          this.m_Map[x][y] = g_vecSozai[9];
        }

        // flag
        else if ( r==255 && g==0 && b==255 ) 
        {
          this.m_Map[x][y] = g_vecSozai[13];
        } else if ( r==127 && g==0 && b==255 ) 
        {
          this.m_Map[x][y] = g_vecSozai[14];
        } else if ( r==255 && g==0 && b==127 ) 
        {
          this.m_Map[x][y] = g_vecSozai[15];
        }

        // pipe2
        else if ( r==100 && g==100 && b==0 ) 
        {
          this.m_Map[x][y] = g_vecSozai[18];
        } else if ( r==100 && g==100 && b==100 ) 
        {
          this.m_Map[x][y] = g_vecSozai[19];
        }

        // coin
        else if ( r==255 && g==255 && b==0 )           
        {
          let coin = new Coin();
          coin.index = this.index;
          coin.x = x * BASE_SPRITE_SIZE;
          coin.y = y * BASE_SPRITE_SIZE;
          this.g_vecCoin.push( coin );
        }

        // grass
        else if ( r==0 && g==100 && b==0 ) 
        {
          this.m_Map[x][y] = g_vecSozai[22];
        } else if ( r==50 && g==100 && b==0 ) 
        {
          this.m_Map[x][y] = g_vecSozai[23];
        }

        // cloud
        else if ( r==200 && g==200 && b==200 ) 
        {
          this.m_Map[x][y] = g_vecSozai[24];
        } else if ( r==200 && g==200 && b==255 ) 
        {
          this.m_Map[x][y] = g_vecSozai[25];
        } else if ( r==200 && g==255 && b==200 ) 
        {
          this.m_Map[x][y] = g_vecSozai[26];
        }

        // star
        else if ( r==255 && g==255 && b==127 ) 
        {
          this.m_Map[x][y] = g_vecSozai[27];
        } else if ( r<=254 && b >= 130 )
        {
          this.m_Map[x][y] = new Sozai();
          if ( b == 200 ) 
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[3].imgSprite;//.copy();
          } else if ( b == 201 ) 
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[4].imgSprite;//.copy();
          } else if ( b == 202 )
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[11].imgSprite;//.copy();
          } else if ( b == 203 )
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[12].imgSprite;//.copy();
          } else if ( b == 204 )
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[16].imgSprite;//.copy();
          } else if ( b == 205 )
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[17].imgSprite;//.copy();
          } else if ( b == 206 )
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[20].imgSprite;//.copy();
          } else if ( b == 207 )
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[21].imgSprite;//.copy();
          } else if ( b >= 220 ) 
          {
            this.m_Map[x][y].imgSprite = g_vecSozai[10].imgSprite;
            this.m_Map[x][y].through = true;
          }
          this.m_Map[x][y].warp_to = r;
          this.m_Map[x][y].warp_num = g;
          this.m_Map[x][y].warp_type = b;

          let pipe = new Pipe();
          pipe.x = x;
          pipe.y = y;
          pipe.to = r;
          pipe.num = g;
          pipe.type = b;
          this.vecPipe.push( pipe );
        }
      }
    }

    let MinX = 999999;
    let MaxX = -999999;
    for ( let i=0; i<this.vecPipe.length; i++ )
    {
      let p = this.vecPipe[i];
      if ( p.x < MinX )
      {
        MinX = p.x;
      }
      if ( p.x > MaxX )
      {
        MaxX = p.x;
      }
    }

    if ( this.g_pipeInv == 0 )
    {
      this.pipeMinX = MinX;
      this.pipeMaxX = MaxX;
    } else
    {
      this.pipeMinX = MaxX;
      this.pipeMaxX = MinX;
    }
    
    this.make();
  }

  //----------------------------------------------------------------------------------------
  // make
  //----------------------------------------------------------------------------------------

  make()
  {    
    {
      this.pgFront = createGraphics( this.m_iMapWidth*BASE_SPRITE_SIZE, this.m_iMapHeight*BASE_SPRITE_SIZE );
      
      for ( let _y=0; _y<this.m_iMapHeight; _y++ )
      {
        for ( let _x=0; _x<this.m_iMapWidth; _x++ )
        {
          if ( this.m_Map[_x][_y] != null )
          {
            if ( !this.m_Map[_x][_y].through )
            {
              this.m_Map[_x][_y].draw( this.pgFront, _x*BASE_SPRITE_SIZE, _y*BASE_SPRITE_SIZE );
            }
          }
        }
      }
    }
    {
      this.pgBack = createGraphics( this.m_iMapWidth*BASE_SPRITE_SIZE, this.m_iMapHeight*BASE_SPRITE_SIZE );
      
      for ( let _y=0; _y<this.m_iMapHeight; _y++ )
      {
        for ( let _x=0; _x<this.m_iMapWidth; _x++ )
        {
          if ( this.m_Map[_x][_y] != null )
          {
            if ( this.m_Map[_x][_y].through )
            {
              this.m_Map[_x][_y].draw( this.pgBack, _x*BASE_SPRITE_SIZE, _y*BASE_SPRITE_SIZE );
            }
          }
        }
      }
    }
  }
  
  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw( pg, bFront )
  {
    if ( bFront )
    {
      /*
      for ( let _y=0; _y<this.m_iMapHeight; _y++ )
      {
        for ( let _x=0; _x<this.m_iMapWidth; _x++ )
        {
          if ( this.m_Map[_x][_y] != null )
          {
            if ( !this.m_Map[_x][_y].through )
            {
              this.m_Map[_x][_y].draw( pg, _x*BASE_SPRITE_SIZE, _y*BASE_SPRITE_SIZE );
            }
          }
        }
      }*/
      pg.image( this.pgFront, 0, 0 );
    } 
    else
    {
      /*
      for ( let _y=0; _y<this.m_iMapHeight; _y++ )
      {
        for ( let _x=0; _x<this.m_iMapWidth; _x++ )
        {
          if ( this.m_Map[_x][_y] != null )
          {
            if ( this.m_Map[_x][_y].through )
            {
              this.m_Map[_x][_y].draw( pg, _x*BASE_SPRITE_SIZE, _y*BASE_SPRITE_SIZE );
            }
          }
        }
      }*/
      pg.image( this.pgBack, 0, 0 );
    }
  }
}
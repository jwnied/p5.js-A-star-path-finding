function Spot(i,j,size){
  this.i=i;
  this.j=j;
  this.size=size;
  this.f=0;
  this.g=0;
  this.h=0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;
  
  if(random(1)< 0.3){
    this.wall = true;
  }
  
  this.show = function(col){
    stroke(0);
    fill(col);
    if(this.wall){
      fill(0);
    }
    rect(this.i*this.size,this.j*this.size,this.size,this.size);
  }
  
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    var right = i<cols-1;
    var left = i>0;
    var up = j>0;
    var down = j<rows-1;
    if(right){
      this.neighbors.push(grid[i + 1][j    ]);
    }
    if(left){
      this.neighbors.push(grid[i - 1][j    ]);
    }
    if(down){
       this.neighbors.push(grid[i    ][j + 1]);
    }
    if(up){
      this.neighbors.push(grid[i    ][j - 1]);
    }
    if(right && up){
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if(left  && up){
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if(right && down){
      this.neighbors.push(grid[i + 1][j + 1]);
    }
    if(left  && down){
      this.neighbors.push(grid[i - 1][j + 1]);
    }
  }
}
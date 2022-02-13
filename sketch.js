function removeFromArray(arr,elt){
  for(var i= arr.length-1; i>=0;i--){
    if(arr[i] == elt){
      arr.splice(i,1);
    }
  }
}

function heuristic(a,b){
  var d = dist(a.i,a.j,b.i,b.j);
  //var d = abs(a.i-b.i) + abs(a.j-b.j);
  return d;
}

var scl = 20;
var cols,rows;
var grid = [];


var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

function setup() {
  createCanvas(1000, 1000);
  cols = floor(width/scl);
  rows = floor(height/scl);
  
  
  grid= new Array(cols);
  for(var i=0;i<cols;i++){
    grid[i] = new Array(rows);
  }
  
  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j] = new Spot(i,j,scl);
    }
  }
  
   for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j].addNeighbors(grid);
    }
  }
  
  start =grid[0][0];
  end = grid[cols-1][rows-1];
  
  start.wall = false;
  end.wall = false;
  
  openSet.push(start);
}

function draw() {
  background(0);
  if(openSet.length>0){
    
    var winner = 0;
    for(var i=0;i<openSet.length;i++){
      if(openSet[i].f < openSet[winner].f){
        winner = i;
      }
    }
    var current = openSet[winner];
    
    if(current === end){
      

      noLoop();
      console.log("DONE!");
    }
    
    // openSet.remove(current);
    removeFromArray(openSet, current);
    closedSet.push(current);
    
    var neighbors = current.neighbors;
    for(var i=0;i<neighbors.length; i++){
      var neighbor = neighbors[i];
      
      if(!closedSet.includes(neighbor) && !neighbor.wall){
        var tempG = current.g + 1;
        
        var newPath = false;
        if(openSet.includes(neighbor)){
          if(tempG< neighbor.g){
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        
        if(newPath){
          neighbor.h = heuristic(neighbor,end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
        
        
        
        
      }
      
      
      neighbor.g = current.g + 1;
    }
    //keep going
  } else {
    console.log("NO SOLUTION");
    noLoop();
    return;
    //no solution
  }
  

  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j].show(color(255));
    }
  }
  
  for(var i=0;i<closedSet.length; i++){
    closedSet[i].show(color(255,0,0));
  }
  
  for(var i=0;i<openSet.length; i++){
    openSet[i].show(color(0,255,0));
  }
  
    // Find the path
  path = [];
  var temp = current;
  path.push(temp);
  while(temp.previous){
    path.push(temp.previous);
    temp = temp.previous;
  }
  
  for(var i=0;i<path.length; i++){
    path[i].show(color(0,0,255));
  }
  
  noFill();
  stroke(255);
  beginShape();
  for(var i=0;i<path.length;i++){
    vertex(path[i].i * scl + scl/2, path[i].j * scl + scl/2);
  }
  endShape();
}
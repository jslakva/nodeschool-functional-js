class DnD
{
  static * generatePositions(start, end, pixStep = 2)
  {
    yield {x: Math.round(start.x), y: Math.round(start.y)};
    let xDiff = end.x - start.x;
    let yDiff = end.y - start.y;
    if(xDiff !== 0 || yDiff !== 0) {
      if(xDiff === 0) {
        if(start.y < end.y) {
          for(let y = start.y; y < end.y; y += pixStep) {
            yield {x: Math.round(start.x), y: Math.round(y)};
          }
        } else {
          for(let y = start.y; y > end.y; y -= pixStep) {
            yield {x: Math.round(start.x), y: Math.round(y)};
          }
        }
      } else if(xDiff !== 0) {
        let a = yDiff / xDiff;
        let b = start.y - a * start.x;
        if(start.x < end.x) {
          for(let x = start.x; x < end.x; x += pixStep) {
            yield {x: Math.round(x), y: Math.round(a * x + b)};
          }
        } else {
          for(let x = start.x; x > end.x; x -= pixStep) {
            yield {x: Math.round(x), y: Math.round(a * x + b)};
          }
        }
      }
    }
    yield {x: Math.round(end.x), y: Math.round(end.y)};
  }
  static generatePositionsArr(start, end, pixStep = 2) {
    let res = [{x: Math.round(start.x), y: Math.round(start.y)}];
    let xDiff = end.x - start.x;
    let yDiff = end.y - start.y;
    if(xDiff !== 0 || yDiff !== 0) {
      if(xDiff === 0) {
        if(start.y < end.y) {
          for(let y = start.y; y < end.y; y += pixStep) {
            res.push({x: Math.round(start.x), y: Math.round(y)});
          }
        } else {
          for(let y = start.y; y > end.y; y -= pixStep) {
            res.push({x: Math.round(start.x), y: Math.round(y)});
          }
        }
      } else if(xDiff !== 0) {
        let a = yDiff / xDiff;
        let b = start.y - a * start.x;
        if(start.x < end.x) {
          for(let x = start.x; x < end.x; x += pixStep) {
            res.push({x: Math.round(x), y: Math.round(a * x + b)});
          }
        } else {
          for(let x = start.x; x > end.x; x -= pixStep) {
            res.push({x: Math.round(x), y: Math.round(a * x + b)});
          }
        }
      }
    }
    res.push({x: Math.round(end.x), y: Math.round(end.y)});
    return res;
  }
}
max = 1000000;

console.time("array-of");
let arrOf = DnD.generatePositionsArr({x:0, y:0}, {x:max, y:max});
for(let pos of arrOf) {
}
console.timeEnd("array-of");


console.time("array");
let arr = DnD.generatePositionsArr({x:0, y:0}, {x:max, y:max});
for(let pos in arr) {
}
console.timeEnd("array");

console.time("generator");
let gen = DnD.generatePositions({x:0, y:0}, {x:max, y:max});
let z=0;
for(let pos of gen) {
  z = z + pos.x + pos.y;
}
console.timeEnd("generator");



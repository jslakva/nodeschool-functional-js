function getRecurseDeps(tree) {
  if (tree === undefined)
    return [];
  //console.log(tree);
  let keys = Object.keys(tree);
  let res = [];
  keys.forEach(function(key) {
    res.push(`${key}@${tree[key]['version']}`);
    if (tree[key]['dependencies'])
      res = res.concat(getRecurseDeps(tree[key]['dependencies']));
  });
  return res;
}

function getDependencies(tree) {
  // SOLUTION GOES HERE
  // Note: Feel free to add additional arguments
  // to this function for use with recursive calls.
  // Or not! There are many ways to recurse.
  //console.log(tree);
  if (tree === undefined)
    return [];
  let res = getRecurseDeps(tree['dependencies']);

  res.sort();
  res = res.filter((e, i, a)=>(i===0)||e!==a[i-1]);

  return res;
}

module.exports = getDependencies


let o = {
  version: '2.1.1',
  dependencies: { 'object-keys': { version: '0.4.0' } }
};

//let r = module.exports(o);
//console.log(r);
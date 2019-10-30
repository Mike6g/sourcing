/// Common JS


function createElementFromSet(name, mySet) {
    for(let a of mySet) {
        let li = document.createElement('li');
        li.className = "list-group-item";
        li.id= a.replace(/ /g, '_');
        li.onclick = () => toggleFilter(a);
        li.appendChild(document.createTextNode(a));
        document.getElementById(name).appendChild(li); 
    }
}



var allFilters = [];
function toggleFilter(filter) {
  let index = allFilters.indexOf(filter);
  filter_= filter.replace(/ /g, '_');
  if(index > -1) {
    allFilters.splice(index, 1);
    document.querySelector('#' + filter_).className = document.querySelector('#' + filter_).className.replace(' active', '');
  } else {
      allFilters.push(filter);
    document.querySelector('#' + filter_).className +=' active';
  }
  filterGraph();
}

function filterGraph() {
  var filteredLinks = graph.links;
  if(allFilters.length > 0) {
    filteredLinks = graph.links.filter( l => allFilters.includes(l.source.id) || allFilters.includes(l.target.id));
  }
  nodes = graph.nodes.map(n => { o = new Object(); o.id=n.id; o.group = n.group; return o});
  redoLink(filteredLinks);
  simulation.force("link").links(filteredLinks);
  simulation.alpha(0)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .restart();
}
  
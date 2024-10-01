class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex); // Adds vertex to the set of nodes.
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    //Iterate over each vertex in the array and add it to the set.
    for(let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    
    v1.adjacent.add(v2); // Add v2 as adjacent to v1.

    v2.adjacent.add(v1); // Add v1 as adjacent to v2.
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {

    v1.adjacent.delete(v2); // Remove v2 from v1 adjacent set.

    v2.adjacent.delete(v1); // Remove v1 from v2 adjacent set.

  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {

    // Remove the vertex from adjacent list.
    for(let node of this.nodes){
      node.adjacent.delete(vertex);
    }

    // Then remove the vertex from the graph.
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const results = [];

    function traverse(vertex) {
      if(!vertex) return; // If no vertex return.

      visited.add(vertex);
      results.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }
  
    traverse(start);
    return results;
  
   }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    const results = [];
    const visited = new Set();

    queue.push(start);
    visited.add(start);

    while(queue.length) {
      const current = queue.shift();
      console.log(current.value)

      for(let neighbor of current.adjacent) {
        if(!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return results;
  }
}

module.exports = {Graph, Node}
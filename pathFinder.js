'use strict';

class PathFinder {
  constructor (graph) {
    this.visited = {};
    this.unvisited = {};
    this.graph = graph;

    this.setupUnvisited();
  }

  findShortestPath (startNode, endNode) {
    let selectedNode = this.graph.vertices[startNode];

    let paths = Object.keys(selectedNode.neighbors).map(k => {
      return selectedNode.neighbors[k];
    });
    console.log(paths);
  }

  setupUnvisited () {
    for (let label in this.graph.vertices) {
      this.unvisited[label] = {
        cost: undefined,
        previous: undefined,
        visited: false
      };
    }
  }
}

module.exports = PathFinder;

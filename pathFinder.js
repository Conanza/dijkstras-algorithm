'use strict';

class PathFinder {
  constructor (graph) {
    this.visited = {};
    this.unvisited = {};
    this.graph = graph;

    this.setupUnvisited();
  }

  get hasNoneReachable () {
    return this.unvisitedLabels.every(label => {
      return this.unvisited[label].cost === undefined;
    });
  }

  get hasUnvisitedAndReachable () {
    return this.unvisitedLabels.length > 0 && !this.hasNoneReachable;
  }

  get nextLowestUnvisited () {
    let tempUnvisited;
    let result;

    for (let label in this.unvisited) {
      if (this.unvisited[label].cost === undefined) continue;

      if (!tempUnvisited || this.unvisited[label].cost < tempUnvisited.cost) {
        tempUnvisited = this.unvisited[label];
        result = label;
      }
    }

    return result ? this.graph.vertices[result] : null;
  }

  get unvisitedLabels () {
    return Object.keys(this.unvisited);
  }

  findShortestPath (startLabel, endLabel) {
    if (Object.keys(this.visited).length > 0) this.resetSearch();

    let startNode = this.graph.vertices[startLabel];
    this.unvisited[startNode.label].cost = 0;
    this.unvisited[startNode.label].prevNode = startNode;

    let currentNode = startNode;
    while (this.hasUnvisitedAndReachable) {
      this.visited[currentNode.label] = Object.assign({}, this.unvisited[currentNode.label]);
      delete this.unvisited[currentNode.label];

      if (endLabel && currentNode.label === endLabel) {
        break;
      }

      let paths = Object.keys(currentNode.neighbors).map(k => {
        return currentNode.neighbors[k];
      });

      let currentCost = this.visited[currentNode.label].cost;
      paths.forEach(path => {
        let unvisited = this.unvisited[path.vertex.label];
        if (unvisited === undefined) return;

        let newCost = currentCost + path.edge.weight;
        if (unvisited.cost === undefined || newCost < unvisited.cost) {
          unvisited.cost = newCost;
          unvisited.prevNode = currentNode;
        }
      });

      currentNode = this.nextLowestUnvisited;
    }
  }

  printPathTo (endNode) {
    if (!endNode) {
      Object.keys(this.visited).forEach(key => this.printPathTo(key));
    } else if (!this.visited[endNode]) {
      console.log(`${endNode} was unreachable`);
    } else {
      let path = [endNode];
      let currentNode = this.graph.vertices[endNode];
      let prevNode = this.visited[endNode].prevNode;

      while (!currentNode.equal(prevNode)) {
        path.unshift(prevNode.label);
        currentNode = prevNode;
        prevNode = this.visited[currentNode.label].prevNode;
      }

      console.log(`Shortest path to ${endNode}: ${path.join(' > ')}`);
      console.log(`Total Cost: ${this.visited[endNode].cost}`);
    }
  }

  resetSearch () {
    this.unvisited = {};
    this.visited = {};
    this.setupUnvisited();
  }

  setupUnvisited () {
    for (let label in this.graph.vertices) {
      this.unvisited[label] = {
        cost: undefined,
        prevNode: undefined
      };
    }
  }
}

module.exports = PathFinder;

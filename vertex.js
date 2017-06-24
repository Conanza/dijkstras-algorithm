'use strict';

class Vertex {
  constructor (opts) {
    this.label = opts.label;
    this.neighbors = {};
  }

  addNeighbor (vertex, edge) {
    if (this.hasNeighbor(vertex)) {
      console.warn(`neighbor ${vertex.label} exists`);
      return;
    }

    this.neighbors[vertex.label] = {
      edge: edge,
      vertex: vertex
    };
  }

  equal (otherVertex) {
    return this.label === otherVertex.label;
  }

  hasNeighbor (vertex) {
    return this.neighbors[vertex.label] !== undefined;
  }
}

module.exports = Vertex;

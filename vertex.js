'use strict';

class Vertex {
  constructor (opts) {
    this.label = opts.label;
    this.neighbors = {};
  }

  addNeighbor (vertex, edge) {
    if (this.hasNeighbor(vertex)) { console.warn('neighbor exists'); return; }

    this.neighbors[vertex.label] = {
      edge: edge,
      vertex: vertex
    };
  }

  hasNeighbor (vertex) {
    return this.neighbors[vertex.label] !== undefined;
  }
}

module.exports = Vertex;

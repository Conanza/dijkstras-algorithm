'use strict';

class Edge {
  constructor (opts) {
    this.destination = opts.destination;
    this.origin = opts.origin;
    this.weight = opts.weight;
  }
}

module.exports = Edge;

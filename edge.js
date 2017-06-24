'use strict';

class Edge {
  constructor (opts) {
    this.destination = opts.destination;
    this.origin = opts.origin;
    this.weight = opts.weight;
  }

  get label () {
    return `${this.origin.label}-${this.destination.label}`;
  }
}

module.exports = Edge;

'use strict';

const fs = require('fs');
const Edge = require('./edge.js');
const Vertex = require('./vertex.js');

class Graph {
  constructor (file) {
    this.vertices = {};
    this.edges = {};

    this.constructGraph(file);
  }

  constructGraph (file) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw new Error('error while reading file');
      data = JSON.parse(data);

      Object.keys(data).forEach(key => {
        this.vertices[key] = this.vertices[key] || new Vertex({ label: key });
        let origin = this.vertices[key];
        let neighbors = data[key];

        Object.keys(neighbors).forEach(key => {
          this.vertices[key] = this.vertices[key] || new Vertex({ label: key });
          let dest = this.vertices[key];
          let edge = new Edge({
            origin: origin,
            destination: dest,
            weight: neighbors[key]
          });

          this.edges[`${edge.origin.label}-${edge.destination.label}`] = edge;

          origin.addNeighbor(dest, edge);
        });
      });
    });
  }
}

module.exports = Graph;

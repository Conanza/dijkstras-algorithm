'use strict';

const fs = require('fs');
const Edge = require('./edge.js');
const Vertex = require('./vertex.js');

class Graph {
  constructor () {
    this.vertices = {};
    this.edges = {};
  }

  constructGraph (file) {
    let promise = new Promise((resolve, reject) => {
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

            this.edges[edge.label] = edge;

            origin.addNeighbor(dest, edge);
          });
        });

        resolve(this);
      });
    });

    return promise;
  }
}

module.exports = Graph;

/*
  TODO
  ref. https://en.wikipedia.org/wiki/Graph_(abstract_data_type)

 * adjacent(G, x, y): tests whether there is an edge from the vertex x to the vertex y;
 * neighbors(G, x): lists all vertices y such that there is an edge from the vertex x to the vertex y;
 * add_vertex(G, x): adds the vertex x, if it is not there;
 * remove_vertex(G, x): removes the vertex x, if it is there;
 * add_edge(G, x, y): adds the edge from the vertex x to the vertex y, if it is not there;
 * remove_edge(G, x, y): removes the edge from the vertex x to the vertex y, if it is there;
 * get_vertex_value(G, x): returns the value associated with the vertex x;
 * set_vertex_value(G, x, v): sets the value associated with the vertex x to v.

  Structures that associate values to the edges usually also provide:
 * get_edge_value(G, x, y): returns the value associated with the edge (x, y);
 * set_edge_value(G, x, y, v): sets the value associated with the edge (x, y) to v.
 */

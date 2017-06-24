'use strict';

const Graph = require('./graph.js');
const PathFinder = require('./pathFinder.js');

let graph = new Graph();
graph.constructGraph('./data.json').then((succ, err) => {
  let graph = succ;
  let finder = new PathFinder(graph);

  finder.findShortestPath('A');
});

'use strict';

const Graph = require('./graph.js');
const PathFinder = require('./pathFinder.js');

let graph = new Graph();
graph.constructGraph('./data.json').then((succ, err) => {
  let graph = succ;
  let finder = new PathFinder(graph);

  finder.findShortestPath('A');
});

let graph2 = new Graph();
graph.constructGraph('./data2.json').then((succ, err) => {
  let finder = new PathFinder(succ);
  finder.findShortestPath('A');
});

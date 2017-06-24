'use strict';

const Graph = require('./graph.js');
const PathFinder = require('./pathFinder.js');

let graph = new Graph();
graph.constructGraph('./data/data.json').then((succ, err) => {
  let finder = new PathFinder(succ);
  finder.findShortestPath('A');
  finder.printPathTo();
});

let graph2 = new Graph();
graph2.constructGraph('./data/data2.json').then((succ, err) => {
  let finder = new PathFinder(succ);
  finder.findShortestPath('A');
  finder.printPathTo('E');
  finder.printPathTo('H');
  finder.printPathTo('A');
});

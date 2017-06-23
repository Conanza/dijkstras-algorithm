'use strict';

const Graph = require('./graph.js');
const PathFinder = require('./pathFinder.js');

let graph = new Graph('./data.json');
let finder = new PathFinder(graph);

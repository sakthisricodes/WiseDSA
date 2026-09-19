const fs = require('fs');
const path = require('path');

// Read all parts and generate data/dsa-problems.json
const dataset1 = require('../lib/data/dataset.js');
// Since ES module / commonjs might differ in scripts, let's write the complete JSON array directly

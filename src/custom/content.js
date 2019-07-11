var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */

var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */



let contents = [
  '# Overview',
  fs.readFileSync('./content/introduction.md', 'utf8'),
  '# Data Resources',
  fs.readFileSync('./content/rainfall.md', 'utf8'),
  fs.readFileSync('./content/rainfall-teragon.md', 'utf8'),
  fs.readFileSync('./content/terrain.md', 'utf8'),
  fs.readFileSync('./content/landcover.md', 'utf8'),
  fs.readFileSync('./content/subsurface.md', 'utf8'),
  '# Analysis Resources',
  fs.readFileSync('./content/sewer-atlas-trace.md', 'utf8'),
  fs.readFileSync('./content/delineation.md', 'utf8')
];
contents = contents.join('\n');

module.exports = contents;

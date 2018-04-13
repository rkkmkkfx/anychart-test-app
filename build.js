var closureBuilder = require('closure-builder');
var glob = closureBuilder.globSupport();

closureBuilder.build({
  name: 'node_bundle_files',
  options: {
    closure : {
      jscomp_error: ['deprecated', 'extraRequire',
        'missingProvide', 'missingRequire', 'newCheckTypes']
    }
  },
  srcs: glob([
    'src/*.js'
  ]),
  out: './build/node_bundle.js'
});
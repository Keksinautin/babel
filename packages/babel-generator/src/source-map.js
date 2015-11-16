import sourceMap from "source-map";
import * as t from "babel-types";

/**
 * Build a sourcemap.
 */

export default class SourceMap {
  constructor(position, opts, code) {
    this.position = position;
    this.opts     = opts;

    //console.log('-----');
    //console.log('file: opts.sourceMapTarget', opts.sourceMapTarget);
    //console.log('sourceRoot: opts.sourceRoot', opts.sourceRoot);

    if (opts.sourceMaps) {
      this.map = new sourceMap.SourceMapGenerator({
        file: opts.sourceMapTarget,
        sourceRoot: opts.sourceRoot
      });

      //console.log('setSourceContent:opts.sourceFileName', opts.sourceFileName);
      //console.log('setSourceContent:code', code);
      this.map.setSourceContent(opts.sourceFileName, code);
    } else {
      this.map = null;
    }

    //console.log('-----');
  }

  /**
   * Get the sourcemap.
   */

  get() {
    let map = this.map;
    if (map) {
      return map.toJSON();
    } else {
      return map;
    }
  }

  /**
   * Mark a node's generated position, and add it to the sourcemap.
   */

  mark(node, type) {
    console.log('SourceMap.prototype.mark:mappings::1');
    //console.log('SourceMap.prototype.mark:mappings::1', node.loc);
    //if (++_cc >= 54 && _cc <= 74) {
    //  console.log('t', new Error().stack);
    //}
    //console.log('t', new Error().stack);

    let loc = node.loc;
    if (!loc) return; // no location info
    console.log('pas if (!loc) return');

    let map = this.map;
    if (!map) return; // no source map

    if (t.isProgram(node) || t.isFile(node)) return; // illegal mapping nodes

    let position = this.position;

    let generated = {
      line: position.line,
      column: position.column
    };

    let original = loc[type];

    map.addMapping({
      source: this.opts.sourceFileName,
      generated: generated,
      original: original
    });

    console.log('SourceMap.prototype.mark:mappings::2');
  }
}

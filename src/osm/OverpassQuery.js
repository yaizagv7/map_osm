export default class OverpassQuery {
    constructor() {
        this.query = '';
        this.print = '';
    }
    nodeById(id) {
        this.query = '  node('+id+');\n';
        return this;
    }
    wayById(id) {
        this.query = '  way('+id+');\n';
        return this;
    }
    relationById(id) {
        this.query = '  rel('+id+');\n';
        return this;
    }
    nodeByTags(tags, bbox) {
        // tags.forEach((tag) => this.query += '  node["'+tag.k+'"]('+bbox+');\n');
        // tags.forEach((tag) => this.query += '  way["'+tag.k+'"]('+bbox+');\n');
        tags.forEach((tag) => tag.v ? this.query += '  node["'+tag.k+'"="'+tag.v+'"]('+bbox+');\n' : this.query += '  node["'+tag.k+'"]('+bbox+');');
        tags.forEach((tag) => tag.v ? this.query += '  way["'+tag.k+'"="'+tag.v+'"]('+bbox+');\n' : this.query += '  way["'+tag.k+'"]('+bbox+');');
        this.print = ");\nout center;";
        return this;
    }
    nodeByTagsDouble(tags, bbox) {
        tags.forEach((tag) => this.query += '  node["'+tag.k+'"="'+tag.v+'"]["'+tag.k2+'"="'+tag.v2+'"]('+bbox+');');
        tags.forEach((tag) => this.query += '  way["'+tag.k+'"="'+tag.v+'"]["'+tag.k2+'"="'+tag.v2+'"]('+bbox+');');
        this.print = ");\nout center;";
        return this;
    }
    relationByTag(tag) {
        this.query += '  rel('+tag+');\n(._;>>;);';
        this.print = ');\nout body;';
        return this;
    }
    get qlString() {
        return '[out:json][timeout:30];\n' +
            '(\n' +
            this.query +
            this.print;
    }
    get body() {
        return 'data='+this.qlString;
    }
}
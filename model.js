/**
 * This provides the default models
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Tue Feb  6 17:28:03 2018
 */

const { ConfigObjectBase } = require("@guitarpoet/configurator");
const { arrayMerge } = require("./functions");
const path = require("path");

class Projects extends ConfigObjectBase {
    _init() {
        // Let's setup the backend and the frontend types now
        this.backends().map(p => {
            p.$projects = this;
            p.$type = "be";
        });
        this.frontends().map(p => {
            p.$projects = this;
            p.$type = "fe";
        });
    }

    backends() {
        return this.get("backend.projects", []);
    }
    frontends() {
        return this.get("frontend.projects", []);
    }

    all() {
        let ret = [];
        let bes = this.backends();
        if(bes && bes.length) {
            ret = ret.concat(bes);
        }

        let fes = this.frontends();
        if(fes && fes.length) {
            ret = ret.concat(fes);
        }
        return ret;
    }
}

class Project extends ConfigObjectBase {
    /**
     * Get the dependencies of this projects
     */
    $dependencies() {
        return [];
    }

    $basePath() {
        return path.resolve(this.base);
    }

    $packageConfig() {
        if(!this._packageConfig) {
            // Let's load the package config now
            let base = this.$basePath();
            if(base) {
                this._packageConfig = require(path.join(base, "package.json"));
            }
        }
        return this._packageConfig;
    }

    $entry() {
        let p = this.$packageConfig();
        return p? path.join(this.$basePath(), p.main): null;
    }
}

module.exports = {
    Projects,
    Project
}

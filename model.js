/**
 * This provides the default models
 *
 * @author Jack <jack@thinkingcloud.info>
 * @version 0.0.1
 * @date Tue Feb  6 17:28:03 2018
 */

const { ConfigObjectBase, moduleConfig } = require("@guitarpoet/configurator");
const { getModule } = require("hot-pepper-jelly");
const { arrayMerge } = require("./functions");
const path = require("path");
const Module = require("module");

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

    $initializer() {
        return this.initializer;
    }

    $config() {
        let init = this.$initializer();
        if(init) {
            return moduleConfig(init.$module);
        }
        return null;
    }

    $nodeModule() {
        return getModule(this.$initializer().$module);
    }

    $configFile() {
        return this.configFile || "./config.yaml";
    }

    $watchFolders() {
        let w = this.watchFolders || [];
        return w.map(f => path.resolve(path.join(this.base, f)));
    }

    $webpackConfig() {
        if(this.webpack && this.webpack.config) {
            let f = path.resolve(path.join(this.base, this.webpack.config));
            return f;
        }
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

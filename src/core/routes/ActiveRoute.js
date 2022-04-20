export class ActiveRoute {
    static get path() {
        return window.location.hash.slice(1);
    }

    static set path(path) {
        window.location.hash = path;
    }

    static get param() {
        return ActiveRoute.path.split('/').slice(-1)[0];
    }
}

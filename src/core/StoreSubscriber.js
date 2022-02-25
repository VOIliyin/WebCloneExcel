import {isEqual} from '@core/utils';

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
        this.sub = null;
        this.prevState = {};
    }

    subscribeComponents(components) {
        this.prevState = this.store.getState();
        this.sub = this.store.subscribe((state) => {
            Object.keys(state).forEach((key) => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach((component) => {
                        if (component.isWathing(key)) {
                            const change = {[key]: state[key]};
                            component.storeChanged(change);
                            this.prevState = this.store.getState();
                        }
                    });
                }
            });
        });
    }

    unsubscribeFromStore() {
        this.sub.ussubscribe();
    }
}

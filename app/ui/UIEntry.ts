import RootContainer from './containers/RootContainer';
import UIController from './controllers/UIController';
// import './ui/styles/test.global.css';

export default class UIEntry {
    private rootComponentRef: React.RefObject<RootContainer>;

    constructor(rootComponentRef: React.RefObject<RootContainer>) {
        this.rootComponentRef = rootComponentRef;
    }

    // Called by index.tsx
    init() {
        // Call all other init functions needed
        UIController.init(this.rootComponentRef);
    }
}

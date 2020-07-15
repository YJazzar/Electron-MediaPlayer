import PanelType from './PanelType';

export default interface ContainerSize {
    panelType?: PanelType;

    // Will be used to have a responsive changing side
    liveWidth: number | any;
    liveHeight: number | any;

    // Will be used to counteract the delta variable
    //  from exponentially adding to itself
    currWidth: number | any;
    currHeight: number | any;

    // To make decisions easier, use this variable:
    isBeingResized: boolean;
}

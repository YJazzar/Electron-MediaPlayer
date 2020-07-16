import PanelType from './PanelType';

export default interface ContainerSize {
    panelType?: PanelType;

    // Will be used to have a responsive changing side
    liveWidth: number;
    liveHeight: number;

    // Will be used to counteract the delta variable
    //  from exponentially adding to itself
    currWidth: number;
    currHeight: number;

    // To make decisions easier, use this variable:
    isBeingResized: boolean;
}

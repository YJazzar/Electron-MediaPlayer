import styled from "styled-components";

// const darkThemeClassStyles = 'dark bg-transparent p-10 text-gray-400 panel-border-dark';
// const lightThemeClassStyles = 'light bg-transparent p-10 text-black panel-border-light';

export const LightTheme = styled.div`
    background-color: rgb(249, 244, 228);

    /* The actual scroll handle (the one users can move by clicking and dragging) */
    .panel-border {
        border-color: rgb(52, 122, 173);
    }

    /* The border colors between each panel */
    &::-webkit-scrollbar-thumb {
        background-color: rgb(168, 147, 112);
    }
`;


export const DarkTheme = styled.div`
    background-color: rgb(33, 33, 34);


    /* The actual scroll handle (the one users can move by clicking and dragging) */
    &::-webkit-scrollbar-thumb {
        background-color: rgb(232, 144, 64);
    }

    /* The border colors between each panel */
    .panel-border {
        border-color: rgb(0, 170, 235);
    }
`;


// export { DarkTheme, LightTheme };

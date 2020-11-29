import styled from "styled-components";

// const darkThemeClassStyles = 'dark bg-transparent p-10 text-gray-400 panel-border-dark';
// const lightThemeClassStyles = 'light bg-transparent p-10 text-black panel-border-light';

const BaseTheme = styled.div`
    background-color: transparent;
`;

const LightTheme = styled(BaseTheme)`
    background-color: rgb(249, 244, 228);

    /* Set the text color */
    --tw-text-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-text-opacity));


    /* The actual scroll handle (the one users can move by clicking and dragging) */
    .panel-border {
        border-color: rgb(52, 122, 173);
    }

    /* The border colors between each panel */
    &::-webkit-scrollbar-thumb {
        background-color: rgb(168, 147, 112);
    }
`;


const DarkTheme = styled(BaseTheme)`
    background-color: rgb(33, 33, 34);

    /* Set the text color */
    --tw-text-opacity: 1;
    color: rgba(156, 163, 175, var(--tw-text-opacity));

    /* The actual scroll handle (the one users can move by clicking and dragging) */
    &::-webkit-scrollbar-thumb {
        background-color: rgb(232, 144, 64);
    }

    /* The border colors between each panel */
    .panel-border {
        border-color: rgb(0, 170, 235);
    }
`;


export { DarkTheme, LightTheme };

import { motion, Variants } from 'framer-motion';
import React from 'react';
import mainConfig from '../../configs/impl/MainConfigImpl';
import './test.global.css';

export default class MainContentsPanelContainer extends React.Component<
    {},
    {}
> {
    render() {
        return (
            <div className={mainConfig.cssClassStyles}>
                <h1>Main Contents Panel</h1>
                <motion.div
                    className="rectangle"
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                />
            </div>
        );
    }
}

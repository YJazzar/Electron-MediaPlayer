import { motion, Variants } from 'framer-motion';
import React from 'react';
import mainConfig from '../../configs/impl/MainConfigImpl';
import './test.global.css';

// export default class MainContentsPanelContainer extends React.Component<
//     {},
//     {}
// > {
//     render() {
//         return (
//             <div className={mainConfig.cssClassStyles}>
//                 <h1>Main Contents Panel</h1>
//                 <motion.div
//                     className="rectangle"
//                     initial={{
//                         opacity: 0,
//                         y: 50,
//                     }}
//                     animate={{
//                         opacity: 1,
//                         y: 0,
//                     }}
//                 />
//             </div>
//         );
//     }
// }

const MainContentsPanelContainer = () => {
    const [active, setActive] = React.useState(false);

    const container: Variants = {
        active: {
            background: '#ff00b1',
        },
        disabled: {
            background: '#0D00FF',
        },
    };

    const box: Variants = {
        active: {
            rotate: 90,
            opacity: 1,
        },
        disabled: {
            rotate: 0,
            opacity: 0.7,
        },
    };

    return (
        <div className={mainConfig.cssClassStyles}>
            <motion.div
                className="rectangle"
                animate={{ rotate: 0 }}
                onClick={() => setActive(!active)}
                transition={{
                    loop: Infinity,
                    ease: 'linear',
                    duration: 2,
                }}
            >
                {/* <img src="D:\Projects\tnyPlayer\app\ui\containers\panels\arctic.jpg"/> */}
                    <motion.img
                        src="D:\Projects\tnyPlayer\app\ui\containers\panels\peng-jumping.jpg"
                        width="200"
                        className="peng"
                        initial={{
                            y: 280,
                        }}
                        animate={{
                            rotate: 360,
                            y: 100,
                        }}
                        transition={{
                            duration: 2,
                            loop: Infinity,
                            ease: 'linear',
                        }}
                    />
            </motion.div>
        </div>
    );
};

export default MainContentsPanelContainer;

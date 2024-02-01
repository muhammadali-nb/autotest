import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const FinesLoader: React.FC = () => {
    const [size, setSize] = useState("desk");

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth > 1024) {
                setSize("desk");
            } else {
                setSize("mobile");
            }
        }
        window.addEventListener('resize', checkSize);

        checkSize();

        return () => {
            window.removeEventListener('resize', checkSize);
        }
    }, []);

    return (
        <>
            {size === "desk" ?
                <ContentLoader
                    speed={1}
                    width={'100%'}
                    height={35}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="5" ry="5" width={'100%'} height="35" />
                </ContentLoader>
                :
                <ContentLoader
                    speed={1}
                    width={'100%'}
                    height={'100%'}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="5" ry="5" width={'100%'} height="165" />
                    <rect x="0" y="175" rx="5" ry="5" width={'100%'} height="165" />
                </ContentLoader>
            }
        </>
    )
}

export default FinesLoader;
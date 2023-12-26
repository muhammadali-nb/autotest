import ContentLoader from "react-content-loader";

const BalanceLoader = () => {
    return (
        <ContentLoader
            speed={1}
            width={'100%'}
            height={200}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
        </ContentLoader>
    )
}

export default BalanceLoader;
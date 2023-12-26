import ContentLoader from "react-content-loader";

const TransactionsLoader = () => {
    return (
        <ContentLoader
            speed={1}
            width={'100%'}
            height={'100%'}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="5" ry="5" width="90" height="30" />
            <rect x="0" y="40" rx="5" ry="5" width={'100%'} height="60" />
            <rect x="0" y="110" rx="5" ry="5" width={'100%'} height="60" />
        </ContentLoader>
    )
}

export default TransactionsLoader;
import ContentLoader from "react-content-loader";

const BalanceLoader: React.FC<{
    type: string
}> = (props) => {
    const { type } = props;

    return (
        <ContentLoader
            speed={2}
            width={type === "mob" ? 120 : 140}
            height={25}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="5" ry="5" width={type === "mob" ? "120" : "140"} height="25" />
        </ContentLoader>
    )
}

export default BalanceLoader;
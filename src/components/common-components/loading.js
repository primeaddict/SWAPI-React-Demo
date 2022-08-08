
import s from "./../index.module.scss"

const LoadingComponent = ({ loading = true }) => {

    const LOADING = "./images/loading.gif"

    if (!loading) return null

    return (
        <div className={s.loading}>
            <img src={LOADING} />
            Loading...
        </div>
    );
}

export default LoadingComponent
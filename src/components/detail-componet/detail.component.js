import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { a__getFilmsDetail, a__getPersonDetail, a__getStarShipDetail } from "../../redux/actions";
import { s__getPeopleDetails } from "../../redux/selectors/people";
import { getFavoriteLocalStorage, removeFavoriteLocalStorage, setFavoriteLocalStorage } from "../../utils";
import Gender from "../common-components/gender";
import s from "./detail.module.scss"
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";

const BACK = "/images/back.png";
const FAV = "/images/fav.png";
const UN_FAV = "/images/unfav.png";

const CharacterDetailsComponent = (props) => {

    const [isFavorite, setFavorite] = useState(false)
    const { d__getPersonDetails, d__getFilmsDetail, s__personDetails, d__getStarShipDetail } = props
    const { name, eye_color, hair_color, gender, films, filmsData, starships, starShipData } = s__personDetails || {};

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const url = searchParams.get("url")
    const planetName = searchParams.get("planet")

    useEffect(() => {
        d__getPersonDetails(url)
    }, [])

    useEffect(() => { setFavorite(getFavoriteLocalStorage(url)) }, [isFavorite])

    useEffect(() => {
        films && d__getFilmsDetail(films)
    }, [films])

    useEffect(() => {
        starships && d__getStarShipDetail(starships)
    }, [starships])

    function addToFavorite() {
        if (isFavorite)
            removeFavoriteLocalStorage(url)
        else {
            const personObject = { url, details: s__personDetails, planetName }
            setFavoriteLocalStorage(personObject)
        }
        setFavorite(!isFavorite)
    }

    return (
        <div className={s.container}>
            <Helmet><title>{name}</title></Helmet>

            <div className={s.name}>
                <img src={BACK} onClick={() => navigate("/")} />
                <span>{name}</span>
                <img src={isFavorite ? FAV : UN_FAV} onClick={addToFavorite} />
            </div>
            <div className={s.detailContainer}>
                <div className={s.details}>
                    <span>{name}</span>

                    <table>
                        <tr>
                            <td>
                                Eye Color
                            </td>
                            <td>
                                {eye_color}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Hair Color
                            </td>
                            <td>
                                {hair_color}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gender
                            </td>
                            <td>
                                <Gender gender={gender} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Planet Name
                            </td>
                            <td>
                                {planetName}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className={s.listBlock}>

                {filmsData && <div className={s.list}>
                    <div className={s.title}>Films</div>
                    <ul>
                        {filmsData && filmsData.map(data => {
                            return <li key={data.title}>{data.title}</li>
                        })}
                    </ul>
                </div>}

                {starShipData?.length > 0 && <div className={s.list}>
                    <div className={s.title}>StarShips</div>
                    <ul>
                        {starShipData && starShipData.map(data => {
                            return <li key={data.name}>{data.name}</li>
                        })}
                    </ul>

                </div>}

            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        s__personDetails: s__getPeopleDetails(state),
    })
}

const mapDispatchToProps = (dispatch) => {

    return {
        d__getPersonDetails: (planetUrl) => dispatch(a__getPersonDetail(planetUrl)),
        d__getFilmsDetail: (filmUrls) => dispatch(a__getFilmsDetail(filmUrls)),
        d__getStarShipDetail: (starShipUrls) => dispatch(a__getStarShipDetail(starShipUrls))

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetailsComponent);
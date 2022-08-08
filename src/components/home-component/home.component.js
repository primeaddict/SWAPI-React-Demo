import { connect } from "react-redux";
import s from "./home.module.scss"
import { a__getHomePlanet, a__getPeopleList } from "../../redux/actions"
import { useEffect, useState } from "react";
import { s__getPlanets } from "../../redux/selectors/planet";
import { s__getList, s__getPeopleList, s__people, s__previousNext } from "../../redux/selectors/people";

import { useNavigate } from "react-router-dom";
import Gender from "../common-components/gender";
import Helmet from "react-helmet";
import { API_ALL_PEOPLE } from "../../constants";

const LOGO = "/images/logo.png"
const FAV = "/images/fav.png";

var URLS = []

const HomeComponent = (props) => {

    const { planets, d__getHomePlanet, previousNext, d__getPeopleList, list = [] } = props;
    const { previous, next } = previousNext;

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(API_ALL_PEOPLE);

    let navigate = useNavigate();

    useEffect(() => {
        list && list.forEach(people => {
            let url = people?.homeworld;
            if (!URLS.includes(url)) {
                d__getHomePlanet(url)
                URLS.push(url)
            }
        })
    }, [list])


    useEffect(() => {
        d__getPeopleList(currentPage);
    }, [currentPage])


    const onNextPreviousClick = (url) => {
        setCurrentPage(url)
    }
    return (
        <div>
            <Helmet><title>Star Wars</title></Helmet>
            <div className={s.titleBar}>
                <input placeholder="Search..." onChange={e => setSearch(e.target.value)} />
                <img src={LOGO} />
                <div className={s.favoriteButton}>
                    <img src={FAV} onClick={() => navigate("/favorites")} />
                    Favorites
                </div>
            </div>

            <div className={s.container}>
                {list && list.filter(people => people.name.toLowerCase().includes(search.toLowerCase())).map(people => {
                    const { name, gender, homeworld, url } = people;
                    const planetName = planets[homeworld]?.name || ""
                    return (
                        <div onClick={(e) => {
                            navigate(`/details?url=${url}&planet=${planets[homeworld]?.name}`)
                        }} id={url} key={name} className={s.card}>
                            <div className={s.name}>{name}</div>
                            <Gender gender={gender} />
                            <div className={s.planet}>Planet: {planetName}</div>
                        </div>
                    )
                })}
            </div>
            <div className={s.previousNext}>
                <button onClick={() => { onNextPreviousClick(previous) }} className={`${!previous && s.previousNextDisabled}`}>Previous</button>
                <button onClick={() => { onNextPreviousClick(next) }} className={`${!next && s.previousNextDisabled}`}>Next</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return (
        {
            peoples: s__getPeopleList(state),
            list: s__getList(state),
            planets: s__getPlanets(state),
            previousNext: s__previousNext(state)
        }
    )
}

const mapDispatchToProps = (dispatch) => {

    return {
        d__getHomePlanet: (planetUrl) => dispatch(a__getHomePlanet(planetUrl)),
        d__getPeopleList: (personUrl) => dispatch(a__getPeopleList(personUrl)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
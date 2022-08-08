import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoriteListLocalStorage, removeFavoriteLocalStorage, updateWholeFavoriteLocalStorage } from "../../utils";
import Gender from "../common-components/gender";
import { Helmet } from "react-helmet"

import s from "./favorite.module.scss";
import GenderChangeCard from "../common-components/gender-change-card";
const BACK = "/images/back.png";

var LOCAL_URL = "";
const FavoriteComponent = () => {

    const [favoriteList, setFavoriteList] = useState([])
    const [showGender, setShowGender] = useState(false)
    const [forceUpdate, setForceUpdate] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setFavoriteList(() => {
            let object = getFavoriteListLocalStorage()
            let list = Object.keys(object).map(element => {
                return object[element]
            })
            return list
        })
    }, [forceUpdate])

    const updateValue = (url, newValue, optionToUpdate) => {
        const objectToUpdate = favoriteList.find(obj => obj.url === url)
        objectToUpdate.details[optionToUpdate] = newValue
        setFavoriteList((oldList) => {
            return oldList.map(object => {
                if (object.url === url) return objectToUpdate
                return object
            })
        })

        //FORCE UPDATE ON VALUE CHANGE
        if (optionToUpdate === "gender") updateFavoriteListInLocal()
    }


    const removeFromFavorite = (url) => {
        removeFavoriteLocalStorage(url);
        setForceUpdate(!forceUpdate)
    }

    const updateFavoriteListInLocal = () => {
        const updatedObject = {};
        favoriteList.forEach(element => {
            updatedObject[element.url] = element
        })
        updateWholeFavoriteLocalStorage(updatedObject)
    }

    return (
        <div className={s.container}>
            <GenderChangeCard close={setShowGender} open={showGender} onClick={(gender) => updateValue(LOCAL_URL, gender, "gender")} />
            <Helmet><title>Favorites</title></Helmet>
            <div className={s.name}>
                <img src={BACK} onClick={() => navigate("/")} />
                <span className={s.title}>Favorites</span>
            </div>
            <div className={s.detailContainer}>
                {favoriteList && favoriteList.map(favorite => {
                    const { details, url, planetName } = favorite;
                    const { name, height, gender } = details;
                    return (
                        <div className={s.details} key={url}>
                            <div className={s.list}>
                                <div className={s.card}>
                                    <span className={s.key}>Name:</span>
                                    <div className={s.value}><input onBlur={updateFavoriteListInLocal} onChange={(e) => updateValue(url, e.target.value, "name")} type="text" value={name} /></div>
                                </div>

                                <div className={s.card}>
                                    <span className={s.key}>Height:</span>
                                    <span className={s.value}>
                                        <input onBlur={updateFavoriteListInLocal} onChange={(e) => updateValue(url, e.target.value, "height")} type="number" value={height} />
                                    </span>
                                </div>

                                <div className={s.card}>
                                    <span className={s.key}>Gender:</span>
                                    <span onClick={() => {
                                        LOCAL_URL = url
                                        setShowGender(true)
                                    }} className={s.value}><Gender gender={gender} /></span>
                                </div>

                                <div className={s.card}>
                                    <span className={s.key}>Home Planet:</span>
                                    <span className={s.value}>{planetName}</span>
                                </div>

                                <div className={s.bottomButton}>
                                    <button onClick={() => navigate(`/details?url=${url}&planet=${planetName}`)}>More Details</button>
                                    <button style={{ color: "red" }} onClick={() => removeFromFavorite(url)}>Remove</button>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default FavoriteComponent;
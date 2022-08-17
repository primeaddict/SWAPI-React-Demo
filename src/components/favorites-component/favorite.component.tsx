import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoriteListLocalStorage, removeFavoriteLocalStorage, updateWholeFavoriteLocalStorage } from "../../utils";
import Gender from "../common-components/gender";
import { Helmet } from "react-helmet"
import GenderChangeCard from "../common-components/gender-change-card";
import s from "./favorite.module.scss";
const BACK: string = "/images/back.png";

interface DetailsInterface {
    name: string, height: string, gender: string
}

interface FavoritesInterface {
    details: DetailsInterface,
    url: string,
    planetName: string
}


var LOCAL_URL: string = "";
const FavoriteComponent = (): JSX.Element => {

    const [favoriteList, setFavoriteList] = useState<FavoritesInterface[]>([])
    const [showGender, setShowGender] = useState<boolean>(false)
    const [forceUpdate, setForceUpdate] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        setFavoriteList(() => {
            let object: any = getFavoriteListLocalStorage();

            let list: FavoritesInterface[] = Object.keys(object).map(element => {
                return object[element]
            })
            return list
        })
    }, [forceUpdate])

    const updateValue = (url: string, newValue: string, optionToUpdate: string) => {
        const objectToUpdate: any = favoriteList.find((obj: any) => obj.url === url);
        objectToUpdate.details[optionToUpdate] = newValue;

        setFavoriteList(oldList => {

            let list: FavoritesInterface[] = oldList.map((object: any) => {
                if (object.url === url) return objectToUpdate
                return object
            })
            return list
        })

        //FORCE UPDATE ON VALUE CHANGE
        if (optionToUpdate === "gender") updateFavoriteListInLocal()
    }


    const removeFromFavorite = (url: string) => {
        removeFavoriteLocalStorage(url);
        setForceUpdate(!forceUpdate)
    }

    const updateFavoriteListInLocal = () => {
        const updatedObject: any = {};
        favoriteList.forEach((element: any) => {
            updatedObject[element.url] = element
        })
        updateWholeFavoriteLocalStorage(updatedObject)
    }



    return (
        <div className={s.container}>
            <GenderChangeCard close={setShowGender} open={showGender} onClick={(gender: string) => updateValue(LOCAL_URL, gender, "gender")} />
            <Helmet><title>Favorites</title></Helmet>
            <div className={s.name}>
                <img src={BACK} onClick={() => navigate("/")} />
                <span className={s.title}>Favorites</span>
            </div>
            <div className={s.detailContainer}>
                {favoriteList && favoriteList.map((favorite: FavoritesInterface) => {

                    const { details, url, planetName } = favorite

                    const { name, height, gender }: DetailsInterface = details;
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
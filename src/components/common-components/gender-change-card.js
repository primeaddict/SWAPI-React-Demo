import Gender from "./gender"

import s from "../index.module.scss"

const GenderChangeCard = ({ onClick, open, close }) => {


    if (!open) return null

    return (
        <div id="outside" onClick={(e) => {
            if (e.target.id === "outside") close(false)

        }} className={s.genderCard}>
            <div className={s.card}>

                <div>
                    <p>Select Gender</p>
                </div>
                <div>
                    <Gender width="50px" onClick={() => {
                        onClick("male")
                        close(false)
                    }} gender={"male"} />
                    <Gender width="50px" onClick={() => {
                        onClick("female")
                        close(false)
                    }} gender={"female"} />
                     <Gender width="50px" onClick={() => {
                        onClick("unknown")
                        close(false)
                    }} gender={"unknown"} />
                </div>
            </div>

        </div>
    )
}

export default GenderChangeCard
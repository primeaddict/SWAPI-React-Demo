import { useEffect } from "react";

const MALE = "/images/male.png"
const FEMALE = "/images/female.png"
const GENDER_NA = "/images/na.png"

const Gender = ({ gender, onClick, width }) => {
    let genderUrl = gender == "male" ? MALE : gender == "female" ? FEMALE : GENDER_NA;
    return (<img onClick={onClick} style={{ width: width ? width : '20px' }} src={genderUrl} alt={gender} />)
}

export default Gender
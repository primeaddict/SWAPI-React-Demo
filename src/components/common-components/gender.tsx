import { MouseEventHandler } from "react";
import * as React from "react";

const MALE: string = "/images/male.png"
const FEMALE: string = "/images/female.png"
const GENDER_NA: string = "/images/na.png"

type Props = {
    gender: any,
    onClick?: MouseEventHandler,
    width?: string
}

const Gender: React.FC<{ gender: string }> = ({ gender, onClick, width }: Props) => {
    let genderUrl: string = gender == "male" ? MALE : gender == "female" ? FEMALE : GENDER_NA;
    return (<img onClick={onClick} style={{ width: width ? width : '20px' }} src={genderUrl} alt={gender} />)
}

export default Gender
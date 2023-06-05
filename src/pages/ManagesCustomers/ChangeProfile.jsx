import { useState } from "react"

const [profile, setProfile] = useState([
    {
        id: 1,
        image: "https://source.unsplash.com/random/?profile",
        password: "*&&#@&&@#$$##",
        name: "Mr. Jack",
        username: "Jack",
        email: "jack@gmail.com",
        //phone: 085377777777,
        address: "814 Howard Street, 120065, Indonesia",
        gender: "Male",
        //height: 173,
        //weight: 73,
        //goal_weight: 65,
        training_level : "Beginner"
    },
])
const ChangeProfile = () => {
    return (
        <>
            <div className="change-profile">
                <h4>Change Profile</h4>
                
            </div>
        </>
    )
}

export default ChangeProfile
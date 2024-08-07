import "./ViewBigPic.css"

import { Link } from "react-router-dom"

function ViewBigPic({
    setViewBigImg,
    viewBigImg,
    bigImg,
    username,
    userImg,
    userId
}){
    console.log(bigImg)
    return(
        <div className="modal">
            <div id="bigPicGrid">
                <div id="bigImgContainer">
                    <img 
                        id="renderBigImg"
                        src={bigImg}
                    />
                </div>

                <div id="bigPicBlock">
                    <div id="userPicInfoGrid">
                        <Link to={`/users/${userId}`}>
                            <img 
                                id="userPicImg"
                                src={userImg}
                            />
                        </Link>

                        <h3>{username}</h3>
                    </div>
                </div>

                <div>
                    <button onClick={() => setViewBigImg(!viewBigImg)}>
                        ❌
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ViewBigPic
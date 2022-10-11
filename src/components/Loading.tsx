import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';
const Loading = React.memo(() =>{
    return(
        <Player 
            src="https://lottie.host/3188f2cb-3124-40c4-a47a-17fb9658d4dc/MBkafvCGT7.json"
            background="transparent"
            speed={1}
            style={{width: '280px', height: '300px'}}
            className="ml-auto mr-auto my-4 loading" loop autoplay></Player>
    )
})

export default Loading;
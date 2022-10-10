import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';
const Loading = React.memo(() =>{
    return(
        <Player 
            src="https://lottie.host/c6adff8b-27bc-48e3-a625-5bcc7331acf1/2TLwoxtwof.json"
            background="transparent"
            speed={1}
            style={{width: '150px', height: '300px'}}
            className="ml-auto mr-auto my-4 loading" loop autoplay></Player>
    )
})

export default Loading;
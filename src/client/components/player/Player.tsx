import { useEffect } from 'react';
import './Player.scss';

export type PlayerType = {
    mp3: string;
    img: string;
    details: string;
}

type PlayerProps = {
    song: PlayerType;
    audioRef: any;
}
export default function Player({song: {mp3, img, details}, audioRef}: PlayerProps) {
    const {title} = JSON.parse(details);
    console.log({details, title})
    useEffect(() => {
        document.title = title;
    }, [title])
    return(
        <div className="mp3player minimized">
            <audio controls autoPlay={true} preload="true" ref={audioRef} >
                <source src={mp3} type="audio/mpeg"></source>
            </audio>
            <img src={img} alt={title}/>
        </div>
    );
}
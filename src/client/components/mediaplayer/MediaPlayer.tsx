import { useEffect } from "react";
import { PlayerType } from "../player/Player";
import { UseMediaHelper } from "../../hooks/customHooks";
import Card from "./card/Card";
import './MediaPlayer.scss';

type MPType = {
    reload: boolean;
    setSong: React.Dispatch<React.SetStateAction<PlayerType>>;
    toggleShowModal: (id: string) => void;
}

export default function MediaPlayer({ toggleShowModal, setSong, reload}: MPType) {
    const {
        addSong,
        content,
        song,
        playing,
        audioRef,
        setReload,
    } = UseMediaHelper();
    
    useEffect(() => {
        if (song) {
            setSong({song, audioRef});
        }
    }, [audioRef, setSong, song])
    
    
    if (!content) return null;

    const {folder, content: {folders, files}} = content ;

    if (!files) return null;
    return(
        <ul className="mediaContent">
            {files?.map((file) => (
                <Card
                    key={file.youtubeId}
                    entry={file}
                    addSong={addSong}
                    song={song}
                    playing={playing}
                    showModal={toggleShowModal}
                />
            ))}
        </ul>
    );
}
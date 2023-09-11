import { useEffect, useState } from "react";
import CardMenu from "../CardMenu";
import { basePath } from "../../../../constants";
import SvgIcon from "../../common/SvgIcon";
import './Card.scss';

export type FileType = {
    id: number;
    youtubeId: string;
    name: string;
    folder: string;
    completed: number;
    addTime: string;
    tags: string;
    details: string;
}

export type SongType = {
    details: string;
    img: string;
    mp3: string;
    title: string;
    youtubeId: string;
}

type CardProps = {
    addSong: (name:string, title: string, details: string, youtubeId: string) => void;
    entry: FileType;
    song?: SongType | void;
    playing: boolean;
    showModal: (id: string) => void;
}

const public_path = `${basePath}files/mp3/`;

export default function Card({addSong, entry, playing, song, showModal}: CardProps) {
    const [active, setActive] = useState(false);
    const [viewDetails, setViewDetails] = useState(false);
    const {id, youtubeId, name, folder, tags, details} = entry;
    useEffect(() => {
        if (song) {
            setActive(song?.mp3?.includes(youtubeId) && playing)
        }
    }, [playing, song?.mp3, youtubeId]);
    
    // useEffect(() => {
    //     function listen(ev) {
    //         console.log(ev);
    //     }
    //     const audio = document.querySelector('audio');
    //     audio && audio.addEventListener('click', listen)
    //     return () => {
    //         audio && audio.removeEventListener('click', listen);
    //     }
    
    // }, [song])
    
    const {channel_url, description, duration_string, title} =  JSON.parse(details);
    return (
        <li className={`card ${active ? 'active' : ''}`} key={`${id}${youtubeId}`}>
            <CardMenu showModal={showModal} id={youtubeId}/>
            <div className="controls"
                onClick={() => addSong(`${public_path}${name}`, title, details, youtubeId)}
            >
                { active
                    ? (<svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 9.79999C10.5 9.35818 10.8582 9 11.3 9H11.7C12.1418 9 12.5 9.35818 12.5 9.79999V18.2C12.5 18.6418 12.1418 19 11.7 19H11.3C10.8582 19 10.5 18.6418 10.5 18.2V9.79999Z" fill="#ffffff94"/><path d="M16.3 9C15.8582 9 15.5 9.35818 15.5 9.79999V18.2C15.5 18.6418 15.8582 19 16.3 19H16.7C17.1418 19 17.5 18.6418 17.5 18.2V9.79999C17.5 9.35818 17.1418 9 16.7 9H16.3Z" fill="#ffffff94"/><path clipRule="evenodd" d="M1 14C1 6.82031 6.82031 1 14 1C21.1797 1 27 6.82031 27 14C27 21.1797 21.1797 27 14 27C6.82031 27 1 21.1797 1 14ZM14 3C7.92487 3 3 7.92487 3 14C3 20.0751 7.92487 25 14 25C20.0751 25 25 20.0751 25 14C25 7.92487 20.0751 3 14 3Z" fill="#ffffff94" fillRule="evenodd"/></svg>)
                    : (<svg height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M19.5 13.134C20.1667 13.5189 20.1667 14.4811 19.5 14.866L12 19.1962C11.3333 19.5811 10.5 19.0999 10.5 18.3301V9.66987C10.5 8.90007 11.3333 8.41895 12 8.80385L19.5 13.134ZM12.5 11.4019L17 14L12.5 16.5981V11.4019Z" fill="#ffffff94" fillRule="evenodd"/><path clipRule="evenodd" d="M14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1ZM3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14Z" fill="#ffffff94" fillRule="evenodd"/></svg>)
                }
            </div>
            <img
                src={`${public_path}${name}.webp`}
                alt={`${folder}{${name}.webp`}
            />
            <h3>
                <div className={`title ${active ? 'play' : ''}`}>
                    <SvgIcon name={`${active ? 'play' : 'not_started'}`} />
                    {title}
                </div>
                <div className="duration">
                    <div className="durata">
                        Durata - {duration_string}
                    </div>
                    <a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank">
                        <SvgIcon name="link" />
                        View Video
                    </a>
                </div>
            </h3>
            <p className={`limited${viewDetails ? ' view': ''}`} onClick={() => setViewDetails(prev => !prev)}>{description}</p>
        </li>
    );
}
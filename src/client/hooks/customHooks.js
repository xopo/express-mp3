import { useEffect, useState, useRef, useCallback } from "react";
import { apiGetContent } from "../requests";
import { basePath } from "../../constants";
const public_path = `${basePath}files/mp3/`;

export function UseMediaHelper(foldername='') {
    console.log(' use media helper')
    const [reload, setReload] = useState(false);
    const [content, setContent] = useState(null);
    const [song, setSong] = useState(null);
    const [playing, setPlaying] = useState(false);
    const initialLoad = useRef(true);
    const audioRef = useRef()
    const data = useRef()

    const getFiles = useCallback(async () =>  {
        const result = await apiGetContent(foldername)
        setContent(result)
    }, [foldername]);
    
    const testReload = (info) => {
        // getFiles();
        console.log('set reload here', {info, reload});
        setReload(info)
    }
    
    useEffect(() => {
        getFiles();
    }, [foldername, getFiles])

    useEffect(() => {
        if (reload) {
            console.log(' -- use effect, get files on reload')
            getFiles();
        } else {
            console.log(' -- use effect problem', reload)
        }
    }, [getFiles, reload])

    const changeTrack = (data) => {
        if (data.current) {
            const {youtubeId, content} = data.current;
            const { files } = content.content;
            const songIndex = files.findIndex(f => f.youtubeId === youtubeId)
            if (songIndex > -1) {
                const nextIndex = songIndex + 1 <= files.length ? songIndex + 1 : 0;
                const {youtubeId, details, name} = files[nextIndex];
                const mp3 = `${public_path}${name}.mp3`;
                const img = `${public_path}${name}.webp`;
                const {title} = JSON.parse(details);
                data.current = { youtubeId, content }
                setSong({mp3, img, title, details, youtubeId})
            }
        } else {
            console.log('no song found')
        }
    }

    const addSong = (name, title, details, youtubeId) => {
        const mp3 = `${name}.mp3`;
        const img = `${name}.webp`;
        if (song && mp3 === song.mp3) {
            if (audioRef.current.paused) {
                console.log('set play')
                setPlaying(true);
                audioRef.current.play();
            } else {
                setPlaying(false);
                audioRef.current.pause();
            }
        } else {
            data.current = { youtubeId, content }
            setSong({mp3, img, title, details, youtubeId});
        }
        setTimeout(() => {
            audioRef.current.onended = () => changeTrack(data)
        }, 510)
    }

    useEffect(() => {
        if (audioRef.current) {
            setTimeout(() => {
                audioRef.current.pause();
                audioRef.current.load();
                audioRef.current.play();
            }, 200)
        }
    }, [song])

    console.log('--hook reload', reload);
    return {
        addSong,
        content,
        song,
        playing,
        reload,
        setReload: testReload,
        audioRef
    }
}

export function UseServerPushData(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (window) {
            const source = new EventSource(url)
            //if (typeof eventSource?.onmessage === 'function') {
            source.addEventListener('open', () => {
                console.log('SSE opened!');
            });

            source.addEventListener('message', (e) => {
                const data = JSON.parse(e.data);
                setData(data);
            });

            source.addEventListener('error', (e) => {
                console.error('Error: ',  e);
            });

            return () => {
                source.close();
            };
        }
    }, [url])

    return {data};
}

export const UseModalHelper = () => {
    const [showModal, toggleShowModal] = useState(false);
    const [youtubeId, setYoutubeId] = useState(null);
    const setShow = (id) => {
        if (!id) {
            toggleShowModal(false);
        }
        toggleShowModal(prev=>{
            const sameId = id === youtubeId
            if(!sameId) {
                setYoutubeId(id);
            }
            return !youtubeId || sameId ? !prev : prev;
        })
    }
    return {
        showModal,
        toggleShowModal:setShow,
        youtubeId,
    }
}
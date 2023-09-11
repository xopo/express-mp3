import { memo, useEffect, useState } from 'react'
import DownloadForm from './components/DownloadForm';
import {UseModalHelper} from './hooks/customHooks';
import Player, { PlayerType } from './components/player/Player';
import MediaPlayer from './components/mediaplayer/MediaPlayer';
import MoveToFolder from './components/MoveToFolder';
import './App.scss'

type HomeSongType = {
    song: PlayerType;
    audioRef: any;
}
function Home() {
  const [showDownload, setShowDownload] = useState(false);
  const [song, setSong] = useState<HomeSongType>();
  const [reload, setReload] = useState(false);
  const {
      showModal,
      toggleShowModal,
      youtubeId
  } = UseModalHelper();
  const folder = 'All media';
  
  return (
    <div>
      {/* <Head>
          <title>Mp3 Player</title>
          <meta name="description" content="Download and consume locally" />
          <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main>
          <header>
            { showDownload && <DownloadForm onComplete={setReload} setVisible={setShowDownload} />}
            <h3 className='clickable'>{folder} 📁</h3>
            {song && <Player {...{...song}} />}
          </header>
          <MediaPlayer {...{toggleShowModal, setSong, reload}}/>
      </main>
      <footer>
          <div className={`modal${showModal?'':' hidden'}`}>
              <div className='backtick' onClick={() => toggleShowModal(false)}/>
              {youtubeId && <MoveToFolder id={youtubeId} />}
          </div>
          {!showDownload && <div className="maximize" onClick={() => setShowDownload(true)}>➕</div>}
      </footer>
    </div>
  )
}

export default memo(Home)
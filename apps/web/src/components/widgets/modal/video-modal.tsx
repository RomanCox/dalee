import { lazy, Suspense } from "react";

import Modal from "./modal";
import Icon from "@/components/ui/icon";
import PlayBtn from "@/components/ui/play-btn/play-btn";

import styles from "./video-modal.module.scss";

// react-player@3 больше не публикует отдельный "/lazy" бандл — кодсплиттинг
// делаем сами через React.lazy на корневом модуле.
const ReactPlayer = lazy(() => import("react-player"));

interface VideoModalProps {
    opened: boolean;
    close: () => void;
    url: string;
}

const VideoModal = ({opened, close, url}: VideoModalProps) => {

    return (
        <Modal
            isOpen={opened}
            onClose={close}
            contentClassName={styles.modalContent}
            withoutCloseButton
        >
            <div className={styles.container}>
                <button className={styles.close_btn} onClick={close}>
                    <Icon name="cross" width="32" height="32"/>
                </button>
                <Suspense fallback={null}>
                    <ReactPlayer
                        playing={opened}
                        style={{
                            borderRadius: "2rem",
                            overflow: "hidden",
                        }}
                        width={"100%"}
                        height={"100%"}
                        light
                        src={url}
                        controls
                        volume={0.3}
                        playIcon={<PlayBtn className={styles.play_btn} onClick={() => {}}/>}
                    />
                </Suspense>
            </div>
        </Modal>
    );
};

export default VideoModal;

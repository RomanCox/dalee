"use client";

import dynamic from "next/dynamic";

import Modal from "./modal";
import Icon from "@/components/ui/icon";
import PlayBtn from "@/components/ui/play-btn/play-btn";

import styles from "./video-modal.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {ssr: false});

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
                <ReactPlayer
                    playing={opened}
                    style={{
                        borderRadius: "2rem",
                        overflow: "hidden",
                    }}
                    width={"100%"}
                    height={"100%"}
                    light
                    config={{
                        youtube: {
                            playerVars: {showinfo: 0, controls: 2, rel: 0},
                        },
                    }}
                    url={url}
                    controls
                    volume={0.3}
                    playIcon={<PlayBtn className={styles.play_btn} onClick={() => {}}/>}
                />
            </div>
        </Modal>
    );
};

export default VideoModal;

import {
  OPEN_PLAYER,
  CLOSE_PLAYER,
  SET_AUDIO,
  PLAY_AUDIO,
  PAUSE_AUDIO,
  RESET_AUDIO,
  RESET_MUSIC_PLAYER,
  SET_KIT_PLAYING
} from "./types";
import { AUDIO_API } from "../utils/misc";

export const setAudio = track => {
  let request = `${AUDIO_API}/stream/${track}`;
  return {
    type: SET_AUDIO,
    payload: request
  };
};

export const playAudio = () => {
  return {
    type: PLAY_AUDIO
  };
};

export const pauseAudio = () => {
  return {
    type: PAUSE_AUDIO
  };
};

export const setKitPlaying = kit => {
  return {
    type: SET_KIT_PLAYING,
    payload: kit
  };
};

export const resetAudio = () => {
  return {
    type: RESET_AUDIO
  };
};

export const openMusicPlayer = () => {
  return {
    type: OPEN_PLAYER
  };
};

export const closeMusicPlayer = () => {
  return {
    type: CLOSE_PLAYER
  };
};

export const resetMusicPlayer = () => {
  return {
    type: RESET_MUSIC_PLAYER
  }
}

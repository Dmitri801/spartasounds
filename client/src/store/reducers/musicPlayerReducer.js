import {
  OPEN_PLAYER,
  CLOSE_PLAYER,
  SET_AUDIO,
  PLAY_AUDIO,
  PAUSE_AUDIO,
  RESET_AUDIO,
  RESET_MUSIC_PLAYER,
  SET_KIT_PLAYING
} from "../actions/types";

const initialState = {
  playerOpen: false,
  audio: null,
  playing: false,
  kitPlaying: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUDIO:
      return {
        ...state,
        audio: new Audio(action.payload)
      };
    case PLAY_AUDIO:
      return {
        ...state,
        playing: true
      };
    case SET_KIT_PLAYING:
      return {
        ...state,
        kitPlaying: action.payload
      };
    case PAUSE_AUDIO:
      return {
        ...state,
        playing: false
      };
    case RESET_AUDIO:
      return {
        ...state,
        audio: new Audio()
      };
    case OPEN_PLAYER:
      return {
        ...state,
        playerOpen: true
      };
    case CLOSE_PLAYER:
      return {
        ...state,
        playerOpen: false
      };
    case RESET_MUSIC_PLAYER: 
     return {
      playerOpen: false,
      audio: null,
      playing: false,
      kitPlaying: ""
     }
    default:
      return state;
  }
}

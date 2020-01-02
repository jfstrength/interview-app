import video_ss from '../videos/Sunset_Video.mp4';
import video_rp from '../videos/ryan-pitts.mp4';

// Map which routes file paths into video names
// used by IPCrenderer

let reverseMap = new Map();

reverseMap.set(video_ss,"Sunset Video");
reverseMap.set(video_rp,"Ryan Pitts Interview");

export default reverseMap;
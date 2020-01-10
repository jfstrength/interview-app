import video_ss from "./Sunset_Video.mp4";
import video_rp from "./ryan-pitts.mp4";
import countdown from "./Countdown 5 Seconds HD.mp4";


// Map which routes file paths into video names
// used by IPCrenderer

let reverseMap = new Map();

reverseMap.set(video_ss,"Sunset video");
reverseMap.set(video_rp,"Ryan Pitts interview");
reverseMap.set(countdown,"countdown");

export default reverseMap;
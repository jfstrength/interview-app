import video_ss from "./Sunset_Video.mp4";
import video_rp from "./ryan-pitts.mp4";
import countdown from "./Countdown 5 Seconds HD.mp4";

// Map which routes string commands into file paths
// used by IPCrenderer

let vidMap = new Map();

vidMap.set("video_ss",video_ss);
vidMap.set("video_rp",video_rp);
vidMap.set("countdown",countdown);

export default vidMap;
import video_ss from "../videos/Sunset_Video.mp4";
import video_rp from "../videos/ryan-pitts.mp4";

// Map which routes string commands into file paths
// used by IPCrenderer

let vidMap = new Map();

vidMap.set("video_ss",video_ss);
vidMap.set("video_rp",video_rp);

export default vidMap;
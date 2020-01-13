import Sunset_Interview from "./Sunset_Video.mp4";
import Ryan_Pitts_Interview from "./ryan-pitts.mp4";
import countdown from "./Countdown 5 Seconds HD.mp4";

// Map which routes string commands into file paths
// used by IPCrenderer

let vidMap = new Map();

vidMap.set("Sunset Interview",Sunset_Interview);
vidMap.set("Ryan Pitts Interview",Ryan_Pitts_Interview);
vidMap.set("Countdown",countdown);

export default vidMap;
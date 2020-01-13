import Sunset_Interview from "./Sunset_Video.mp4";
import Ryan_Pitts_Interview from "./ryan-pitts.mp4";
import countdown from "./Countdown 5 Seconds HD.mp4";


// Map which routes file paths into video names
// used by IPCrenderer

let reverseMap = new Map();

reverseMap.set(Sunset_Interview,"Sunset Interview");
reverseMap.set(Ryan_Pitts_Interview,"Ryan Pitts Interview");
reverseMap.set(countdown,"Countdown");

export default reverseMap;
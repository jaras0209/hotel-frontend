import AdditionalCharges from "./AdditionalCharges.vue";
import HousingManagement from "./HousingManagement.vue";
import RoomAssignment from "./RoomAssignment.vue";
import RoomInfo from "./RoomInfo.vue";
import RoomManagement from "./RoomManagement.vue";
import Minibar from "./Minibar.vue";
import Executive from "./Executive.vue";
import Standard from "./Standard.vue";
import Deluxe from "./Deluxe.vue";



export default [
    {name: "additionalCharges-link", path: "/room/additionalCharges", component: AdditionalCharges},
    {name: "housingManagement-link", path: "/room/housingManagement", component: HousingManagement},
    {name: "roomAssignment-link", path: "/room/roomAssignment", component: RoomAssignment},
    {name: "roomInfo-link", path: "/room/roomInfo", component: RoomInfo},
    {name: "roomManagement-link", path: "/room/roomManagement", component: RoomManagement},
    {name: "minibar-link", path: "/room/minibar", component: Minibar},
    {name: "executive-link", path: "/room/executive", component: Executive},
    {name: "standard-link", path: "/room/standard", component: Standard},
    {name: "deluxe-link", path: "/room/deluxe", component: Deluxe},
]
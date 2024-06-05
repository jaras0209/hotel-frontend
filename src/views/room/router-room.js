import AdditionalCharges from "./back/Additional.vue";
import BackIndex from "./back/BackIndex.vue";
import CheckOut from "./back/CheckOut.vue";
import HousingManagement from "./back/HousingManagement.vue";
import RoomAssignment from "./back/RoomAssignment.vue";
import RoomInfo from "./back/RoomInfo.vue";
import RoomManagement from "./back/RoomManagement.vue";

import Booking from "./front/Booking.vue";
import CheckAvailability from "./front/CheckAvailability.vue";
import FrontIndex from "./front/FrontIndex.vue";
import LevelDeluxe from "./front/LevelDeluxe.vue";
import LevelExecutive from "./front/LevelExecutive.vue";
import LevelStandard from "./front/LevelStandard.vue";
import Minibar from "./front/Minibar.vue";
import RoomView from "./front/RoomView.vue";
import Reviews from "./front/Reviews.vue";


export default [
    {name: "additionalCharges-link", path: "/room/back/additionalCharges", component: AdditionalCharges,meta: { requiresAuth: true , roles:['Housekeeping', 'GeneralManger']} },
    {name: "backIndex-link", path: "/room/back/backIndex", component: BackIndex},
    {name: "checkOut-link", path: "/room/back/checkOut", component: CheckOut,meta: { requiresAuth: true , roles:['Housekeeping', 'GeneralManger']} },
    {name: "housingManagement-link", path: "/room/back/housingManagement", component: HousingManagement,meta: { requiresAuth: true , roles:['Housekeeping', 'GeneralManger']} },
    {name: "roomAssignment-link", path: "/room/back/roomAssignment", component: RoomAssignment,meta: { requiresAuth: true , roles:['Housekeeping', 'GeneralManger']} },
    {name: "roomInfo-link", path: "/room/back/roomInfo", component: RoomInfo,meta: { requiresAuth: true , roles:['GeneralManger']} },
    {name: "roomManagement-link", path: "/room/back/roomManagement", component: RoomManagement,meta: { requiresAuth: true , roles:['Housekeeping', 'GeneralManger']} },

    {name: "booking-link", path: "/room/front/booking", component:Booking},
    {name: "checkAvailability-link", path: "/room/front/checkAvailability", component:CheckAvailability},
    {name: "frontIndex-link", path: "/room/front/frontIndex", component: FrontIndex},
    {name: "levelDeluxe-link", path: "/room/front/deluxe", component: LevelDeluxe},
    {name: "LevelExecutive-link", path: "/room/front/executive", component: LevelExecutive},
    {name: "LevelStandard-link", path: "/room/front/standard", component: LevelStandard},
    {name: "minibar-link", path: "/room/front/minibar", component: Minibar},
    {name: "roomView-link", path: "/room/front/roomView", component: RoomView},
    {name: "reviews-link", path: "/room/front/reviews", component: Reviews},
]
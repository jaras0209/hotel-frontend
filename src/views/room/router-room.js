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
import Reviews from "./front/Reviews.vue";

import Room from "./Room.vue";
import RoomView from "./front/RoomView.vue";
import Calendar from "./result.vue";



export default [
    {name: "additionalCharges-link", path: "/room/back/additionalCharges", component: AdditionalCharges},
    {name: "backIndex-link", path: "/room/back/backIndex", component: BackIndex},
    {name: "checkOut-link", path: "/room/back/checkOut", component: CheckOut},
    {name: "housingManagement-link", path: "/room/back/housingManagement", component: HousingManagement},
    {name: "roomAssignment-link", path: "/room/back/roomAssignment", component: RoomAssignment},
    {name: "roomInfo-link", path: "/room/back/roomInfo", component: RoomInfo},
    {name: "roomManagement-link", path: "/room/back/roomManagement", component: RoomManagement},

    {name: "booking-link", path: "/room/front/booking", component:Booking},
    {name: "checkAvailability-link", path: "/room/front/checkAvailability", component:CheckAvailability},
    {name: "frontIndex-link", path: "/room/front/frontIndex", component: FrontIndex},
    {name: "levelDeluxe-link", path: "/room/front/deluxe", component: LevelDeluxe},
    {name: "LevelExecutive-link", path: "/room/front/executive", component: LevelExecutive},
    {name: "LevelStandard-link", path: "/room/front/standard", component: LevelStandard},
    {name: "minibar-link", path: "/room/front/minibar", component: Minibar},
    {name: "reviews-link", path: "/room/front/reviews", component: Reviews},
    {name: "roomView-link", path: "/room/front/roomView", component: RoomView},

    {name: "room-link", path: "/room", component:Room},
    {name: "calendar-link", path: "/room/calendar", component:Calendar},
]
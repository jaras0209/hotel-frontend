import AdditionalCharges from "./AdditionalCharges.vue";
import HousingManagement from "./HousingManagement.vue";
import RoomAssignment from "./RoomAssignment.vue";
import RoomInfo from "./RoomInfo.vue";
import RoomManagement from "./RoomManagement.vue";
import Minibar from "./Minibar.vue";
import Executive from "./Executive.vue";
import Standard from "./Standard.vue";
import Deluxe from "./Deluxe.vue";
import Room from "./Room.vue";
import RoomAssBackend from "./RoomAssBackend.vue";
import Booking from "./Booking.vue";Calendar.vue
import Calendar from "./Calendar.vue";
i


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
    {name: "room-link", path: "/room", component:Room},
    {name: "booking-link", path: "/room/booking", component:Booking},
    {name: "calendar-link", path: "/room/calendar", component:Calendar},
    {name: "roomAssBackend-link", path: "/room/roomAssBackend", component:RoomAssBackend}
]
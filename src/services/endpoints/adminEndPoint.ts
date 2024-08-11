import { resolveProjectReferencePath } from "typescript"

const adminRoutes = {
    adminlogin:'/admin/adminLogin',
    bringUsers:'/admin/findUsers',
    blockUser:'/admin/blockUser',
    unblockUser:'/admin/unblockUser',
    bringVendors:'/admin/bringVendors',
    blockvendor:'/admin/blockVendor',
    unblockvendor:'admin/unblockVendor',
    bringRequests:'/admin/bringRequests',
    acceptRequest:'/admin/acceptRequest',
    rejectRequest:'/admin/rejectRequest',
    getMonthlyBooking:'/admin/monthlyBooking',
    getUsersVendors:'/admin/getusersvendors',
    getYearlyBooking:'/admin/yearlyBooking',
    getWeeklyBooking:'/admin/weeklybooking',
}

export default adminRoutes
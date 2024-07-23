const userRoutes = {
    userSignup : '/user/verifyMail',
    verifyOtp:'/user/verifyOtp',
    Login:'/user/login',
    Logout:'/user/logout',
    profileSubmit:'/user/profileSubmit',
    resendOtp:'/user/resendOtp',
    forgotPassword:'/user/sendForgotMail',
    verifyForgotOtp:'/user/verifyForgotOtp',
    changepassword:'/user/changePassword',
    getAllVendors:'/user/getAllVendors',
    bringVendorDetail:'/user/bringVendorDetial',
    stripePayment :'/user/stripe-payment',
    sendbookingrequest:'/user/sendBookingRequest',
    checkIsBookingAccepted:'/user/isBookingAccepted',
    checkIsBookingExisting:'/user/isBookingExisting',
    fetchBookingDetials:'/user/fetchBookingDetials',
    fetchBookingRequests:'/user/fetchBookingRequests',
    cancelBooking:'/user/cancelBooking',
    bringPhotos:'/user/bringPhotos',
    bringVideos:'/user/bringVideos'
}

export default userRoutes 
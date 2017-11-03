export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

export const notifySignIn = user => ({type: USER_SIGNED_IN, user})
export const notifySignOut = () => ({type: USER_SIGNED_OUT})

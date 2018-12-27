export const getId = (pathname) => {
    if(typeof pathname !== 'undefined')
    return pathname.substring((pathname.lastIndexOf('/') + 1))
}
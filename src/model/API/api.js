import service from './request'

export const getAddressData = data => {
    return service({
        baseURL: 'https://cors-anywhere.herokuapp.com/https://www.post.gov.tw/post/streetNameData',
        method: 'post',
        data
    })
};
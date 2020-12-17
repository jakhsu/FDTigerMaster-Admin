import service from './request'
import fetchRequest from './fetch'

export const getAddressData = data => {
    return service({
        baseURL: 'https://cors-anywhere.herokuapp.com/https://www.post.gov.tw/post/streetNameData',
        method: 'post',
        data
    })
};

export const fetchAddressData = data => {
    return fetchRequest({
        url: '',
        method: 'POST',
        data
    })
}
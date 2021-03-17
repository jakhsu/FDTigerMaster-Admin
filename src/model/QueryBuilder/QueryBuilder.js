import tigermaster from 'fdtigermaster-admin-sdk'
import {
    camel2Snake
} from '@/model/CaseConverter/CaseConverter.js'

export function userQueryBuilder(searchObj) {
    let query = tigermaster.database.query("user");
    let searchArray = Object.entries(searchObj);
    searchArray.forEach(e => {
        if (e[0] === 'createDate_start') {
            query.where(`user.create_date`, '>', searchObj[e[0]])
        } else if (e[0] === 'createDate_end') {
            query.where(`user.create_date`, '<', searchObj[e[0]])
        } else {
            e[2] = 'LIKE'
            e[1] = '%' + e[1] + '%'
            e[0] = camel2Snake(e[0])
            query.where(`user.${e[0]}`, e[2], e[1])
        }
    });
    return query
}
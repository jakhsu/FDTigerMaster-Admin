import ActiveStatusMap from '@/config/ActiveStatus.json'
var activeStatusMap = undefined;

export default () => {
    if (activeStatusMap !== undefined) {
        return activeStatusMap;
    } else {
        activeStatusMap = {};
        for (const order of ActiveStatusMap) {
            activeStatusMap[order.value] = order.text;
        }
        return activeStatusMap;
    }
}
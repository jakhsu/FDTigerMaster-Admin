import OrderStatusMap from '@/config/OrderStatus.json'

var orderStatusMap = undefined;

export default () => {
    if(orderStatusMap !== undefined){
        return orderStatusMap;
    }else{
        orderStatusMap = {};
        for(const order of OrderStatusMap){
            orderStatusMap[order.value] = order.text;
        }
        return orderStatusMap;
    }
}
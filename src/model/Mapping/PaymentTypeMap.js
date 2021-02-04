import PaymentTypeMap from '@/config/PaymentType.json'

let paymentTypeMap = undefined;

export default () => {
    if (paymentTypeMap !== undefined) {
        return paymentTypeMap;
    } else {
        paymentTypeMap = {};
        for (const type of PaymentTypeMap) {
            paymentTypeMap[type.value] = type.text;
        }
        return paymentTypeMap;
    }
}
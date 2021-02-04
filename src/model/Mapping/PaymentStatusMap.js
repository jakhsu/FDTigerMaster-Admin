import PaymentStatusMap from '@/config/PaymentStatus.json'

let paymentStatusMap = undefined;

export default () => {
    if (paymentStatusMap !== undefined) {
        return paymentStatusMap;
    } else {
        paymentStatusMap = {};
        for (const Status of PaymentStatusMap) {
            paymentStatusMap[Status.value] = Status.text;
        }
        return paymentStatusMap;
    }
}
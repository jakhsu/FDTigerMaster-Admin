import OrderStatusMap from '@/model/Mapping/OrderStatusMap.js'

const orderStatusMap = OrderStatusMap();

describe('test order status mapping', () => {
    it('5 => 訂單建立', () => {
        expect(orderStatusMap[5]).toBe("訂單建立")
    })
    it('10 => 媒合中', () => {
        expect(orderStatusMap[10]).toBe("媒合中")
    })
    it('15 => 已媒合', () => {
        expect(orderStatusMap[15]).toBe("已媒合")
    })
    it('20 => 等待支付派遣費', () => {
        expect(orderStatusMap[20]).toBe("等待支付派遣費")
    })
    it('25 => 等待前往現場查看', () => {
        expect(orderStatusMap[25]).toBe("等待前往現場查看")
    })
    it('30 => 等待送出報價單', () => {
        expect(orderStatusMap[30]).toBe("等待送出報價單")
    })
    it('35 => 等待客戶確認報價單', () => {
        expect(orderStatusMap[35]).toBe("等待客戶確認報價單")
    })
    it('40 => 等待完工', () => {
        expect(orderStatusMap[40]).toBe("等待完工")
    })
    it('45 => 等待上傳施工照片', () => {
        expect(orderStatusMap[45]).toBe("等待上傳施工照片")
    })
    it('50 => 等待驗收', () => {
        expect(orderStatusMap[50]).toBe("等待驗收")
    })
    it('55 => 等待支付尾款', () => {
        expect(orderStatusMap[55]).toBe("等待支付尾款")
    })
    it('60 => 保固中', () => {
        expect(orderStatusMap[60]).toBe("保固中")
    })
    it('90 => 出保', () => {
        expect(orderStatusMap[90]).toBe("出保")
    })
    it('95 => 訂單終止', () => {
        expect(orderStatusMap[95]).toBe("訂單終止")
    })
    it('100 => 訂單結束', () => {
        expect(orderStatusMap[100]).toBe("訂單結束")
    })
})
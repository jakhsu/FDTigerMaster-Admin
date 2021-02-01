import {
    fetchRoadName
} from '@/model/FetchAddress/fetchRoadName.js'
import {
    assert,
    // expect
} from "chai";

describe("測試路名fetch function", () => {
    test('臺北市內湖區的街道應為array', async () => {
        try {
            const response = await fetchRoadName("臺北市", "內湖區")
            assert(Array.isArray(response))
        } catch (e) {
            console.log(e)
        }
    }, 1000);
})
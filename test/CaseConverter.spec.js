import * as converter from '@/model/CaseConverter/CaseConverter.js'

describe("test camel 2 snake", () => {
    it("exampleCamelCase => example_camel_case", () => {
        expect(converter.camel2Snake("exampleCamelCase")).toBe("example_camel_case")
    })
})
import PrivilegeTable from "@/config/PrivilegeTable.json"
let privilegeTableMap = undefined

export default () => {
    if (privilegeTableMap !== undefined) {
        return privilegeTableMap
    } else {
        privilegeTableMap = {}
        for (const privilege of PrivilegeTable) {
            privilegeTableMap[privilege.value] = privilege.text
        }
        return privilegeTableMap
    }
}
import UserRole from '@/config/UserRole.json'

var roleIdMap = undefined;

export default () => {
    if(roleIdMap !== undefined){
        return roleIdMap;
    }else{
        roleIdMap = {};
        for(const role of UserRole){
            roleIdMap[role.value] = role.text;
        }
        return roleIdMap;
    }
}
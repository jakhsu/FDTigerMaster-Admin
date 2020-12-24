import tigermaster from 'fdtigermaster-sdk'

export async function queryAllSkills() {
    try {
        const query = tigermaster.database.query("skill_item").limit(0, 100);
        const response = await query.get();
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function queryAllCategories() {
    try {
        const query = tigermaster.database.query("working_category").limit(0, 100);
        const response = await query.get();
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function querySomeSkills(queryArray) {
    try {
        queryArray = queryArray || [''];
        const query = tigermaster.database.query("skill_item").limit(0, 100);
        query.where("skill_item.id", "IN", queryArray);
        const response = await query.get();
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function querySomeCategories(queryArray) {
    try {
        queryArray = queryArray || [''];
        const query = tigermaster.database.query("working_category").limit(0, 100);
        query.where("working_category.id", "IN", queryArray);
        const response = await query.get();
        return response;
    } catch (e) {
        console.log(e)
    }
}
export async function querySomeCategoriesBySkillId(queryArray) {
    try {
        queryArray = queryArray || [''];
        const query = tigermaster.database.query("working_category").limit(0, 100);
        query.where("working_category.skill_item_id", "IN", queryArray);
        const response = await query.get();
        return response;
    } catch (e) {
        console.log(e)
    }
}
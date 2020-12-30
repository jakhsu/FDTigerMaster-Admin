export default function (inputType, input) {
    const skillIdRegex = /^TM-[A-Z]{1}[0-9]{4}00$/;
    const categoryIdRegex = /^TM-[A-Z]{1}[0-9]{4}.+(?<!00)$/;
    switch (inputType) {
        case "skillId":
            return skillIdRegex.test(input);
        case "categoryId":
            return categoryIdRegex.test(input);
    }
}
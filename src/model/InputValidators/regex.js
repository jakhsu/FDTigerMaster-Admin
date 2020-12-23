export default function (inputType) {
    switch (inputType) {
        case "skillId":
            return new RegExp(/^TM-[A-Z]{1}[0-9]{4}00$/, 'i');
        case "categoryId":
            return new RegExp(/^TM-[A-Z]{1}[0-9]{4}.+(?<!00)$/, 'i');
    }
}
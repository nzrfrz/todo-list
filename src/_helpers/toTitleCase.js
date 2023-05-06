export const toTitleCase = (string) => {
    const tempFirst = string?.replace(/[-_:]/g, ' ');
    const temp = tempFirst?.split(" ");
    const titleCaseConverted = temp?.map((data) => {
        if (/[a-z]/.test(data.charAt(0)) === true) return data.charAt(0).toUpperCase() + data.substr(1);
        return data;
    });
    const finalResult = titleCaseConverted?.map((data) => {
        if (/(?:^|[^\w])(pt|Pt|pT|cv|Cv|cV)(?:[^\w]|$)/i.test(data) === true) return data.toUpperCase();
        return data;
    });
    
    return finalResult?.join(" ");
};
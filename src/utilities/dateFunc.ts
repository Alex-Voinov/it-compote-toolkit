const getYearDifference = (date1: Date, date2: Date) => {
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();

    // Проверяем, наступила ли дата в этом году
    const isBeforeDate1 = 
        date1.getMonth() > date2.getMonth() || 
        (date1.getMonth() === date2.getMonth() && date1.getDate() > date2.getDate());

    const difference = year2 - year1;

    return isBeforeDate1 ? difference - 1 : difference;
}

export default getYearDifference;
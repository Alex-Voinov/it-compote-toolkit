interface ISuitableGroup {
    groupId: number;
    lastTheme: string;
    overAge: number;
    startTime?: string;
    weekday?: string[];
    weekdaysName?: string[];
}

export default ISuitableGroup;
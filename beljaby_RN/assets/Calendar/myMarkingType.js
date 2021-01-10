import { calendarColor } from '../colors'

const today = '2020-12-16'
const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };

export const multiDotsData = {
    [today]: { dots: [workout], selected: true, selectedColor: calendarColor },
    '2020-12-17': { dots: [vacation] },
    '2020-12-18': { dots: [massage, workout], activeOpacity: 0 },
    '2020-12-19': { disabled: true, disableTouchEvent: true },
    '2020-12-22': { dots: [vacation, massage, workout], disabled: true },
}
// markedDatesTest[today] = { selected: true, marked: true, selectedColor: 'red' }

export const multiPeriodData= {
    '2020-12-14': {
        periods: [
            { startingDay: true, endingDay: false, color: '#5f9ea0' },
            { startingDay: true, endingDay: false, color: '#ffa500' },
            { startingDay: true, endingDay: false, color: '#f0e68c' }
        ],
    },
    '2020-12-15': {
        periods: [
            { color: 'transparent' },
            { startingDay: false, endingDay: true, color: '#ffa500' },
            { startingDay: false, endingDay: false, color: '#f0e68c' }
        ]
    },
    '2020-12-20': {
        periods: [
            { startingDay: false, endingDay: true, color: '#5f9ea0' },
            { color: 'transparent' },
            { startingDay: false, endingDay: true, color: '#5f9ea0' },
        ]
    },
}

export const periodData = {
    '2020-12-20': { textColor: 'green' },
    '2020-12-22': { marked: true, startingDay: true, color: 'green' },
    '2020-12-23': { color: 'green', endingDay: true, textColor: 'gray' },
    '2020-12-24': { color: 'green', textColor: 'gray' },
    '2020-12-25': { color: 'green', endingDay: true, textColor: 'gray' },
    '2020-12-26': { endingDay: true, color: 'green' },
    '2020-12-04': { disabled: true, startingDay: true, color: 'green', endingDay: true }
}
export const customType = {
    emptyCircle : {
        customStyles: {
            container: {
                borderColor: calendarColor,
                borderWidth: 2,
            }
        }
    },




    '2020-12-28': {
        customStyles: {
            container: {
                backgroundColor: calendarColor
            },
            text: {
                color: 'white',
            },
        }
    },
    '2020-12-18': {
        customStyles: {
            container: {
                borderColor: calendarColor,
                borderWidth: 2,
            }
        }
    },
    '2020-12-01': {
        customStyles: {
            container: {
                backgroundColor: 'white',
                elevation: 2
            },
            text: {
                color: 'red'
            }
        }
    },
    '2020-12-08': {
        selected: true
    },
    '2020-12-09': {
        customStyles: {
            container: {
                backgroundColor: 'red',
                elevation: 4
            },
            text: {
                color: 'white'
            }
        }
    },
    // '2020-12-14': {
    //     customStyles: {
    //         container: {
    //             backgroundColor: 'green'
    //         },
    //         text: {
    //             color: 'white'
    //         }
    //     }
    // },
    // '2020-12-15': {
    //     customStyles: {
    //         container: {
    //             backgroundColor: 'black',
    //             elevation: 2
    //         },
    //         text: {
    //             color: 'yellow'
    //         }
    //     }
    // },
    '2020-12-21': {
        disabled: true
    },
    '2020-12-30': {
        customStyles: {
            container: {
                backgroundColor: 'pink',
                elevation: 4,
                borderColor: 'purple',
                borderWidth: 5
            },
            text: {
                marginTop: 3,
                fontSize: 11,
                color: 'black'
            }
        }
    },
    '2020-12-31': {
        customStyles: {
            container: {
                backgroundColor: 'orange',
                borderRadius: 0
            }
        }
    }
}
import Calendar from 'react-calendar';
import { useEffect, useState } from "react";

import 'react-calendar/dist/Calendar.css';
import { formatDate } from 'react-calendar/dist/esm/shared/dateFormatter.js';
import AbstractList from '../../../app/dashboard/abstract/AbstractList';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomCalendar () {
    const [value, setValue] = useState<Value>(new Date());

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <div className='grid lg:grid-cols-[auto_1fr] mt-3 gap-3'>
            <Calendar
                // activeStartDate={new Date(2017, 0, 1)}   
                calendarType='iso8601'
                allowPartialRange
                onChange={setValue}
                defaultView={'month'}
                minDate={new Date()}
                onClickDay={(day) => alert(day)}
                value={value}
                />
            <div className='p-3 bg-white rounded'>
                <AbstractList actions={[]} change={()=>{}} crud='quote' param='' reload />
            </div>
        </div>
    )
}

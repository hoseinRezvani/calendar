import { jsxs } from "react/jsx-runtime";
import styles from "./Calendar.module.css"
import moment, { weekdays } from 'jalali-moment'
import { memo, useEffect, useState } from "react";

function Calendar(props) {
    const calendar = [];
    const rows = [];
    const dayObject = {
        0: "شنبه",
        1: "یکشنبه",
        2: "دوشنبه",
        3: "سه شنبه",
        4: "چهارشنبه",
        5: "پنجشنبه",
        6: "جمعه",
    };
    
    const dayArray = Object.values(dayObject);
    const today = moment().locale('fa');
    const [currentPage, setCurrentPage] = useState(props.selectedDay ? props.selectedDay?.locale("fa") : today);
    const [selectedDay, setSelectedDay] = useState(props.selectedDay ? props.selectedDay?.locale("fa") : null);
    const numberOfDays = currentPage.daysInMonth();
    const firstDayOfMonth = currentPage.clone().startOf("month");
    const lastDayOfMonth = currentPage.clone().endOf("month");
    const firstDayOfMonthWeekday = firstDayOfMonth.weekday();
    const lastDayOfMonthWeekday = lastDayOfMonth.weekday();    

    for (let i = 1; i <= firstDayOfMonthWeekday; i++) {
        calendar.unshift(firstDayOfMonth.clone().subtract(i, "jDay"));
    }

    for (let i = 0; i < numberOfDays; i++) {
        calendar.push(firstDayOfMonth.clone().add(i, "jDay"));
    }

    for (let i = 1; i <= 6 - lastDayOfMonthWeekday; i++) {
        calendar.push(lastDayOfMonth.clone().add(i, "jDay"));
    }

    const numberOfRows = Math.ceil(calendar.length / 7);

    for (let i = 0; i < numberOfRows; i++) {
        const startIndex = i * 7;
        const endIndex = startIndex + 7;
        const slice = calendar.slice(startIndex, endIndex);
        rows.push(slice);
    }

    const miladiFirstDay = firstDayOfMonth.locale("en");
    const miladiLastDay = lastDayOfMonth.locale("en");
    const miladiStartMonth = miladiFirstDay.format("MMMM");
    const miladiEndMonth = miladiLastDay.format("MMMM");
    const miladiStartYear = miladiFirstDay.format("YYYY");
    const miladiEndYear = miladiLastDay.format("YYYY");

    let currentMiladiTitle = "";
    if (miladiStartMonth == miladiEndMonth) {
        currentMiladiTitle = `${miladiStartMonth} ${miladiStartYear}`;
    } else {
        if (miladiStartYear == miladiEndYear) {
            currentMiladiTitle = `${miladiStartMonth} - ${miladiEndMonth} ${miladiStartYear}`;
        } else {
            currentMiladiTitle = `${miladiStartMonth} ${miladiStartYear} - ${miladiEndMonth} ${miladiEndYear}`;
        }
    }
    
    useEffect(() => {
        if (props.selectedDay) {
            setSelectedDay(props.selectedDay); 
            setCurrentPage(props.selectedDay);
        }
    }, [props.selectedDay])

    function handleNextMonth() {
        setCurrentPage(prev => {
            const nextMonth = prev.clone().add(1, "jmonth");
            return nextMonth;
        })
    }

    function handlePrevMonth() {
        setCurrentPage(prev => {
            const nextMonth = prev.clone().subtract(1, "jmonth");
            return nextMonth;
        })
    }

    function handleToday() {
        setCurrentPage(today)
    }

    function GetCellStyle(day) {
        const isToday = day.isSame(today, "jDay");
        const isCurrentMonth = day.isSame(currentPage, "jMonth");
        const isSelected = selectedDay ? selectedDay.isSame(day, "jDay") : false;
        let color = "black";
        if (day.weekday() == 6) {
            color = "red"
        } else if (isToday) {
            color = "blue";
        }
        return ({
            "color": color,
            "border": isToday ? "1px solid blue" : "none",
            "opacity": isCurrentMonth ? .7 : .3,
            "backgroundColor": isSelected ? "lightblue" : "white"
        })
    }

    function handleSelect(day) {
        setSelectedDay(day);
        if (props.onSelect) {
            props.onSelect(day);
        }
    }

    return (
        <>
            <div style={{ "width": "min-content" }} className="border shadow p-3 pb-4">
                <div className="d-flex justify-content-between">
                    <button className="btn text-nowrap" onClick={handleNextMonth} style={{ "fontSize": "14px" }}>{"<"} ماه بعد</button>
                    <div className="text-center">
                        <h2 className="text-primary">{currentPage.format("MMMM")}  {currentPage.jYear()}</h2>
                        <h5 className="text-nowrap" style={{ "fontFamily": "sans-serif", "fontSize": "1rem" }}>{currentMiladiTitle}</h5>
                    </div>
                    <button className="btn text-nowrap" onClick={handlePrevMonth} style={{ "fontSize": "14px" }}>ماه قبل {">"}</button>
                </div>
                <table className="mb-3" style={{ "direction": "rtl" }}>
                    <thead>
                        <tr className="">
                            {
                                dayArray.map((day, index) => {
                                    return <th className="text-center text-nowrap p-2" key={index}>{day}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((week, i) => {
                                return <tr key={i}>
                                    {
                                        week.map((day, j) => {
                                            return <td onClick={() => handleSelect(day)} style={GetCellStyle(day)} key={j}>{day.jDate()}</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>

                <div>
                    <button onClick={handleToday} className="btn btn-primary w-100 py-2">برو به امروز</button>
                </div>

            </div>
        </>
    )
}

export default memo(Calendar);
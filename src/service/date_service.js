import holidayKR from 'holiday-kr';

class DateService{

    constructor(date){
        this.currentDate = date ? new Date(date) : new Date();
    }
    getCurrentDate(){
        return `${this.currentDate.getFullYear()}.${this.currentDate.getMonth()+1}.${this.currentDate.getDate()}`
    }

    getAfterOneMonthDate(){
        const date = new Date(this.currentDate);
        const oneMonthLaterDate = new Date(date.setMonth(this.currentDate.getMonth() + 2));
        return `${oneMonthLaterDate.getFullYear()}.${oneMonthLaterDate.getMonth()}.${oneMonthLaterDate.getDate()}`
    }

    setDates(from,end,date,isActive,resultDates){
        for(var i = from; i<end; i++){
            let val = new Date(new Date(date.getFullYear(),date.getMonth(),date.getDate()+i));
            resultDates.push({
                id : val.getTime(),
                year : val.getFullYear(),
                month : val.getMonth()+1,
                date : val.getDate(),
                day : val.getDay(),
                fullDate : `${val.getFullYear()}-${val.getMonth()+1}-${val.getDate()}`,
                isActive : isActive,
                isHoliday : holidayKR.isSolarHoliday(val),
                isToday : isSameDate(this.currentDate,val)
            })
        }
    }
    getDatesFromToday(){
        const resultDates = [];

        //금주 일요일부터 금일 이전까지 요일 추가(회색 처리)
        const firstDate = new Date(new Date().setDate(this.currentDate.getDate()-this.currentDate.getDay()));
        this.setDates(0,this.currentDate.getDay(),firstDate,false,resultDates);
        
        //금일 부터 현재 달 마지막 날짜까지 추가
        const lastDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0);

        const currentRemainDateCount = lastDate.getDate() - this.currentDate.getDate() + 1;
        this.setDates(0,currentRemainDateCount,this.currentDate,true,resultDates);

        //다음달 날짜 추가
        const nextMonthFirstDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+1,1);
        const nextMonthRemainDateCount = 30-currentRemainDateCount+1;
        this.setDates(0,nextMonthRemainDateCount,nextMonthFirstDate,true,resultDates);

        //한달후의 날짜 이후의 날짜 추가
        const lastWeekDateCount = resultDates.length%7;
        const restDates = new Date(new Date(new Date().setDate(nextMonthFirstDate.getDate() + nextMonthRemainDateCount)));
        lastWeekDateCount > 0 && this.setDates(0,(7-lastWeekDateCount),restDates,false,resultDates);

        return resultDates.division(7);
    }

}
function isSameDate(date1, date2 ){
    return date1.getFullYear() === date2.getFullYear()
     && date1.getMonth() === date2.getMonth()
     && date1.getDate() === date2.getDate();
}
Array.prototype.division = function(n){
    var arr = this;
    var len = arr.length;
    var cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1: 0);
    var tmp = [];
    for(var i = 0 ; i<cnt;i++){
        tmp.push(arr.splice(0,n));
    }
    return tmp;
}
export default DateService;
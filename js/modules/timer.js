function timer() {

    const deadline = '2025-06-1'
    
    function calculationTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if (total <= 0) {
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;
        } else {   
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((total / 1000 / 60) % 60),
            seconds = Math.floor((total / 1000) % 60);
        }
            
        return {total, days, hours, minutes, seconds}
    }
    
    function checkZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        }else {
            return num
        }
    }
    
    function getValueTimer(selector , endtime) {

        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              cycle = setInterval(changeValue, 1000);

        
        changeValue()
        
        function changeValue() {
            const t = calculationTime(endtime);
            
            days.textContent = checkZero(t.days);
            hours.textContent = checkZero(t.hours);
            minutes.textContent = checkZero(t.minutes);
            seconds.textContent = checkZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(cycle);
            }
        }

    }
    
    getValueTimer('.timer', deadline);

}
module.exports = timer;
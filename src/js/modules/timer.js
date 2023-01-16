const timer = (deadline) => {
    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timeInterval = setInterval(() => appendTimes(deadline), 1000);

    function setZero(time) {
        if (time < 10) {
            time = `0${time}`;
        } 
        return time;
    }   

    function countDeadline(endtime) {
        const timeRemaining = (Date.parse(endtime) - Date.now()) / 1000;
       
        return  {
            'total': timeRemaining,
            'days': Math.floor(timeRemaining / 3600 / 24),
            'hours': Math.floor((timeRemaining / 3600) % 24), 
            'minutes': Math.floor((timeRemaining / 60) % 60), 
            'seconds': Math.floor(timeRemaining % 60)
        };
    }
    
    function appendTimes(endtime) {
        const t = countDeadline(endtime); 

        days.textContent = setZero(t.days);
        hours.textContent = setZero(t.hours);
        minutes.textContent = setZero(t.minutes);
        seconds.textContent = setZero(t.seconds);

        if (isNaN(t.total) || t.total <= 0) { 
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            clearTimeout(timeInterval);
            return;
        }
    }

    appendTimes(deadline);
};

export default timer;
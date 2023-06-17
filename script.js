document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.querySelector('.time');
    const buttonElement = document.querySelector('.button');
    let isDigitalClock = true;
  
    buttonElement.addEventListener('click', function() {
      isDigitalClock = !isDigitalClock;
      updateClock();
    });
  
    function updateClock() {
      const now = new Date();
  
      if (isDigitalClock) {
        const timeString = now.toLocaleTimeString('pt-BR', { hour12: false });
        timeElement.textContent = timeString;
        timeElement.classList.add('digital-clock');
        timeElement.classList.remove('analog-clock');
      } else {
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
  
        const hourRotation = (hour * 30) + (minute * 0.5);
        const minuteRotation = (minute * 6) + (second * 0.1);
        const secondRotation = second * 6;
  
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
  
        hourHand.style.transform = `rotate(${hourRotation}deg)`;
        minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
        secondHand.style.transform = `rotate(${secondRotation}deg)`;
  
        timeElement.classList.add('analog-clock');
        timeElement.classList.remove('digital-clock');
      }
    }
  
    setInterval(updateClock, 1000);
  });
  
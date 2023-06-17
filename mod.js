// Função para obter a hora atual
function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Função para obter a data atual
  function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;
  }
  
  // Função para obter informações climáticas
  async function getWeather() {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Brasilia`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const humidity = data.current.humidity;
  
      return {
        temperature,
        description,
        humidity
      };
    } catch (error) {
      console.error('Erro ao obter informações climáticas:', error);
      return null;
    }
  }
  
  // Função para atualizar o relógio
  function updateClock() {
    const timeElement = document.querySelector('.time');
    const dateElement = document.querySelector('.date');
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.humidity');
    const showDateCheckbox = document.querySelector('.show-date');
    const timezoneSelect = document.querySelector('.timezone');
    const button = document.querySelector('.button');
  
    const currentTimezone = timezoneSelect.value;
    const showDate = showDateCheckbox.checked;
  
    setInterval(() => {
      const time = getTime();
  
      timeElement.textContent = time;
  
      if (showDate) {
        const date = getDate();
        dateElement.textContent = date;
        dateElement.style.display = 'block';
      } else {
        dateElement.style.display = 'none';
      }
    }, 1000);
  
    button.addEventListener('click', () => {
      const clock = document.querySelector('.clock');
      const analogClock = document.querySelector('.analog-clock');
  
      clock.classList.toggle('digital-clock');
      analogClock.classList.toggle('analog-clock');
    });
  
    async function updateWeather() {
      const weatherData = await getWeather();
  
      if (weatherData) {
        const { temperature, description, humidity } = weatherData;
  
        temperatureElement.textContent = `Temperatura: ${temperature}°C`;
        descriptionElement.textContent = `Condição: ${description}`;
        humidityElement.textContent = `Umidade: ${humidity}%`;
      }
    }
  
    setInterval(updateWeather, 60000); // Atualiza as informações climáticas a cada minuto
    updateWeather();
  
    // Atualiza o relógio com base no fuso horário selecionado
    function updateTimezone() {
      const timeElements = document.querySelectorAll('.time');
      const timezone = timezoneSelect.value;
  
      timeElements.forEach((element) => {
        element.textContent = new Date().toLocaleTimeString('pt-BR', {
          timeZone: timezone,
          hour12: false
        });
      });
    }
  
    timezoneSelect.addEventListener('change', updateTimezone);
    updateTimezone();
  }
  
  updateClock();
  
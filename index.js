import playList from './playList.js';
console.log(playList);


const greetingTranslation = {
  'ua':[['Доброго ранку,', 'Добрий день,', 'Добрий вечір,', 'Добраніч,' ],'м/секунду', 'вологість', 'uk-UA', 'Мова', 'введіть ім\'я', 'Cписок задач', 'Введіть задачу', 'Додати' ],
  'en':[['Good morning,', 'Good afternoon,', 'Good evening,', 'Good nigth,' ],'meters/sec', 'humidity', 'en-GB', 'Language', 'enter name', 'ToDo list', 'Enter task', 'Add'],
  'ru':[['Доброе утро,', 'Добрый день,', 'Добрый вечер,', 'Доброй ночи,' ], 'м/секунду', 'влажность', 'ru-RU', 'Язык', 'введите язык', 'Список задач', 'Внесите задачу', 'Добавить']
}


//language settings
const langBlock= document.querySelector('.language_options')
const langOptions = document.querySelectorAll('.language_options label');
const inputs=document.querySelectorAll('.language_options input');
console.log(inputs)

let lang =`en`;

inputs.forEach( input=>
    input.addEventListener('click',function(){
      
      localStorage.setItem('langLocal',`${input.value}`)
      
      location.reload()
      
    })  
)
    
lang = localStorage.getItem('langLocal')

console.log(lang)

inputs.forEach(input=> {
  
    if(input.value==lang){
      console.log(input.value)
      input.checked=true;
    }
  } 
)
  
//


// Task 1. Time and date

const time = document.querySelector('.time');
const dateHTML = document.querySelector('.date');
const greetingField= document.querySelector('.greeting')
const bodyTag=document.querySelector('body');
const prev=document.querySelector('.slide-prev')
const next = document.querySelector('.slide-next')

function showTime(){
    
    const dateTime = new Date();
    const currentTime = dateTime.toLocaleTimeString();
    time.textContent = `${currentTime}`;
    
    setTimeout(showTime, 1000);
    showDate(greetingTranslation[lang][3])
}

showTime()


function showDate(code){

    const date = new Date();
    const options = {month: 'long', day: 'numeric', year:'numeric'};
    const currentDate = date.toLocaleDateString(`${code}`, options);
    
    dateHTML.textContent = `${currentDate}`;
}


// Task 2. Greeting

let partOfday =''


function getTimeOfDay(lang){
    const date = new Date();
    const hours = date.getHours();
    
    let nativePartOfday=''

   if (hours<6){
    nativePartOfday = `${greetingTranslation[lang][0][3]}`
    partOfday = 'night'
   } else if (hours>6 && hours<12){
    nativePartOfday = `${greetingTranslation[lang][0][0]}`
    partOfday = 'morning'
   }else if (hours>=12 && hours<18){
    nativePartOfday = `${greetingTranslation[lang][0][1]}`
    partOfday = 'afternoon'
   } else if (hours=>+18 && hours<24){
    nativePartOfday = `${greetingTranslation[lang][0][2]}`
    partOfday = 'evening'
   }
    
    greetingField.textContent = `${nativePartOfday}`;
    
}

getTimeOfDay(lang)

//name

const name = document.querySelector('.name');
name.setAttribute('placeholder',`${greetingTranslation[lang][5]}`)

function setLocalStorage() {

    localStorage.setItem('name', name.value);
    
  }

  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
    
  }
  window.addEventListener('load', getLocalStorage)





  // Task 3: Images slider

  let num=0
  let randomNum=0;

  function getRandomNum(){
    num=Math.ceil(Math.random()*20)
    randomNum=num.toString().padStart(2,'0')
  }

  getRandomNum()

  function setBG(){

    const img = new Image();
    let url=`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${partOfday}/${randomNum}.jpg`;
    img.src=url;
    
    img.addEventListener('load',function(){
      bodyTag.style.backgroundImage = `url(${url})`
    })
  }

  setBG()


  function getSlidePrev(){
    prev.addEventListener('click',function(){
      
      if (randomNum == 1){
        num=20;
        randomNum='20';
      } else {
        num--;
        randomNum=num.toString().padStart(2,'0');}
      setBG()
    })
  }
  getSlidePrev()

  function getSlideNext(){
    next.addEventListener('click',function(){
      console.log('clicked')
      if (randomNum==20){
        num=1;
        randomNum='01';
      } else {
        num++;
        randomNum=num.toString().padStart(2,'0');}
      setBG()
    })
  }
  getSlideNext()



  // Task 4: Weather
  let city='Minsk';
  
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const cityInput=document.querySelector('.city')
  const wind=document.querySelector('.wind');
  const humidity=document.querySelector('.humidity');
  const error = document.querySelector('.weather-error')
  const icon=document.querySelector('.weather-icon');

  cityInput.addEventListener('change',function(lang){
    
    localStorage.setItem('cityLocal', cityInput.value);
    getWeather(lang)
  })

  async function getWeather(param){
    
    let city='';
   if (!localStorage.getItem('cityLocal')){
    city ='Minsk'
    cityInput.value=city
   } else {
    city=localStorage.getItem('cityLocal')
    cityInput.value=city
   }
    
   
    const link =`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=7c39611dc479d50d98a19a8323f79bda&units=metric`
    const res = await fetch(link);
    const data = await res.json(); 


  if(data.cod=='404'){
    error.textContent='City has not found'
    temperature.textContent = ''
    wind.textContent = ''
    humidity.textContent =''
    weatherDescription.textContent = ''
    icon.removeAttribute('src');
  } else{
    error.textContent=''
    let iconName=data.weather[0].icon;
    let iconSrc=`http://openweathermap.org/img/wn/${iconName}@2x.png`;
  
    icon.setAttribute('src',iconSrc);
    temperature.textContent = `${parseInt(Math.round(data.main.temp))}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent=`${Math.round(data.wind.speed)} ${greetingTranslation[lang][1]}`;
    humidity.textContent=`${data.main.humidity}% ${greetingTranslation[lang][2]}`;
  }
   
  }
 
  getWeather()

 
//Task 5.Quotes of the day

const quoteHolder = document.querySelector('.quote')
const authorHolder = document.querySelector('.author')


async function getQuotes(lang) {  
  const quotes = './data.json';
  const res = await fetch(quotes)
  const data = await res.json(); 

  let num = Math.floor(Math.random()*6)
  let arr = 0;


if(lang=='ua'){
  arr=0
} else if (lang=='en'){
  arr=1
}else if (lang=='ru'){
  arr=2
}

  quoteHolder.textContent = `${data[arr][num].text}`;
  authorHolder.textContent = data[arr][num].author;
  
}
getQuotes(lang);

const refreshButton=document.querySelector('.change-quote')
refreshButton.addEventListener('click',function(){
  getQuotes(lang)
})




// Task 6.Audio

const playBtn = document.querySelector('.play');
const backBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const playContainer = document.querySelector('.play-list')

let names = []
playList.forEach( item =>{
  names.push(item.title)
})

names.forEach(item=>{
  playContainer.innerHTML +=` <p class='music ${item}'>${item}</p>`;
})

const audio = new Audio();
let isPlay = false;
let i=0;


function playAudio() {
  audio.src = `${playList[i].src}`;
  audio.currentTime = 0;
  document.querySelectorAll('.music')[i].classList.add('active')
 


  
      // document.querySelector('.bar').value = `${audio.currentTime/playList[i].duration*100}`
     
  
}

let interval;

playBtn.addEventListener('click',function(){

  if (!isPlay){
    playAudio()
    audio.play();
    isPlay=true;
    playBtn.classList.toggle('pause')

    const fullTime = playList[i].duration.split('')
    console.log(fullTime)
    let duration=0;
  
    if (fullTime[1]){
      duration+= +fullTime[1]*60;
      duration+=Number(fullTime[3]+fullTime[4])
    }
    console.log(duration)

  
    function getTime(){
      let currTime = audio.currentTime
      document.querySelector('.bar').value = `${currTime/duration*100}`
      console.log(document.querySelector('.bar').value)
    }
   
    interval = setInterval(getTime,1000)
  }
  else if (isPlay) {
      audio.pause()

      clearInterval(interval)

      playBtn.classList.toggle('pause')
      isPlay=false;
      document.querySelectorAll('.music').forEach(item=>{
        item.classList.remove('active')
      })
      
  }
})

nextBtn.addEventListener('click',function(){
  console.log(document.querySelector('.bar').value)
  document.querySelector('.bar').value = '00'

  if (i<3){
    i++;
    document.querySelectorAll('.music').forEach(item=>{
      item.classList.remove('active')
    })
    document.querySelectorAll('.music')[i].classList.add('active')
    
  } else {
    i=0;
    
    document.querySelectorAll('.music').forEach(item=>{
      item.classList.remove('active')
    })
    document.querySelectorAll('.music')[i].classList.add('active')
    playBtn.classList.toggle('pause')
  }

  if(isPlay){
    playBtn.classList.remove('pause')
    audio.pause()
    isPlay=false
    clearInterval(interval)
  }
 
})

backBtn.addEventListener('click',function(){
  if (i==0){
    i=3;
    document.querySelectorAll('.music').forEach(item=>{
      item.classList.remove('active')
    })
    document.querySelectorAll('.music')[i].classList.add('active')
  } else {
    i--;
    document.querySelectorAll('.music').forEach(item=>{
      item.classList.remove('active')
    })
    document.querySelectorAll('.music')[i].classList.add('active')
  }

  if(isPlay){
    playBtn.classList.remove('pause')
    audio.pause()
    isPlay=false
    clearInterval(interval)
  }
})



// Task 6.Audio advanced

//Task 8. Translation

const gear = document.querySelector('.settings_btn')
const settingsBlock = document.querySelector('.settings_block')

let isClicked=false;

gear.addEventListener('click',function(){
  if (!isClicked){
    isClicked=true;
    settingsBlock.classList.toggle('hidden')
  } else if(isClicked){
    isClicked=false;
    settingsBlock.classList.toggle('hidden')
  }
})

document.querySelector('.language p').textContent = `${greetingTranslation[lang][4]}`
document.querySelector('.toDo-content p').textContent = `${greetingTranslation[lang][6]}`
document.querySelector('.toDo-content input').placeholder = `${greetingTranslation[lang][7]}`
document.querySelector('.submit').textContent = `${greetingTranslation[lang][8]}`


// Task. ToDo list

const list = document.querySelector('.toDo-btn')
const toDoBlock = document.querySelector('.toDo-box')

let isClickedToDO=false;

list.addEventListener('click',function(){
  if (!isClickedToDO){
    isClicked=true;
    toDoBlock.classList.toggle('hidden')
  } else if(isClickedToDO){
    isClicked=false;
    toDoBlock.classList.toggle('hidden')
  }
})


let itemList=[]
let UL =document.querySelector('.toDo-list') 


let parsed = JSON.parse(localStorage.getItem('ulLocal'))


if(parsed !== null){
  render(parsed);
  itemList=parsed;
}

function render(parsed){
  for (let i=0;i<parsed.length;i++){
    UL.innerHTML+=parsed[i];
  }
  remove()
}



document.querySelector('.submit').addEventListener('click', function(){
  
  let text = document.querySelector('.enter_item input').value;
  let li=`<li class="item">${text}<img class="delete" src="assets/svg/delete.png"></li>`;
  UL.innerHTML+=li;
  

  itemList.push(li)
 
  document.querySelector('.enter_item input').value =''
  localStorage.setItem('ulLocal', JSON.stringify(itemList))
 
  remove()
})


function remove(){
  let renderedLi = document.querySelectorAll('.item')
  renderedLi.forEach(item=> {
      item.addEventListener('click', function(){
        console.log('click')

        itemList = itemList.filter( it=> it!== item.outerHTML)
        console.log(itemList)
        localStorage.setItem('ulLocal', JSON.stringify(itemList))
        UL.innerHTML = ''
        itemList.map( el => { 
            UL.innerHTML+=el; 
            remove()
        })
      
      })
  })
      
}


const display = document.getElementById('clock');

//set Audio for alarm
const url = '/files/ringtone.mp3';
const audio = new Audio(url);
console.log(audio);



let alarmTime = null;
let alarmTimeout = null;

//get the my list 
const MyList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm');

const alarmList = []; //store all the alarms being set


//plays the alarm audio at correct time
function ringtone(now){
    audio.play();
    alert(`hey it is ${now}`);
}

//update time every second
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());

    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText = `${hour}:${minutes}:${seconds}`;
    // console.log(now);
    //check if the alarmList includes the currect time, "now"
    //if yes, ringtone(is called);
}

//set the correct format of time
//converts "1:2:3 to 01:02:03"
function formatTime(time){
    if( time <10 && time.length != 2){
        return '0' + time;
    }
    return time;
}

//function to clear/stop the currently playing alarm
function clearAlarm(){
    audio.pause();
    if(alarmTimeout){
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}

// removes an elarm from the unorderedlist and the webpage when "Delete Alarm" is clicked
MyList.addEventListener('click', e=>{
    console.log("removing Element");
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }
})


//removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) =>{
    let newList  = alarmList.filter((time)=> time != value);
    alarmList.length = 0;
    alarmList.push.apply(alarmList, newList);

    console.log("newList", newList);
    console.log("alarmList",alarmList);
}

//Adds new Alarm to the unorderlist as a new list item on webpage

function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


//event to set a new Alarm whenever the form is submitted
addAlarm.addEventListener('submit',e=>{
    e.preventDefault();

    let new_h = formatTime(addAlarm.a_hour.value);
    if(new_h == '0'){
        new_h = '00';
    }
    let new_m = formatTime(addAlarm.a_min.value);
    if(new_m == '0'){
        new_m = '00';
    }
    let new_s = formatTime(addAlarm.a_sec.value);
    if(new_s == '0'){
        new_s= '00';
    }

    const newAlarm = `${new_h}:${new_m}:${new_s}`;

    //add new Alarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        }else{
            alert(`Alarm for ${newAlarm} already set`);
        }
    }else{
        alert("Invalid Time Entered");
    }


})
//calls updateTime() every second
setInterval(updateTime,1000);




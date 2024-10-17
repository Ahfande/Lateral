// // NAVBAR
const HomeML1P = document.getElementById("iconHome");
HomeML1P.addEventListener("click", () => {
  window.location.href = "Home.html";
});

// Server Untuk Menyalakan LED 
const firebaseConfig = {
    apiKey: "AIzaSyDh7h2pepjv8AIPwVKy30y2tQIkKwNOcmU",
    authDomain: "salmon-17.firebaseapp.com",
    databaseURL: "https://salmon-17-default-rtdb.firebaseio.com",
    projectId: "salmon-17",
    storageBucket: "salmon-17.appspot.com",
    messagingSenderId: "809053328128",
    appId: "1:809053328128:web:446c479d6563c5da1c59e5",
};
// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Untuk Menyalakan Lateral 1P
function controlLED(lateral, status) {
    firebase.database().ref(`/${lateral}/status`).set(status)
    .then(() => {
        console.log(`${lateral} set to ${status}`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// HARI MINGGU.....
function setHariMingguL1P(MinTimeIdL1P, MinDurasiIdL1P, MinSwitchIdL1P, MinNotifIdL1P, MinTimerIdL1P) {
    const MinTimeValueL1P = document.getElementById(MinTimeIdL1P).value;
    const MinDurasiValueL1P = document.getElementById(MinDurasiIdL1P).value;
    
    if (MinTimeValueL1P && MinDurasiValueL1P ) {
        const MdayL1P = 0;
        const MinDataWaktuL1P = { 
            time: MinTimeValueL1P, 
            duration: MinDurasiValueL1P, 
            MdayL1P: MdayL1P, 
            MinStartTimeL1P: null };
        
            if (MinSwitchIdL1P === 'MinSwitch1L1P') {
            localStorage.setItem('MingguKondisi1L1P', JSON.stringify(MinDataWaktuL1P));
            document.getElementById(MinNotifIdL1P).innerText = `${MinTimeValueL1P}`;
            } else if (MinSwitchIdL1P === 'MinSwitch2L1P') {
            localStorage.setItem('MingguKondisi2L1P', JSON.stringify(MinDataWaktuL1P));
            document.getElementById(MinNotifIdL1P).innerText = `${MinTimeValueL1P}`;
            }
            MinTampilanWaktuL1P();
    }else{
        console.log("Tolong Masukkan wakru dan durasi");
    };
}

function MinTampilanWaktuL1P() {
    const MinKondisi1L1P = JSON.parse(localStorage.getItem('MingguKondisi1L1P'));
    const MinKondisi2L1P = JSON.parse(localStorage.getItem('MingguKondisi2L1P'));

    if(MinKondisi1L1P){
        document.getElementById('MinTextJam1L1P').innerText = `${MinKondisi1L1P.time}`
    }
    if(MinKondisi2L1P){
        document.getElementById('MinTextJam2L1P').innerText = `${MinKondisi2L1P.time}`
    }

    setInterval(() =>{
        if (MinKondisi1L1P) MinCekWaktuL1P(MinKondisi1L1P, 'MinSwitch1L1P', 'MinTimer1L1P');
        if (MinKondisi2L1P) MinCekWaktuL1P(MinKondisi2L1P, 'MinSwitch2L1P', 'MinTimer2L1P');
    }, 1000);
}

function MinCekWaktuL1P(MinDataWaktuL1P, MinSwitchIdL1P, MinTimerIdL1P) {
    const MinCurrentTimeL1P = new Date();
    const MinCurrentDayL1P = MinCurrentTimeL1P.getDay();
    const MinCurrentHourL1P = MinCurrentTimeL1P.toTimeString().slice(0, 5); 

    if (MinCurrentDayL1P === MinDataWaktuL1P.MdayL1P && MinCurrentHourL1P === MinDataWaktuL1P.time) {
        if (!MinDataWaktuL1P.MinStartTimeL1P) {
            MinDataWaktuL1P.MinStartTimeL1P = new Date().toISOString();
            localStorage.setItem(MinSwitchIdL1P === 'MinSwitch1L1P' ? 'MingguKondisi1L1P' : 'MingguKondisi2L1P', JSON.stringify(MinDataWaktuL1P));
        }
        document.getElementById(MinSwitchIdL1P).checked = true;

        const MinStartTimeL1P = new Date(MinDataWaktuL1P.MinStartTimeL1P);
        const MinDetikLewatL1P = Math.floor((MinCurrentTimeL1P - MinStartTimeL1P) / 1000);
        const MinRemainingDetikL1P = MinDataWaktuL1P.duration * 60 - MinDetikLewatL1P;

        if (MinRemainingDetikL1P > 0) {
            MinStartTimerL1P(MinTimerIdL1P, MinRemainingDetikL1P, MinSwitchIdL1P);
            controlLED("Lateral1","L1P");
        } else {
            MinResetWaktuL1P(MinSwitchIdL1P, MinTimerIdL1P);
        }
    }
}

function MinResetWaktuL1P(MinSwitchIdL1P, MinTimerIdL1P) {
    document.getElementById(MinSwitchIdL1P).checked = false;
    document.getElementById(MinTimerIdL1P).innerText = '';
    document.getElementById(MinTimerIdL1P).style.display = 'none';

    const MkeyL1P = MinSwitchIdL1P === 'MinSwitch1L1P' ? 'MingguKondisi1L1P' : 'MingguKondisi2L1P';
    const MinDataWaktuL1P = JSON.parse(localStorage.getItem(MkeyL1P));
    if (MinDataWaktuL1P) {
        MinDataWaktuL1P.MinStartTimeL1P = null;
        localStorage.setItem(MkeyL1P, JSON.stringify(MinDataWaktuL1P));
    }
    controlLED("Lateral1","OFF");
}
 
function MinStartTimerL1P(MinTimerIdL1P, MinInSecL1P, MinSwitchIdL1P) {
    let MinRemainingWakL1P = MinInSecL1P;

    const MinTimerIntervalL1P = setInterval(() => {
        const Menit = Math.floor(MinRemainingWakL1P / 60);
        const Detik = MinRemainingWakL1P % 60;

        document.getElementById(MinTimerIdL1P).style.display = 'block';
        document.getElementById(MinTimerIdL1P).innerText = `${Menit}: ${Detik}`;
        
        MinRemainingWakL1P--;

        if(MinRemainingWakL1P < 0){
            clearInterval(MinTimerIntervalL1P);
            MinResetWaktuL1P(MinSwitchIdL1P, MinTimerIdL1P);
            localStorage.setItem('TimerEnd', JSON.stringify(MinRemainingWakL1P));
        }
    }, 1000);
}

window.onload = MinTampilanWaktuL1P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi1L1P');
    document.getElementById('MinTextJam1L1P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi2L1P');
    document.getElementById('MinTextJam2L1P').innerText = 'No Time';
});
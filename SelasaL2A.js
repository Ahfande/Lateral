// NAVBAR
const HomeSelL2A = document.getElementById("iconHome");
HomeSelL2A.addEventListener("click", () => {
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

// Untuk Menyalakan lateral 2A
function controlLED(lateral, status) {
    firebase.database().ref(`/${lateral}/status`).set(status)
    .then(() => {
        console.log(`${lateral} set to ${status}`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// HARI SELASA.....
function setHariSelasaL2A(SelTimeIdL2A, SelDurasiIdL2A, SelSwitchIdL2A, SelNotifIdL2A, SelTimerIdL2A) {
    const SelTimeValueL2A = document.getElementById(SelTimeIdL2A).value;
    const SelDurasiValueL2A = document.getElementById(SelDurasiIdL2A).value;
    
    if (SelTimeValueL2A && SelDurasiValueL2A ) {
        const SdayL2A = 2;
        const SelDataWaktuL2A = { 
            time: SelTimeValueL2A, 
            duration: SelDurasiValueL2A, 
            SdayL2A: SdayL2A, 
            SelStartTimeL2A: null };
        
            if (SelSwitchIdL2A === 'SelSwitch1L2A') {
            localStorage.setItem('SelasaKondisi1L2A', JSON.stringify(SelDataWaktuL2A));
            document.getElementById(SelNotifIdL2A).innerText = `${SelTimeValueL2A}`;
            } else if (SelSwitchIdL2A === 'SelSwitch2L2A') {
            localStorage.setItem('SelasaKondisi2L2A', JSON.stringify(SelDataWaktuL2A));
            document.getElementById(SelNotifIdL2A).innerText = `${SelTimeValueL2A}`;
        };
        SelTampilanWaktuL2A();
    }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function SelTampilanWaktuL2A() {
    const SelKondisi1L2A = JSON.parse(localStorage.getItem('SelasaKondisi1L2A'));
    const SelKondisi2L2A = JSON.parse(localStorage.getItem('SelasaKondisi2L2A'));

    if(SelKondisi1L2A){
        document.getElementById('SelTextJam1L2A').innerText = `${SelKondisi1L2A.time}`
    }
    if(SelKondisi2L2A){
        document.getElementById('SelTextJam2L2A').innerText = `${SelKondisi2L2A.time}`
    }

    setInterval(() =>{
        if (SelKondisi1L2A) SelCekWaktuL2A(SelKondisi1L2A, 'SelSwitch1L2A', 'SelTimer1L2A');
        if (SelKondisi2L2A) SelCekWaktuL2A(SelKondisi2L2A, 'SelSwitch2L2A', 'SelTimer2L2A');
    }, 1000);
}

function SelCekWaktuL2A(SelDataWaktuL2A, SelSwitchIdL2A, SelTimerIdL2A) {
    const SelCurrentTimeL2A = new Date();
    const SelCurrentDayL2A = SelCurrentTimeL2A.getDay();
    const SelCurrentHourL2A = SelCurrentTimeL2A.toTimeString().slice(0, 5); 

    if (SelCurrentDayL2A === SelDataWaktuL2A.SdayL2A && SelCurrentHourL2A === SelDataWaktuL2A.time) {
        if (!SelDataWaktuL2A.SelStartTimeL2A) {
            SelDataWaktuL2A.SelStartTimeL2A = new Date().toISOString();
            localStorage.setItem(SelSwitchIdL2A === 'SelSwitch1L2A' ? 'SelasaKondisi1L2A' : 'SelasaKondisi2L2A', JSON.stringify(SelDataWaktuL2A));
        }
        document.getElementById(SelSwitchIdL2A).checked = true;

        const SelStartTimeL2A = new Date(SelDataWaktuL2A.SelStartTimeL2A);
        const SelDetikLewatL2A = Math.floor((SelCurrentTimeL2A - SelStartTimeL2A) / 1000);
        const SelRemainingDetikL2A = SelDataWaktuL2A.duration * 60 - SelDetikLewatL2A;

        if (SelRemainingDetikL2A > 0) {
            SelStartTimerL2A(SelTimerIdL2A, SelRemainingDetikL2A, SelSwitchIdL2A);
            controlLED("Lateral2","L2A");
        } else {
            SelResetWaktuL2A(SelSwitchIdL2A, SelTimerIdL2A);
        }
    }
}

function SelResetWaktuL2A(SelSwitchIdL2A, SelTimerIdL2A) {
    document.getElementById(SelSwitchIdL2A).checked = false;
    document.getElementById(SelTimerIdL2A).innerText = '';
    document.getElementById(SelTimerIdL2A).style.display = 'none';

    const SkeyL2A = SelSwitchIdL2A === 'SelSwitch1L2A' ? 'SelasaKondisi1L2A' : 'SelasaKondisi2L2A';
    const SelDataWaktuL2A = JSON.parse(localStorage.getItem(SkeyL2A));
    if (SelDataWaktuL2A) {
        SelDataWaktuL2A.SelStartTimeL2A = null;
        localStorage.setItem(SkeyL2A, JSON.stringify(SelDataWaktuL2A));
    }
    controlLED("Lateral2","OFF");
}

function SelStartTimerL2A(SelTimerIdL2A, SelInSecL2A, SelSwitchIdL2A) {
    let SelRemainingWakL2A = SelInSecL2A;

    const SelTimerIntervalL2A = setInterval(() => {
        const Menit = Math.floor(SelRemainingWakL2A / 60);
        const Detik = SelRemainingWakL2A % 60;

        document.getElementById(SelTimerIdL2A).style.display = 'block';
        document.getElementById(SelTimerIdL2A).innerText = `${Menit}: ${Detik}`;
        
        SelRemainingWakL2A--;

        if(SelRemainingWakL2A < 0){
            clearInterval(SelTimerIntervalL2A);
            SelResetWaktuL2A(SelSwitchIdL2A, SelTimerIdL2A);
            localStorage.setItem('TimerEnd', JSON.stringify(SelRemainingWakL2A));
        }
    }, 1000);
}

window.onload = SelTampilanWaktuL2A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi1L2A');
    document.getElementById('SelTextJam1L2A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SelasaKondisi2L2A');
    document.getElementById('SelTextJam2L2A').innerText = 'No Time';
});
// NAVBAR
const HomeSenL1P = document.getElementById("iconHome");
HomeSenL1P.addEventListener("click", () => {
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

// HARI SENIN.....
function setHariSeninL1P(SenTimeIdL1P, SenDurasiIdL1P, SenSwitchIdL1P, SenNotifIdL1P, SenTimerIdL1P) {
    const SenTimeValueL1P = document.getElementById(SenTimeIdL1P).value;
    const SenDurasiValueL1P = document.getElementById(SenDurasiIdL1P).value;
    
    if (SenTimeValueL1P && SenDurasiValueL1P ) {
        const SndayL1P = 1;
        const SenDataWaktuL1P = { 
            time: SenTimeValueL1P, 
            duration: SenDurasiValueL1P, 
            SndayL1P: SndayL1P, 
            SenStartTimeL1P: null };
    
            if (SenSwitchIdL1P === 'SenSwitch1L1P') {
            localStorage.setItem('SeninKondisi1L1P', JSON.stringify(SenDataWaktuL1P));
            document.getElementById(SenNotifIdL1P).innerText = `${SenTimeValueL1P}`;
            } else if (SenSwitchIdL1P === 'SenSwitch2L1P') {
            localStorage.setItem('SeninKondisi2L1P', JSON.stringify(SenDataWaktuL1P));
            document.getElementById(SenNotifIdL1P).innerText = `${SenTimeValueL1P}`;
            }
            SenTampilanWaktuL1P();
        }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function SenTampilanWaktuL1P() {
    const SenKondisi1L1P = JSON.parse(localStorage.getItem('SeninKondisi1L1P'));
    const SenKondisi2L1P = JSON.parse(localStorage.getItem('SeninKondisi2L1P'));

    if(SenKondisi1L1P){
        document.getElementById('SenTextJam1L1P').innerText = `${SenKondisi1L1P.time}`
    }
    if(SenKondisi2L1P){
        document.getElementById('SenTextJam2L1P').innerText = `${SenKondisi2L1P.time}`
    }

    setInterval(() =>{
        if (SenKondisi1L1P) SenCekWaktuL1P(SenKondisi1L1P, 'SenSwitch1L1P', 'SenTimer1L1P');
        if (SenKondisi2L1P) SenCekWaktuL1P(SenKondisi2L1P, 'SenSwitch2L1P', 'SenTimer2L1P');
    }, 1000);
}

function SenCekWaktuL1P(SenDataWaktuL1P, SenSwitchIdL1P, SenTimerIdL1P) {
    const SenCurrentTimeL1P = new Date();
    const SenCurrentDayL1P = SenCurrentTimeL1P.getDay();
    const SenCurrentHourL1P = SenCurrentTimeL1P.toTimeString().slice(0, 5); 

    if (SenCurrentDayL1P === SenDataWaktuL1P.SndayL1P && SenCurrentHourL1P === SenDataWaktuL1P.time) {
        if (!SenDataWaktuL1P.SenStartTimeL1P) {
            SenDataWaktuL1P.SenStartTimeL1P = new Date().toISOString();
            localStorage.setItem(SenSwitchIdL1P === 'SenSwitch1L1P' ? 'SeninKondisi1L1P' : 'SeninKondisi2L1P', JSON.stringify(SenDataWaktuL1P));
        }
        document.getElementById(SenSwitchIdL1P).checked = true;

        const SenStartTimeL1P = new Date(SenDataWaktuL1P.SenStartTimeL1P);
        const SenDetikLewatL1P = Math.floor((SenCurrentTimeL1P - SenStartTimeL1P) / 1000);
        const SenRemainingDetikL1P = SenDataWaktuL1P.duration * 60 - SenDetikLewatL1P;

        if (SenRemainingDetikL1P > 0) {
            SenStartTimerL1P(SenTimerIdL1P, SenRemainingDetikL1P, SenSwitchIdL1P);
            controlLED("Lateral1","L1P");
        } else {
            SenResetWaktuL1P(SenSwitchIdL1P, SenTimerIdL1P);
        }
    }
}

function SenResetWaktuL1P(SenSwitchIdL1P, SenTimerIdL1P) {
    document.getElementById(SenSwitchIdL1P).checked = false;
    document.getElementById(SenTimerIdL1P).innerText = '';
    document.getElementById(SenTimerIdL1P).style.display = 'none';

    const SnkeyL1P = SenSwitchIdL1P === 'SenSwitch1L1P' ? 'SeninKondisi1L1P' : 'SeninKondisi2L1P';
    const SenDataWaktuL1P = JSON.parse(localStorage.getItem(SnkeyL1P));
    if (SenDataWaktuL1P) {
        SenDataWaktuL1P.SenStartTimeL1P = null;
        localStorage.setItem(SnkeyL1P, JSON.stringify(SenDataWaktuL1P));
    }
    controlLED("Lateral1","OFF");
}

function SenStartTimerL1P(SenTimerIdL1P, SenInSecL1P, SenSwitchIdL1P) {
    let SenRemainingWakL1P = SenInSecL1P;

    const SenTimerIntervalL1P = setInterval(() => {
        const Menit = Math.floor(SenRemainingWakL1P / 60);
        const Detik = SenRemainingWakL1P % 60;

        document.getElementById(SenTimerIdL1P).style.display = 'block';
        document.getElementById(SenTimerIdL1P).innerText = `${Menit}: ${Detik}`;
        
        SenRemainingWakL1P--;

        if(SenRemainingWakL1P < 0){
            clearInterval(SenTimerIntervalL1P);
            SenResetWaktuL1P(SenSwitchIdL1P, SenTimerIdL1P);
            localStorage.setItem('TimerEnd', JSON.stringify(SenRemainingWakL1P));
        }
    }, 1000);
}

window.onload = SenTampilanWaktuL1P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SeninKondisi1L1P');
    document.getElementById('SenTextJam1L1P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SeninKondisi2L1P');
    document.getElementById('SenTextJam2L1P').innerText = 'No Time';
});
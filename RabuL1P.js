// NAVBAR
const HomeRabL1P = document.getElementById("iconHome");
HomeRabL1P.addEventListener("click", () => {
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

// Untuk Menyalakan lateral 1P
function controlLED(lateral, status) {
    firebase.database().ref(`/${lateral}/status`).set(status)
    .then(() => {
        console.log(`${lateral} set to ${status}`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// HARI RABU.....
function setHariRabuL1P(RabTimeIdL1P, RabDurasiIdL1P, RabSwitchIdL1P, RabNotifIdL1P, RabTimerIdL1P) {
    const RabTimeValueL1P = document.getElementById(RabTimeIdL1P).value;
    const RabDurasiValueL1P = document.getElementById(RabDurasiIdL1P).value;
    
    if (RabTimeValueL1P && RabDurasiValueL1P ) {
        const RdayL1P = 3;
        const RabDataWaktuL1P = { 
            time: RabTimeValueL1P, 
            duration: RabDurasiValueL1P, 
            RdayL1P: RdayL1P, 
            RabStartTimeL1P: null };


            if (RabSwitchIdL1P === 'RabSwitch1L1P') {
            localStorage.setItem('RabuKondisi1L1P', JSON.stringify(RabDataWaktuL1P));
            document.getElementById(RabNotifIdL1P).innerText = `${RabTimeValueL1P}`;
            } else if (RabSwitchIdL1P === 'RabSwitch2L1P') {
            localStorage.setItem('RabuKondisi2L1P', JSON.stringify(RabDataWaktuL1P));
            document.getElementById(RabNotifIdL1P).innerText = `${RabTimeValueL1P}`;
            };
            RabTampilanWaktuL1P();   
    }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function RabTampilanWaktuL1P() {
    const RabKondisi1L1P = JSON.parse(localStorage.getItem('RabuKondisi1L1P'));
    const RabKondisi2L1P = JSON.parse(localStorage.getItem('RabuKondisi2L1P'));

    if(RabKondisi1L1P){
        document.getElementById('RabTextJam1L1P').innerText = `${RabKondisi1L1P.time}`
    }
    if(RabKondisi2L1P){
        document.getElementById('RabTextJam2L1P').innerText = `${RabKondisi2L1P.time}`
    }

    setInterval(() =>{
        if (RabKondisi1L1P) RabCekWaktuL1P(RabKondisi1L1P, 'RabSwitch1L1P', 'RabTimer1L1P');
        if (RabKondisi2L1P) RabCekWaktuL1P(RabKondisi2L1P, 'RabSwitch2L1P', 'RabTimer2L1P');
    }, 1000);
}

function RabCekWaktuL1P(RabDataWaktuL1P, RabSwitchIdL1P, RabTimerIdL1P) {
    const RabCurrentTimeL1P = new Date();
    const RabCurrentDayL1P = RabCurrentTimeL1P.getDay();
    const RabCurrentHourL1P = RabCurrentTimeL1P.toTimeString().slice(0, 5); 

    if (RabCurrentDayL1P === RabDataWaktuL1P.RdayL1P && RabCurrentHourL1P === RabDataWaktuL1P.time) {
        if (!RabDataWaktuL1P.RabStartTimeL1P) {
            RabDataWaktuL1P.RabStartTimeL1P = new Date().toISOString();
            localStorage.setItem(RabSwitchIdL1P === 'RabSwitch1L1P' ? 'RabuKondisi1L1P' : 'RabuKondisi2L1P', JSON.stringify(RabDataWaktuL1P));
        }
        document.getElementById(RabSwitchIdL1P).checked = true;

        const RabStartTimeL1P = new Date(RabDataWaktuL1P.RabStartTimeL1P);
        const RabDetikLewatL1P = Math.floor((RabCurrentTimeL1P - RabStartTimeL1P) / 1000);
        const RabRemainingDetikL1P = RabDataWaktuL1P.duration * 60 - RabDetikLewatL1P;

        if (RabRemainingDetikL1P > 0) {
            RabStartTimerL1P(RabTimerIdL1P, RabRemainingDetikL1P, RabSwitchIdL1P);
            controlLED("Lateral1","L1P");
        } else {
            RabResetWaktuL1P(RabSwitchIdL1P, RabTimerIdL1P);
        }
    }
}

function RabResetWaktuL1P(RabSwitchIdL1P, RabTimerIdL1P) {
    document.getElementById(RabSwitchIdL1P).checked = false;
    document.getElementById(RabTimerIdL1P).innerText = '';
    document.getElementById(RabTimerIdL1P).style.display = 'none';

    const RkeyL1P = RabSwitchIdL1P === 'RabSwitch1L1P' ? 'RabuKondisi1L1P' : 'RabuKondisi2L1P';
    const RabDataWaktuL1P = JSON.parse(localStorage.getItem(RkeyL1P));
    if (RabDataWaktuL1P) {
        RabDataWaktuL1P.RabStartTimeL1P = null;
        localStorage.setItem(RkeyL1P, JSON.stringify(RabDataWaktuL1P));
    }
    controlLED("Lateral1","0FF");
}

function RabStartTimerL1P(RabTimerIdL1P, RabInSecL1P, RabSwitchIdL1P) {
    let RabRemainingWakL1P = RabInSecL1P;

    const RabTimerIntervalL1P = setInterval(() => {
        const Menit = Math.floor(RabRemainingWakL1P / 60);
        const Detik = RabRemainingWakL1P % 60;

        document.getElementById(RabTimerIdL1P).style.display = 'block';
        document.getElementById(RabTimerIdL1P).innerText = `${Menit}: ${Detik}`;
        
        RabRemainingWakL1P--;

        if(RabRemainingWakL1P < 0){
            clearInterval(RabTimerIntervalL1P);
            RabResetWaktuL1P(RabSwitchIdL1P, RabTimerIdL1P);
            localStorage.setItem('TimerEnd', JSON.stringify(RabRemainingWakL1P));
        }
    }, 1000);
}

window.onload = RabTampilanWaktuL1P;
document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi1L1P');
    document.getElementById('RabTextJam1L1P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('RabuKondisi2L1P');
    document.getElementById('RabTextJam2L1P').innerText = 'No Time';
});
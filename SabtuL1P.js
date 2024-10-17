// NAVBAR
const HomeSabL1P = document.getElementById("iconHome");
HomeSabL1P.addEventListener("click", () => {
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

// HARI SABTU.....
function setHariSabtuL1P(SabTimeIdL1P, SabDurasiIdL1P, SabSwitchIdL1P, SabNotifIdL1P, SabTimerIdL1P) {
    const SabTimeValueL1P = document.getElementById(SabTimeIdL1P).value;
    const SabDurasiValueL1P = document.getElementById(SabDurasiIdL1P).value;
    
    if (SabTimeValueL1P && SabDurasiValueL1P ) {
        const SbdayL1P = 6;
        const SabDataWaktuL1P = { 
            time: SabTimeValueL1P, 
            duration: SabDurasiValueL1P, 
            SbdayL1P: SbdayL1P, 
            SabStartTimeL1P: null };

            if (SabSwitchIdL1P === 'SabSwitch1L1P') {
            localStorage.setItem('SabtuKondisi1L1P', JSON.stringify(SabDataWaktuL1P));
            document.getElementById(SabNotifIdL1P).innerText = `${SabTimeValueL1P}`;
            } else if (SabSwitchIdL1P === 'SabSwitch2L1P') {
            localStorage.setItem('SabtuKondisi2L1P', JSON.stringify(SabDataWaktuL1P));
            document.getElementById(SabNotifIdL1P).innerText = `${SabTimeValueL1P}`;
            };
        SabTampilanWaktuL1P();
   }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function SabTampilanWaktuL1P() {
    const SabKondisi1L1P = JSON.parse(localStorage.getItem('SabtuKondisi1L1P'));
    const SabKondisi2L1P = JSON.parse(localStorage.getItem('SabtuKondisi2L1P'));

    if(SabKondisi1L1P){
        document.getElementById('SabTextJam1L1P').innerText = `${SabKondisi1L1P.time}`
    }
    if(SabKondisi2L1P){
        document.getElementById('SabTextJam2L1P').innerText = `${SabKondisi2L1P.time}`
    }

    setInterval(() =>{
        if (SabKondisi1L1P) SabCekWaktuL1P(SabKondisi1L1P, 'SabSwitch1L1P', 'SabTimer1L1P');
        if (SabKondisi2L1P) SabCekWaktuL1P(SabKondisi2L1P, 'SabSwitch2L1P', 'SabTimer2L1P');
    }, 1000);
}

function SabCekWaktuL1P(SabDataWaktuL1P, SabSwitchIdL1P, SabTimerIdL1P) {
    const SabCurrentTimeL1P = new Date();
    const SabCurrentDayL1P = SabCurrentTimeL1P.getDay();
    const SabCurrentHourL1P = SabCurrentTimeL1P.toTimeString().slice(0, 5); 

    if (SabCurrentDayL1P === SabDataWaktuL1P.SbdayL1P && SabCurrentHourL1P === SabDataWaktuL1P.time) {
        if (!SabDataWaktuL1P.SabStartTimeL1P) {
            SabDataWaktuL1P.SabStartTimeL1P = new Date().toISOString();
            localStorage.setItem(SabSwitchIdL1P === 'SabSwitch1L1P' ? 'SabtuKondisi1L1P' : 'SabtuKondisi2L1P', JSON.stringify(SabDataWaktuL1P));
        }
        document.getElementById(SabSwitchIdL1P).checked = true;

        const SabStartTimeL1P = new Date(SabDataWaktuL1P.SabStartTimeL1P);
        const SabDetikLewatL1P = Math.floor((SabCurrentTimeL1P - SabStartTimeL1P) / 1000);
        const SabRemainingDetikL1P = SabDataWaktuL1P.duration * 60 - SabDetikLewatL1P;

        if (SabRemainingDetikL1P > 0) {
            SabStartTimerL1P(SabTimerIdL1P, SabRemainingDetikL1P, SabSwitchIdL1P);
            controlLED("Lateral1","L1P");
        } else {
            SabResetWaktuL1P(SabSwitchIdL1P, SabTimerIdL1P);
        }
    }
}

function SabResetWaktuL1P(SabSwitchIdL1P, SabTimerIdL1P) {
    document.getElementById(SabSwitchIdL1P).checked = false;
    document.getElementById(SabTimerIdL1P).innerText = '';
    document.getElementById(SabTimerIdL1P).style.display = 'none';

    const SbkeyL1P = SabSwitchIdL1P === 'SabSwitch1L1P' ? 'SabtuKondisi1L1P' : 'SabtuKondisi2L1P';
    const SabDataWaktuL1P = JSON.parse(localStorage.getItem(SbkeyL1P));
    if (SabDataWaktuL1P) {
        SabDataWaktuL1P.SabStartTimeL1P = null;
        localStorage.setItem(SbkeyL1P, JSON.stringify(SabDataWaktuL1P));
    }
    controlLED("Lateral1","OFF");
}

function SabStartTimerL1P(SabTimerIdL1P, SabInSecL1P, SabSwitchIdL1P) {
    let SabRemainingWakL1P = SabInSecL1P;

    const SabTimerIntervalL1P = setInterval(() => {
        const Menit = Math.floor(SabRemainingWakL1P / 60);
        const Detik = SabRemainingWakL1P % 60;

        document.getElementById(SabTimerIdL1P).style.display = 'block';
        document.getElementById(SabTimerIdL1P).innerText = `${Menit}: ${Detik}`;
        
        SabRemainingWakL1P--;

        if(SabRemainingWakL1P < 0){
            clearInterval(SabTimerIntervalL1P);
            SabResetWaktuL1P(SabSwitchIdL1P, SabTimerIdL1P);
            localStorage.setItem('TimerEnd', JSON.stringify(SabRemainingWakL1P));
        }
    }, 1000);
}

window.onload = SabTampilanWaktuL1P;


document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi1L1P');
    document.getElementById('SabTextJam1L1P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SabtuKondisi2L1P');
    document.getElementById('SabTextJam2L1P').innerText = 'No Time';
});
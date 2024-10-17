// NAVBAR
const HomeSenL1A = document.getElementById("iconHome");
HomeSenL1A.addEventListener("click", () => {
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

// Untuk Menyalakan Lateral 1A
function controlLED(status) {
    firebase.database().ref(`/Lateral1A/status`).set({status})
    .then(() => {
        console.log(`Kondisi L1A: ${status}`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// HARI SENIN.....
function setHariSeninL1A(SenTimeIdL1A, SenDurasiIdL1A, SenSwitchIdL1A, SenNotifIdL1A, SenTimerIdL1A) {
    const SenTimeValueL1A = document.getElementById(SenTimeIdL1A).value;
    const SenDurasiValueL1A = document.getElementById(SenDurasiIdL1A).value;
    
    if (SenTimeValueL1A && SenDurasiValueL1A ) {
        const SndayL1A = 1;
        const SenDataWaktuL1A = { 
            time: SenTimeValueL1A, 
            duration: SenDurasiValueL1A, 
            SndayL1A: SndayL1A, 
            SenStartTimeL1A: null };
        
        if (SenSwitchIdL1A === 'SenSwitch1L1A') {
            localStorage.setItem('SeninKondisi1L1A', JSON.stringify(SenDataWaktuL1A));
            document.getElementById(SenNotifIdL1A).innerText = `${SenTimeValueL1A}`;
        } else if (SenSwitchIdL1A === 'SenSwitch2L1A') {
            localStorage.setItem('SeninKondisi2L1A', JSON.stringify(SenDataWaktuL1A));
            document.getElementById(SenNotifIdL1A).innerText = `${SenTimeValueL1A}`;
        };
        SenTampilanWaktuL1A();
    }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function SenTampilanWaktuL1A() {
    const SenKondisi1L1A = JSON.parse(localStorage.getItem('SeninKondisi1L1A'));
    const SenKondisi2L1A = JSON.parse(localStorage.getItem('SeninKondisi2L1A'));

    if(SenKondisi1L1A){
        document.getElementById('SenTextJam1L1A').innerText = `${SenKondisi1L1A.time}`
    }
    if(SenKondisi2L1A){
        document.getElementById('SenTextJam2L1A').innerText = `${SenKondisi2L1A.time}`
    }

    setInterval(() =>{
        if (SenKondisi1L1A) SenCekWaktuL1A(SenKondisi1L1A, 'SenSwitch1L1A', 'SenTimer1L1A');
        if (SenKondisi2L1A) SenCekWaktuL1A(SenKondisi2L1A, 'SenSwitch2L1A', 'SenTimer2L1A');
    }, 1000);
}

function SenCekWaktuL1A(SenDataWaktuL1A, SenSwitchIdL1A, SenTimerIdL1A) {
    const SenCurrentTimeL1A = new Date();
    const SenCurrentDayL1A = SenCurrentTimeL1A.getDay();
    const SenCurrentHourL1A = SenCurrentTimeL1A.toTimeString().slice(0, 5); 

    if (SenCurrentDayL1A === SenDataWaktuL1A.SndayL1A && SenCurrentHourL1A === SenDataWaktuL1A.time) {
        if (!SenDataWaktuL1A.SenStartTimeL1A) {
            SenDataWaktuL1A.SenStartTimeL1A = new Date().toISOString();
            localStorage.setItem(SenSwitchIdL1A === 'SenSwitch1L1A' ? 'SeninKondisi1L1A' : 'SeninKondisi2L1A', JSON.stringify(SenDataWaktuL1A));
        }
        document.getElementById(SenSwitchIdL1A).checked = true;

        const SenStartTimeL1A = new Date(SenDataWaktuL1A.SenStartTimeL1A);
        const SenDetikLewatL1A = Math.floor((SenCurrentTimeL1A - SenStartTimeL1A) / 1000);
        const SenRemainingDetikL1A = SenDataWaktuL1A.duration * 60 - SenDetikLewatL1A;

        if (SenRemainingDetikL1A > 0) {
            SenStartTimerL1A(SenTimerIdL1A, SenRemainingDetikL1A, SenSwitchIdL1A);
            controlLED("Lateral1","L1A");
        } else {
            SenResetWaktuL1A(SenSwitchIdL1A, SenTimerIdL1A);
        }
    }
}

function SenResetWaktuL1A(SenSwitchIdL1A, SenTimerIdL1A) {
    document.getElementById(SenSwitchIdL1A).checked = false;
    document.getElementById(SenTimerIdL1A).innerText = '';
    document.getElementById(SenTimerIdL1A).style.display = 'none';

    const SnkeyL1A = SenSwitchIdL1A === 'SenSwitch1L1A' ? 'SeninKondisi1L1A' : 'SeninKondisi2L1A';
    const SenDataWaktuL1A = JSON.parse(localStorage.getItem(SnkeyL1A));
    if (SenDataWaktuL1A) {
        SenDataWaktuL1A.SenStartTimeL1A = null;
        localStorage.setItem(SnkeyL1A, JSON.stringify(SenDataWaktuL1A));
    }
    controlLED("Lateral1","OFF");
}

function SenStartTimerL1A(SenTimerIdL1A, SenInSecL1A, SenSwitchIdL1A) {
    let SenRemainingWakL1A = SenInSecL1A;

    const SenTimerIntervalL1A = setInterval(() => {
        const Menit = Math.floor(SenRemainingWakL1A / 60);
        const Detik = SenRemainingWakL1A % 60;

        document.getElementById(SenTimerIdL1A).style.display = 'block';
        document.getElementById(SenTimerIdL1A).innerText = `${Menit}: ${Detik}`;
        
        SenRemainingWakL1A--;

        if(SenRemainingWakL1A < 0){
            clearInterval(SenTimerIntervalL1A);
            SenResetWaktuL1A(SenSwitchIdL1A, SenTimerIdL1A);
            localStorage.setItem('TimerEnd', JSON.stringify(SenRemainingWakL1A));
        }
    }, 1000);
}

window.onload = SenTampilanWaktuL1A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('SeninKondisi1L1A');
    document.getElementById('SenTextJam1L1A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('SeninKondisi2L1A');
    document.getElementById('SenTextJam2L1A').innerText = 'No Time';
});
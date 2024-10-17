// NAVBAR
const HomeML1A = document.getElementById("iconHome");
HomeML1A.addEventListener("click", () => {
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
function setHariMingguL1A(MinTimeIdL1A, MinDurasiIdL1A, MinSwitchIdL1A, MinNotifIdL1A, MinTimerIdL1A) {
    const MinTimeValueL1A = document.getElementById(MinTimeIdL1A).value;
    const MinDurasiValueL1A = document.getElementById(MinDurasiIdL1A).value;
    
    if (MinTimeValueL1A && MinDurasiValueL1A ) {
        const MdayL1A = 0;
        const MinDataWaktuL1A = { 
            time: MinTimeValueL1A, 
            duration: MinDurasiValueL1A, 
            MdayL1A: MdayL1A, 
            MinStartTimeL1A: null };
        
        if (MinSwitchIdL1A === 'MinSwitch1L1A') {
            localStorage.setItem('MingguKondisi1L1A', JSON.stringify(MinDataWaktuL1A));
            document.getElementById(MinNotifIdL1A).innerText = `${MinTimeValueL1A}`;
        } else if (MinSwitchIdL1A === 'MinSwitch2L1A') {
            localStorage.setItem('MingguKondisi2L1A', JSON.stringify(MinDataWaktuL1A));
            document.getElementById(MinNotifIdL1A).innerText = `${MinTimeValueL1A}`;
        };
        MinTampilanWaktuL1A();
    }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function MinTampilanWaktuL1A() {
    const MinKondisi1L1A = JSON.parse(localStorage.getItem('MingguKondisi1L1A'));
    const MinKondisi2L1A = JSON.parse(localStorage.getItem('MingguKondisi2L1A'));

    if(MinKondisi1L1A){
        document.getElementById('MinTextJam1L1A').innerText = `${MinKondisi1L1A.time}`
    }
    if(MinKondisi2L1A){
        document.getElementById('MinTextJam2L1A').innerText = `${MinKondisi2L1A.time}`
    }

    setInterval(() =>{
        if (MinKondisi1L1A) MinCekWaktuL1A(MinKondisi1L1A, 'MinSwitch1L1A', 'MinTimer1L1A');
        if (MinKondisi2L1A) MinCekWaktuL1A(MinKondisi2L1A, 'MinSwitch2L1A', 'MinTimer2L1A');
    }, 1000);
}

function MinCekWaktuL1A(MinDataWaktuL1A, MinSwitchIdL1A, MinTimerIdL1A) {
    const MinCurrentTimeL1A = new Date();
    const MinCurrentDayL1A = MinCurrentTimeL1A.getDay();
    const MinCurrentHourL1A = MinCurrentTimeL1A.toTimeString().slice(0, 5); 

    if (MinCurrentDayL1A === MinDataWaktuL1A.MdayL1A && MinCurrentHourL1A === MinDataWaktuL1A.time) {
        if (!MinDataWaktuL1A.MinStartTimeL1A) {
            MinDataWaktuL1A.MinStartTimeL1A = new Date().toISOString();
            localStorage.setItem(MinSwitchIdL1A === 'MinSwitch1L1A' ? 'MingguKondisi1L1A' : 'MingguKondisi2L1A', JSON.stringify(MinDataWaktuL1A));
        }
        document.getElementById(MinSwitchIdL1A).checked = true;

        const MinStartTimeL1A = new Date(MinDataWaktuL1A.MinStartTimeL1A);
        const MinDetikLewatL1A = Math.floor((MinCurrentTimeL1A - MinStartTimeL1A) / 1000);
        const MinRemainingDetikL1A = MinDataWaktuL1A.duration * 60 - MinDetikLewatL1A;

        if (MinRemainingDetikL1A > 0) {
            MinStartTimerL1A(MinTimerIdL1A, MinRemainingDetikL1A, MinSwitchIdL1A);
            controlLED("Lateral1","L1A");
        } else {
            MinResetWaktuL1A(MinSwitchIdL1A, MinTimerIdL1A);
        }
    }
}

function MinResetWaktuL1A(MinSwitchIdL1A, MinTimerIdL1A) {
    document.getElementById(MinSwitchIdL1A).checked = false;
    document.getElementById(MinTimerIdL1A).innerText = '';
    document.getElementById(MinTimerIdL1A).style.display = 'none';

    const MkeyL1A = MinSwitchIdL1A === 'MinSwitch1L1A' ? 'MingguKondisi1L1A' : 'MingguKondisi2L1A';
    const MinDataWaktuL1A = JSON.parse(localStorage.getItem(MkeyL1A));
    if (MinDataWaktuL1A) {
        MinDataWaktuL1A.MinStartTimeL1A = null;
        localStorage.setItem(MkeyL1A, JSON.stringify(MinDataWaktuL1A));
    }
    controlLED("Lateral1","OFF");
}

function MinStartTimerL1A(MinTimerIdL1A, MinInSecL1A, MinSwitchIdL1A) {
    let MinRemainingWakL1A = MinInSecL1A;

        const MinTimerIntervalL1A = setInterval(() => {
        const Menit = Math.floor(MinRemainingWakL1A / 60);
        const Detik = MinRemainingWakL1A % 60;
        document.getElementById(MinTimerIdL1A).style.display = 'block';
        document.getElementById(MinTimerIdL1A).innerText = `${Menit}: ${Detik}`;
        
        MinRemainingWakL1A--;

        if(MinRemainingWakL1A < 0){
            clearInterval(MinTimerIntervalL1A);
            MinResetWaktuL1A(MinSwitchIdL1A, MinTimerIdL1A);
            localStorage.setItem('TimerEnd', JSON.stringify(MinRemainingWakL1A));
        }
    }, 1000);
}
window.onload = MinTampilanWaktuL1A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi1L1A');
    document.getElementById('MinTextJam1L1A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('MingguKondisi2L1A');
    document.getElementById('MinTextJam2L1A').innerText = 'No Time';
});
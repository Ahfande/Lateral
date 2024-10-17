// NAVBAR
const HomeJumL2A = document.getElementById("iconHome");
HomeJumL2A.addEventListener("click", () => {
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

// HARI JUMAT.....
function setHariJumatL2A(JumTimeIdL2A, JumDurasiIdL2A, JumSwitchIdL2A, JumNotifIdL2A, JumTimerIdL2A) {
    const JumTimeValueL2A = document.getElementById(JumTimeIdL2A).value;
    const JumDurasiValueL2A = document.getElementById(JumDurasiIdL2A).value;
    
    if (JumTimeValueL2A && JumDurasiValueL2A ) {
        const JdayL2A = 5;
        const JumDataWaktuL2A = { 
            time: JumTimeValueL2A, 
            duration: JumDurasiValueL2A, 
            JdayL2A: JdayL2A, 
            JumStartTimeL2A: null };
            
            if (JumSwitchIdL2A === 'JumSwitch1L2A') {
            localStorage.setItem('JumatKondisi1L2A', JSON.stringify(JumDataWaktuL2A));
            document.getElementById(JumNotifIdL2A).innerText = `${JumTimeValueL2A}`;
            } else if (JumSwitchIdL2A === 'JumSwitch2L2A') {
            localStorage.setItem('JumatKondisi2L2A', JSON.stringify(JumDataWaktuL2A));
            document.getElementById(JumNotifIdL2A).innerText = `${JumTimeValueL2A}`;
            }
            JumTampilanWaktuL2A();
    }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function JumTampilanWaktuL2A() {
    const JumKondisi1L2A = JSON.parse(localStorage.getItem('JumatKondisi1L2A'));
    const JumKondisi2L2A = JSON.parse(localStorage.getItem('JumatKondisi2L2A'));

    if(JumKondisi1L2A){
        document.getElementById('JumTextJam1L2A').innerText = `${JumKondisi1L2A.time}`
    }
    if(JumKondisi2L2A){
        document.getElementById('JumTextJam2L2A').innerText = `${JumKondisi2L2A.time}`
    }

    setInterval(() =>{
        if (JumKondisi1L2A) JumCekWaktuL2A(JumKondisi1L2A, 'JumSwitch1L2A', 'JumTimer1L2A');
        if (JumKondisi2L2A) JumCekWaktuL2A(JumKondisi2L2A, 'JumSwitch2L2A', 'JumTimer2L2A');
    }, 1000);
}

function JumCekWaktuL2A(JumDataWaktuL2A, JumSwitchIdL2A, JumTimerIdL2A) {
    const JumCurrentTimeL2A = new Date();
    const JumCurrentDayL2A = JumCurrentTimeL2A.getDay();
    const JumCurrentHourL2A = JumCurrentTimeL2A.toTimeString().slice(0, 5); 

    if (JumCurrentDayL2A === JumDataWaktuL2A.JdayL2A && JumCurrentHourL2A === JumDataWaktuL2A.time) {
        if (!JumDataWaktuL2A.JumStartTimeL2A) {
            JumDataWaktuL2A.JumStartTimeL2A = new Date().toISOString();
            localStorage.setItem(JumSwitchIdL2A === 'JumSwitch1L2A' ? 'JumatKondisi1L2A' : 'JumatKondisi2L2A', JSON.stringify(JumDataWaktuL2A));
        }
        document.getElementById(JumSwitchIdL2A).checked = true;

        const JumStartTimeL2A = new Date(JumDataWaktuL2A.JumStartTimeL2A);
        const JumDetikLewatL2A = Math.floor((JumCurrentTimeL2A - JumStartTimeL2A) / 1000);
        const JumRemainingDetikL2A = JumDataWaktuL2A.duration * 60 - JumDetikLewatL2A;

        if (JumRemainingDetikL2A > 0) {
            JumStartTimerL2A(JumTimerIdL2A, JumRemainingDetikL2A, JumSwitchIdL2A);
            controlLED("Lateral2","L2A");
        } else {
            JumResetWaktuL2A(JumSwitchIdL2A, JumTimerIdL2A);
        }
    }
}

function JumResetWaktuL2A(JumSwitchIdL2A, JumTimerIdL2A) {
    document.getElementById(JumSwitchIdL2A).checked = false;
    document.getElementById(JumTimerIdL2A).innerText = '';
    document.getElementById(JumTimerIdL2A).style.display = 'none';

    const JkeyL2A = JumSwitchIdL2A === 'JumSwitch1L2A' ? 'JumatKondisi1L2A' : 'JumatKondisi2L2A';
    const JumDataWaktuL2A = JSON.parse(localStorage.getItem(JkeyL2A));
    if (JumDataWaktuL2A) {
        JumDataWaktuL2A.JumStartTimeL2A = null;
        localStorage.setItem(JkeyL2A, JSON.stringify(JumDataWaktuL2A));
    }
    controlLED("Lateral2","OFF");
}

function JumStartTimerL2A(JumTimerIdL2A, JumInSecL2A, JumSwitchIdL2A) {
    let JumRemainingWakL2A = JumInSecL2A;

    const JumTimerIntervalL2A = setInterval(() => {
        const Menit = Math.floor(JumRemainingWakL2A / 60);
        const Detik = JumRemainingWakL2A % 60;

        document.getElementById(JumTimerIdL2A).style.display = 'block';
        document.getElementById(JumTimerIdL2A).innerText = `${Menit}: ${Detik}`;
        
        JumRemainingWakL2A--;

        if(JumRemainingWakL2A < 0){
            clearInterval(JumTimerIntervalL2A);
            JumResetWaktuL2A(JumSwitchIdL2A, JumTimerIdL2A);
            localStorage.setItem('TimerEnd', JSON.stringify(JumRemainingWakL2A));
        }
    }, 1000);
}

window.onload = JumTampilanWaktuL2A;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi1L2A');
    document.getElementById('JumTextJam1L2A').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi2L2A');
    document.getElementById('JumTextJam2L2A').innerText = 'No Time';
});
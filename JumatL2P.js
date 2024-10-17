// NAVBAR
const HomeJumL2P = document.getElementById("iconHome");
HomeJumL2P.addEventListener("click", () => {
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

// Untuk Menyalakan lateral 2P
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
function setHariJumatL2P(JumTimeIdL2P, JumDurasiIdL2P, JumSwitchIdL2P, JumNotifIdL2P, JumTimerIdL2P) {
    const JumTimeValueL2P = document.getElementById(JumTimeIdL2P).value;
    const JumDurasiValueL2P = document.getElementById(JumDurasiIdL2P).value;
    
    if (JumTimeValueL2P && JumDurasiValueL2P ) {
        const JdayL2P = 5;
        const JumDataWaktuL2P = { 
            time: JumTimeValueL2P, 
            duration: JumDurasiValueL2P, 
            JdayL2P: JdayL2P, 
            JumStartTimeL2P: null };

            if (JumSwitchIdL2P === 'JumSwitch1L2P') {
            localStorage.setItem('JumatKondisi1L2P', JSON.stringify(JumDataWaktuL2P));
            document.getElementById(JumNotifIdL2P).innerText = `${JumTimeValueL2P}`;
            } else if (JumSwitchIdL2P === 'JumSwitch2L2P') {
            localStorage.setItem('JumatKondisi2L2P', JSON.stringify(JumDataWaktuL2P));
            document.getElementById(JumNotifIdL2P).innerText = `${JumTimeValueL2P}`;
            }
            JumTampilanWaktuL2P();
    }else{
        console.log("Tolong Masukkan waktu dan durasi");
    };
}

function JumTampilanWaktuL2P() {
    const JumKondisi1L2P = JSON.parse(localStorage.getItem('JumatKondisi1L2P'));
    const JumKondisi2L2P = JSON.parse(localStorage.getItem('JumatKondisi2L2P'));

    if(JumKondisi1L2P){
        document.getElementById('JumTextJam1L2P').innerText = `${JumKondisi1L2P.time}`
    }
    if(JumKondisi2L2P){
        document.getElementById('JumTextJam2L2P').innerText = `${JumKondisi2L2P.time}`
    }

    setInterval(() =>{
        if (JumKondisi1L2P) JumCekWaktuL2P(JumKondisi1L2P, 'JumSwitch1L2P', 'JumTimer1L2P');
        if (JumKondisi2L2P) JumCekWaktuL2P(JumKondisi2L2P, 'JumSwitch2L2P', 'JumTimer2L2P');
    }, 1000);
}

function JumCekWaktuL2P(JumDataWaktuL2P, JumSwitchIdL2P, JumTimerIdL2P) {
    const JumCurrentTimeL2P = new Date();
    const JumCurrentDayL2P = JumCurrentTimeL2P.getDay();
    const JumCurrentHourL2P = JumCurrentTimeL2P.toTimeString().slice(0, 5); 

    if (JumCurrentDayL2P === JumDataWaktuL2P.JdayL2P && JumCurrentHourL2P === JumDataWaktuL2P.time) {
        if (!JumDataWaktuL2P.JumStartTimeL2P) {
            JumDataWaktuL2P.JumStartTimeL2P = new Date().toISOString();
            localStorage.setItem(JumSwitchIdL2P === 'JumSwitch1L2P' ? 'JumatKondisi1L2P' : 'JumatKondisi2L2P', JSON.stringify(JumDataWaktuL2P));
        }
        document.getElementById(JumSwitchIdL2P).checked = true;

        const JumStartTimeL2P = new Date(JumDataWaktuL2P.JumStartTimeL2P);
        const JumDetikLewatL2P = Math.floor((JumCurrentTimeL2P - JumStartTimeL2P) / 1000);
        const JumRemainingDetikL2P = JumDataWaktuL2P.duration * 60 - JumDetikLewatL2P;

        if (JumRemainingDetikL2P > 0) {
            JumStartTimerL2P(JumTimerIdL2P, JumRemainingDetikL2P, JumSwitchIdL2P);
            controlLED("Lateral2","L2P");
        } else {
            JumResetWaktuL2P(JumSwitchIdL2P, JumTimerIdL2P);
        }
    }
}

function JumResetWaktuL2P(JumSwitchIdL2P, JumTimerIdL2P) {
    document.getElementById(JumSwitchIdL2P).checked = false;
    document.getElementById(JumTimerIdL2P).innerText = '';
    document.getElementById(JumTimerIdL2P).style.display = 'none';

    const JkeyL2P = JumSwitchIdL2P === 'JumSwitch1L2P' ? 'JumatKondisi1L2P' : 'JumatKondisi2L2P';
    const JumDataWaktuL2P = JSON.parse(localStorage.getItem(JkeyL2P));
    if (JumDataWaktuL2P) {
        JumDataWaktuL2P.JumStartTimeL2P = null;
        localStorage.setItem(JkeyL2P, JSON.stringify(JumDataWaktuL2P));
    }
    controlLED("Lateral2","OFF");
}

function JumStartTimerL2P(JumTimerIdL2P, JumInSecL2P, JumSwitchIdL2P) {
    let JumRemainingWakL2P = JumInSecL2P;

    const JumTimerIntervalL2P = setInterval(() => {
        const Menit = Math.floor(JumRemainingWakL2P / 60);
        const Detik = JumRemainingWakL2P % 60;

        document.getElementById(JumTimerIdL2P).style.display = 'block';
        document.getElementById(JumTimerIdL2P).innerText = `${Menit}: ${Detik}`;
        
        JumRemainingWakL2P--;

        if(JumRemainingWakL2P < 0){
            clearInterval(JumTimerIntervalL2P);
            JumResetWaktuL2P(JumSwitchIdL2P, JumTimerIdL2P);
            localStorage.setItem('TimeEndJumL2P', JSON.stringify(JumRemainingWakL2P));
        }
    }, 1000);
}

window.onload = JumTampilanWaktuL2P;

document.getElementById('ResetWaktu1').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi1L2P');
    document.getElementById('JumTextJam1L2P').innerText = 'No Time';
});
document.getElementById('ResetWaktu2').addEventListener('click',() =>{
    localStorage.removeItem('JumatKondisi2L2P');
    document.getElementById('JumTextJam2L2P').innerText = 'No Time';
});
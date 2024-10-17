function LateralCheckTimeL1() {
  // MINGGU
  //L1
  const MinKondisi1L1A = JSON.parse(localStorage.getItem("MingguKondisi1L1A"));
  const MinKondisi2L1A = JSON.parse(localStorage.getItem("MingguKondisi2L1A"));
  const MinKondisi1L1P = JSON.parse(localStorage.getItem("MingguKondisi1L1P"));
  const MinKondisi2L1P = JSON.parse(localStorage.getItem("MingguKondisi2L1P"));

  //SENIN
  //L1
  const SenKondisi1L1A = JSON.parse(localStorage.getItem("SeninKondisi1L1A"));
  const SenKondisi2L1A = JSON.parse(localStorage.getItem("SeninKondisi2L1A"));
  const SenKondisi1L1P = JSON.parse(localStorage.getItem("SeninKondisi1L1P"));
  const SenKondisi2L1P = JSON.parse(localStorage.getItem("SeninKondisi2L1P"));

  //SELASA
  // L1
  const SelKondisi1L1A = JSON.parse(localStorage.getItem("SelasaKondisi1L1A"));
  const SelKondisi2L1A = JSON.parse(localStorage.getItem("SelasaKondisi1L1A"));
  const SelKondisi1L1P = JSON.parse(localStorage.getItem("SelasaKondisi2L1P"));
  const SelKondisi2L1P = JSON.parse(localStorage.getItem("SelasaKondisi2L1P"));

  //RABU
  // L1
  const RabKondisi1L1A = JSON.parse(localStorage.getItem("RabuKondisi1L1A"));
  const RabKondisi2L1A = JSON.parse(localStorage.getItem("RabuKondisi2L1A"));
  const RabKondisi1L1P = JSON.parse(localStorage.getItem("RabuKondisi1L1P"));
  const RabKondisi2L1P = JSON.parse(localStorage.getItem("RabuKondisi2L1P"));

  //KAMIS
  // L1
  const KamKondisi1L1A = JSON.parse(localStorage.getItem("KamisKondisi1L1A"));
  const KamKondisi2L1A = JSON.parse(localStorage.getItem("KamisKondisi2L1A"));
  const KamKondisi1L1P = JSON.parse(localStorage.getItem("KamisKondisi1L1P"));
  const KamKondisi2L1P = JSON.parse(localStorage.getItem("KamisKondisi2L1P"));

  //JUMAT
  // L1
  const JumKondisi1L1A = JSON.parse(localStorage.getItem("JumatKondisi1L1A"));
  const JumKondisi2L1A = JSON.parse(localStorage.getItem("JumatKondisi2L1A"));
  const JumKondisi1L1P = JSON.parse(localStorage.getItem("JumatKondisi1L1P"));
  const JumKondisi2L1P = JSON.parse(localStorage.getItem("JumatKondisi2L1P"));

  //SABTU
  // L1
  const SabKondisi1L1A = JSON.parse(localStorage.getItem("SabtuKondisi1L1A"));
  const SabKondisi2L1A = JSON.parse(localStorage.getItem("SabtuKondisi2L1A"));
  const SabKondisi1L1P = JSON.parse(localStorage.getItem("SabtuKondisi1L2P"));
  const SabKondisi2L1P = JSON.parse(localStorage.getItem("SabtuKondisi2L2P"));

  const currentTime = new Date().toTimeString().slice(0, 5);
  const currentDay = new Date().getDay();

  // LATERAL 1
  if (
    MinKondisi1L1A &&
    currentDay === MinKondisi1L1A.MdayL1A &&
    currentTime === MinKondisi1L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> MINGGU K1A
  } else if (
    MinKondisi2L1A &&
    currentDay === MinKondisi2L1A.MdayL1A &&
    currentTime === MinKondisi2L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> MINGGU K2A
  } else if (
    MinKondisi1L1P &&
    currentDay === MinKondisi1L1P.MdayL1P &&
    currentTime === MinKondisi1L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> MINGGU K1P
  } else if (
    MinKondisi2L1P &&
    currentDay === MinKondisi2L1P.MdayL1P &&
    currentTime === MinKondisi2L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> MINGGU K2P
  } else if (
    SenKondisi1L1A &&
    currentDay === SenKondisi1L1A.SndayL1A &&
    currentTime === SenKondisi1L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> SENIN K1A
  } else if (
    SenKondisi2L1A &&
    currentDay === SenKondisi2L1A.SndayL1A &&
    currentTime === SenKondisi2L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> SENIN K2A
  } else if (
    SenKondisi1L1P &&
    currentDay === SenKondisi1L1P.SndayL1P &&
    currentTime === SenKondisi1L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> SENIN K1P
  } else if (
    SenKondisi2L1P &&
    currentDay === SenKondisi2L1P.SndayL1P &&
    currentTime === SenKondisi2L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> SENIN K2P
  } else if (
    SelKondisi1L1A &&
    currentDay === SelKondisi1L1A.SdayL1A &&
    currentTime === SelKondisi1L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> SELASA K1A
  } else if (
    SelKondisi2L1A &&
    currentDay === SelKondisi2L1A.SdayL1A &&
    currentTime === SelKondisi2L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> SELASA K2A
  } else if (
    SelKondisi1L1P &&
    currentDay === SelKondisi1L1P.SdayL1P &&
    currentTime === SelKondisi1L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> SELASA K1P
  } else if (
    SelKondisi2L1P &&
    currentDay === SelKondisi2L1P.SdayL1P &&
    currentTime === SelKondisi2L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> SELASA K2P
  } else if (
    RabKondisi1L1A &&
    currentDay === RabKondisi1L1A.RdayL1A &&
    currentTime === RabKondisi1L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> RABU K1A
  } else if (
    RabKondisi2L1A &&
    currentDay === RabKondisi2L1A.RdayL1A &&
    currentTime === RabKondisi2L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> RABU K2A
  } else if (
    RabKondisi1L1P &&
    currentDay === RabKondisi1L1P.RdayL1P &&
    currentTime === RabKondisi1L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> RABU K1P
  } else if (
    RabKondisi2L1P &&
    currentDay === RabKondisi2L1P.RdayL1P &&
    currentTime === RabKondisi2L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> RABU K2P
  } else if (
    KamKondisi1L1A &&
    currentDay === KamKondisi1L1A.KdayL1A &&
    currentTime === KamKondisi1L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> KAMIS K1A
  } else if (
    KamKondisi2L1A &&
    currentDay === KamKondisi2L1A.KdayL1A &&
    currentTime === KamKondisi2L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> KAMIS K2A
  } else if (
    KamKondisi1L1P &&
    currentDay === KamKondisi1L1P.KdayL1P &&
    currentTime === KamKondisi1L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> KAMIS K1P
  } else if (
    KamKondisi2L1P &&
    currentDay === KamKondisi2L1P.KdayL1P &&
    currentTime === KamKondisi2L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> KAMIS K2P
  } else if (
    JumKondisi1L1A &&
    currentDay === JumKondisi1L1A.JdayL1A &&
    currentTime === JumKondisi1L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> JUMAT K1A
  } else if (
    JumKondisi2L1A &&
    currentDay === JumKondisi2L1A.JdayL1A &&
    currentTime === JumKondisi2L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> JUMAT K2A
  } else if (
    JumKondisi1L1P &&
    currentDay === JumKondisi1L1P.JdayL1P &&
    currentTime === JumKondisi1L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> JUMAT K1P
  } else if (
    JumKondisi2L1P &&
    currentDay === JumKondisi2L1P.JdayL1P &&
    currentTime === JumKondisi2L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> JUMAT K2P
  } else if (
    SabKondisi1L1A &&
    currentDay === SabKondisi1L1A.SbdayL1A &&
    currentTime === SabKondisi1L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> SABTU K1A
  } else if (
    SabKondisi2L1A &&
    currentDay === SabKondisi2L1A.SbdayL1A &&
    currentTime === SabKondisi2L1A.time
  ) {
    controlLED("Lateral1", "L1A"); // Nyalakan L1A --> SABTU K2A
  } else if (
    SabKondisi1L1P &&
    currentDay === SabKondisi1L1P.SbdayL1P &&
    currentTime === SabKondisi1L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> SABTU K1P
  } else if (
    SabKondisi2L1P &&
    currentDay === SabKondisi2L1P.SbdayL1P &&
    currentTime === SabKondisi2L1P.time
  ) {
    controlLED("Lateral1", "L1P"); // Nyalakan L1P --> SABTU K2P --> L1 TO L2
  } else {
    controlLED("Lateral1", "OFF");
  }
}

function LateralCheckTimeL2() {
  // Minggu
  // L2
  const MinKondisi1L2A = JSON.parse(localStorage.getItem("MingguKondisi1L2A"));
  const MinKondisi2L2A = JSON.parse(localStorage.getItem("MingguKondisi2L2A"));
  const MinKondisi1L2P = JSON.parse(localStorage.getItem("MingguKondisi1L2P"));
  const MinKondisi2L2P = JSON.parse(localStorage.getItem("MingguKondisi2L2P"));

  //Senin
  //L2
  const SenKondisi1L2A = JSON.parse(localStorage.getItem("SeninKondisi1L2A"));
  const SenKondisi2L2A = JSON.parse(localStorage.getItem("SeninKondisi2L2A"));
  const SenKondisi1L2P = JSON.parse(localStorage.getItem("SeninKondisi1L2P"));
  const SenKondisi2L2P = JSON.parse(localStorage.getItem("SeninKondisi2L2P"));

  //Selasa
  // L2
  const SelKondisi1L2A = JSON.parse(localStorage.getItem("SelasaKondisi1L2A"));
  const SelKondisi2L2A = JSON.parse(localStorage.getItem("SelasaKondisi1L2A"));
  const SelKondisi1L2P = JSON.parse(localStorage.getItem("SelasaKondisi2L2P"));
  const SelKondisi2L2P = JSON.parse(localStorage.getItem("SelasaKondisi2L2P"));

  //Rabu
  // L2
  const RabKondisi1L2A = JSON.parse(localStorage.getItem("RabuKondisi1L2A"));
  const RabKondisi2L2A = JSON.parse(localStorage.getItem("RabuKondisi2L2A"));
  const RabKondisi1L2P = JSON.parse(localStorage.getItem("RabuKondisi1L2P"));
  const RabKondisi2L2P = JSON.parse(localStorage.getItem("RabuKondisi2L2P"));

  //Kamis
  // L2
  const KamKondisi1L2A = JSON.parse(localStorage.getItem("KamisKondisi1L2A"));
  const KamKondisi2L2A = JSON.parse(localStorage.getItem("KamisKondisi2L2A"));
  const KamKondisi1L2P = JSON.parse(localStorage.getItem("KamisKondisi1L2P"));
  const KamKondisi2L2P = JSON.parse(localStorage.getItem("KamisKondisi2L2P"));

  //Jumat
  // L2
  const JumKondisi1L2A = JSON.parse(localStorage.getItem("JumatKondisi1L2A"));
  const JumKondisi2L2A = JSON.parse(localStorage.getItem("JumatKondisi2L2A"));
  const JumKondisi1L2P = JSON.parse(localStorage.getItem("JumatKondisi1L2P"));
  const JumKondisi2L2P = JSON.parse(localStorage.getItem("JumatKondisi2L2P"));

  //Sabtu
  // L2
  const SabKondisi1L2A = JSON.parse(localStorage.getItem("SabtuKondisi1L2A"));
  const SabKondisi2L2A = JSON.parse(localStorage.getItem("SabtuKondisi2L2A"));
  const SabKondisi1L2P = JSON.parse(localStorage.getItem("SabtuKondisi1L2P"));
  const SabKondisi2L2P = JSON.parse(localStorage.getItem("SabtuKondisi2L2P"));

  const currentTime = new Date().toTimeString().slice(0, 5);
  const currentDay = new Date().getDay();

  if (
    MinKondisi1L2A &&
    currentDay === MinKondisi1L2A.MdayL2A &&
    currentTime === MinKondisi1L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> MINGGU K1A
  } else if (
    MinKondisi2L2A &&
    currentDay === MinKondisi2L2A.MdayL2A &&
    currentTime === MinKondisi2L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> MINGGU K2A
  } else if (
    MinKondisi1L2P &&
    currentDay === MinKondisi1L2P.MdayL2P &&
    currentTime === MinKondisi1L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> MINGGU K1P
  } else if (
    MinKondisi2L2P &&
    currentDay === MinKondisi2L2P.MdayL2P &&
    currentTime === MinKondisi2L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> MINGGU K2P
  } else if (
    SenKondisi1L2A &&
    currentDay === SenKondisi1L2A.SndayL2A &&
    currentTime === SenKondisi1L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> SENIN K1A
  } else if (
    SenKondisi2L2A &&
    currentDay === SenKondisi2L2A.SndayL2A &&
    currentTime === SenKondisi2L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> SENIN K2A
  } else if (
    SenKondisi1L2P &&
    currentDay === SenKondisi1L2P.SndayL2P &&
    currentTime === SenKondisi1L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> SENIN K1P
  } else if (
    SenKondisi2L2P &&
    currentDay === SenKondisi2L2P.SndayL2P &&
    currentTime === SenKondisi2L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> SENIN K2P
  } else if (
    SelKondisi1L2A &&
    currentDay === SelKondisi1L2A.SdayL2A &&
    currentTime === SelKondisi1L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> SELASA K1A
  } else if (
    SelKondisi2L2A &&
    currentDay === SelKondisi2L2A.SdayL2A &&
    currentTime === SelKondisi2L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> SELASA K2A
  } else if (
    SelKondisi1L2P &&
    currentDay === SelKondisi1L2P.SdayL2P &&
    currentTime === SelKondisi1L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> SELASA K1P
  } else if (
    SelKondisi2L2P &&
    currentDay === SelKondisi2L2P.SdayL2P &&
    currentTime === SelKondisi2L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> SELASA K2P
  } else if (
    RabKondisi1L2A &&
    currentDay === RabKondisi1L2A.RdayL2A &&
    currentTime === RabKondisi1L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> RABU K1A
  } else if (
    RabKondisi2L2A &&
    currentDay === RabKondisi2L2A.RdayL2A &&
    currentTime === RabKondisi2L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> RABU K2A
  } else if (
    RabKondisi1L2P &&
    currentDay === RabKondisi1L2P.RdayL2P &&
    currentTime === RabKondisi1L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> RABU K1P
  } else if (
    RabKondisi2L2P &&
    currentDay === RabKondisi2L2P.RdayL2P &&
    currentTime === RabKondisi2L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> RABU K2P
  } else if (
    KamKondisi1L2A &&
    currentDay === KamKondisi1L2A.KdayL2A &&
    currentTime === KamKondisi1L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> KAMIS K1A
  } else if (
    KamKondisi2L2A &&
    currentDay === KamKondisi2L2A.KdayL2A &&
    currentTime === KamKondisi2L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> KAMIS K2A
  } else if (
    KamKondisi1L2P &&
    currentDay === KamKondisi1L2P.KdayL2P &&
    currentTime === KamKondisi1L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> KAMIS K1P
  } else if (
    KamKondisi2L2P &&
    currentDay === KamKondisi2L2P.KdayL2P &&
    currentTime === KamKondisi2L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> KAMIS K2P
  } else if (
    JumKondisi1L2A &&
    currentDay === JumKondisi1L2A.JdayL2A &&
    currentTime === JumKondisi1L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A -->JUMAT K1A
  } else if (
    JumKondisi2L2A &&
    currentDay === JumKondisi2L2A.JdayL2A &&
    currentTime === JumKondisi2L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A -->JUMAT K2A
  } else if (
    JumKondisi1L2P &&
    currentDay === JumKondisi1L2P.JdayL2P &&
    currentTime === JumKondisi1L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> JUMAT K1P
  } else if (
    JumKondisi2L2P &&
    currentDay === JumKondisi2L2P.JdayL2P &&
    currentTime === JumKondisi2L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> JUMAT K2P
  } else if (
    SabKondisi1L2A &&
    currentDay === SabKondisi1L2A.SbdayL2A &&
    currentTime === SabKondisi1L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> SABTU K1A
  } else if (
    SabKondisi2L2A &&
    currentDay === SabKondisi2L2A.SbdayL2A &&
    currentTime === SabKondisi2L2A.time
  ) {
    controlLED("Lateral2", "L2A"); // Nyalakan L2A --> SABTU K2A
  } else if (
    SabKondisi1L2P &&
    currentDay === SabKondisi1L2P.SbdayL2P &&
    currentTime === SabKondisi1L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> SABTU K1P
  } else if (
    SabKondisi2L2P &&
    currentDay === SabKondisi2L2P.SbdayL2P &&
    currentTime === SabKondisi2L2P.time
  ) {
    controlLED("Lateral2", "L2P"); // Nyalakan L2P --> SABTU K2P
  } else {
    controlLED("Lateral2", "OFF");
  }
}

setInterval(LateralCheckTimeL1, 1000);
setInterval(LateralCheckTimeL2, 1000);

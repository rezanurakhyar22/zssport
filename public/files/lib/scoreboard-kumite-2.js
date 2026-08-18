const STATES = {
  match: {},
  longBell: false,
};

const countryMap = {
  indonesia: "id",
  ind: "id",
  malaysia: "my",
  mas: "my",
  singapore: "sg",
  singapura: "sg",
  brunei: "bn",
  "brunei darussalam": "bn",
  thailand: "th",
  vietnam: "vn",
  "viet nam": "vn",
  philippines: "ph",
  filipina: "ph",
  myanmar: "mm",
  cambodia: "kh",
  kamboja: "kh",
  laos: "la",
  "timor leste": "tl",
  "timor-leste": "tl",
  japan: "jp",
  jepang: "jp",
  "south korea": "kr",
  "korea selatan": "kr",
  korea: "kr",
  china: "cn",
  cina: "cn",
  tiongkok: "cn",
  taiwan: "tw",
  "hong kong": "hk",
  australia: "au",
  "new zealand": "nz",
  india: "in",
  "united kingdom": "gb",
  inggris: "gb",
  "united states": "us",
  america: "us",
  usa: "us",
  amerika: "us",
  "amerika serikat": "us",
  germany: "de",
  jerman: "de",
  france: "fr",
  perancis: "fr",
  prancis: "fr",
  netherlands: "nl",
  belanda: "nl",
  italy: "it",
  italia: "it",
  spain: "es",
  spanyol: "es",
  portugal: "pt",
  russia: "ru",
  rusia: "ru",
  brazil: "br",
  brasil: "br",
  argentina: "ar",
  canada: "ca",
  kanada: "ca",
};

const getFlagUrl = (countryName) => {
  if (!countryName) return null;
  const name = countryName.trim().toLowerCase();
  if (name.length === 2) {
    return `https://flagcdn.com/w160/${name}.png`;
  }
  const code = countryMap[name];
  if (code) {
    return `https://flagcdn.com/w160/${code}.png`;
  }
  for (const key in countryMap) {
    if (name.includes(key) || key.includes(name)) {
      return `https://flagcdn.com/w160/${countryMap[key]}.png`;
    }
  }
  return null;
};

const countryInitialsMap = {
  id: "IDN",
  my: "MAS",
  sg: "SGP",
  bn: "BRU",
  th: "THA",
  vn: "VIE",
  ph: "PHI",
  mm: "MYA",
  kh: "CAM",
  la: "LAO",
  tl: "TLS",
  jp: "JPN",
  kr: "KOR",
  cn: "CHN",
  tw: "TPE",
  hk: "HKG",
  au: "AUS",
  nz: "NZL",
  in: "IND",
  gb: "GBR",
  us: "USA",
  de: "GER",
  fr: "FRA",
  nl: "NED",
  it: "ITA",
  es: "ESP",
  pt: "POR",
  ru: "RUS",
  br: "BRA",
  ar: "ARG",
  ca: "CAN",
};

const getCountryInitials = (countryName) => {
  if (!countryName) return "";
  const name = countryName.trim().toLowerCase();

  if (name.length === 3) {
    return name.toUpperCase();
  }

  let code = name.length === 2 ? name : countryMap[name];
  if (!code) {
    for (const key in countryMap) {
      if (name.includes(key) || key.includes(name)) {
        code = countryMap[key];
        break;
      }
    }
  }

  if (code && countryInitialsMap[code]) {
    return countryInitialsMap[code];
  }

  return name.slice(0, 3).toUpperCase();
};

let intervalId = null;
let timeOutId = null;

// Handlers

// Renders

const renderContent = () => {
  if (!STATES.match || !STATES.match.participants || STATES.match.participants.length === 0) {
    document.getElementById("content").innerHTML = `
      <div class="fixed inset-0 flex items-center justify-center bg-[#050505] z-[9999]">
          <div class="w-[55em] h-[55em] bg-contain bg-center bg-no-repeat drop-shadow-md animate-logo-dark-pulse" style="background-image: url('/icons/logo.png'); animation-delay: -${Date.now() % 2000}ms;"></div>
      </div>
    `;
    return;
  }

  document.getElementById("content").innerHTML = `
        <div class="flex flex-col w-full h-full relative font-sans text-white bg-[#050505]">
            
            <!-- TOP BAR -->
            <div class="h-[10%] w-full flex items-center px-12 z-10 bg-black relative">
                <div class="flex items-center h-full transform translate-y-2">
                    <span class="text-yellow-500 text-[4.2em] font-bold tracking-wider mr-4">${STATES.match.tatami}</span>
                    <div class="h-[50%] w-[3px] bg-gray-600 mx-8 transform translate-y-1"></div>
                    <span class="text-white text-[3.5em] tracking-wide uppercase font-semibold">${STATES.match.category}</span>
                </div>
                
                <!-- TOP RIGHT LOGO -->
                <div class="absolute right-4 top-1/2 transform -translate-y-1/2 mt-3 flex items-center justify-center z-[100]">
                    <div class="w-[12em] h-[12em] bg-contain bg-center bg-no-repeat drop-shadow-md mx-auto" style="background-image: url('/icons/logo.png');"></div>
                </div>
                
                <!-- FULL WIDTH LINE BELOW COUNTDOWN -->
                <div class="absolute left-0 w-full h-[2px] bg-gray-600 z-[40]" style="top: 120%;"></div>
            </div>

            <!-- Spacer to push middle section down exact to line -->
            <div class="h-[3%] w-full bg-black"></div>

            <div class="flex w-full h-[64%] relative z-[80]">
                <!-- EDGE LINES -->
                <div class="absolute left-0 top-0 bottom-0 w-[50%] z-[80] pointer-events-none" style="clip-path: polygon(calc(90% - 3px) 0, 90% 0, 100% 68%, 84% 120%, calc(84% - 3px) 120%, calc(100% - 3px) 68%);">
                    <div class="absolute top-0 left-0 right-0 bottom-[-2.4em]" style="background: linear-gradient(180deg, #00184a 0%, #00184a 88%, #9ca3af 92%, #9ca3af 100%);"></div>
                </div>
                <div class="absolute right-0 top-0 bottom-0 w-[50%] z-[80] pointer-events-none" style="clip-path: polygon(10% 0, calc(10% + 3px) 0, 3px 68%, calc(16% + 3px) 120%, 16% 120%, 0 68%);">
                    <div class="absolute top-0 left-0 right-0 bottom-[-2.4em]" style="background: linear-gradient(180deg, #4a0000 0%, #4a0000 88%, #9ca3af 92%, #9ca3af 100%);"></div>
                </div>
                <!-- Central Score Box -->
                <div class="absolute left-1/2 bottom-[1.5em] transform -translate-x-1/2 flex items-center justify-center z-[90] gap-12 min-w-[50em]">
                    <!-- PENALTIES Label Box -->
                    <div class="absolute top-[-5.5em] left-1/2 transform -translate-x-1/2 bg-transparent px-4 py-1 z-[99]">
                        <span class="font-bold text-white text-[3.1em] tracking-widest leading-none">PENALTIES</span>
                    </div>
                    
                    <!-- "TOTAL SCORE" label custom polygon -->
                    <div class="absolute left-1/2 bg-gray-400 p-[1px] z-20" style="clip-path: polygon(0 0, 100% 0, 100% 40%, 85% 100%, 15% 100%, 0 40%); top: -0.3em; transform: translateX(-50%);">
                        <div class="px-10 py-3 flex items-center justify-center min-w-[16em]" style="background: linear-gradient(180deg, #181818 0%, #000000 100%); clip-path: polygon(0 0, 100% 0, 100% 40%, 85% 100%, 15% 100%, 0 40%);">
                            <span class="text-white font-bold tracking-widest text-[2em] uppercase">SCORE</span>
                        </div>
                    </div>

                    <!-- Blue Point (Left side, outside) -->
                    <div class="flex flex-row items-center justify-end flex-1 gap-6">
                        <div class="relative flex items-center justify-center px-6 py-2">
                            <span class="inline-block transform translate-y-4 leading-none text-white font-semibold text-[12em] ${(STATES.match.participants[1]?.point - STATES.match.participants[0]?.point) >= 8 ? 'fade' : ''}" style="${STATES.match.participants[1]?.point > STATES.match.participants[0]?.point ? 'text-shadow: 0 0 20px rgba(0,100,255,0.8);' : ''}">${STATES.match.participants[1]?.point}</span>
                            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[3px] bg-gradient-to-r from-transparent via-[#1976d2] to-transparent"></div>
                            ${STATES.match.participants[1]?.senshuu ? `
                                <div class="absolute bottom-2 -left-8 w-[90px] h-[90px] bg-white" style="clip-path: polygon(0 0, 0 100%, 100% 100%);">
                                    <span class="absolute bottom-[6px] left-[18px] text-[#00a651] font-black text-[48px] leading-none">S</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- vs hexagon -->
                    <div class="bg-gray-500 p-[1px] relative z-10 mt-16" style="clip-path: polygon(15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%, 0% 50%); transform: scale(1.2);">
                        <div class="w-[11.5em] h-[6.5em] flex items-center justify-center" style="background: linear-gradient(180deg, #181818 0%, #000000 100%); clip-path: polygon(15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%, 0% 50%);">
                            <span class="text-gray-200 font-bold text-[3em] uppercase leading-none" style="margin-top: -0.1em;">VS</span>
                        </div>
                    </div>

                    <!-- Red Point (Right side, outside) -->
                    <div class="flex flex-row items-center justify-start flex-1 gap-6">
                        <div class="relative flex items-center justify-center px-6 py-2">
                            <span class="inline-block transform translate-y-4 leading-none text-white font-semibold text-[12em] ${(STATES.match.participants[0]?.point - STATES.match.participants[1]?.point) >= 8 ? 'fade' : ''}" style="${STATES.match.participants[0]?.point > STATES.match.participants[1]?.point ? 'text-shadow: 0 0 20px rgba(255,0,0,0.8);' : ''}">${STATES.match.participants[0]?.point}</span>
                            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[3px] bg-gradient-to-r from-transparent via-[#d32f2f] to-transparent"></div>
                            ${STATES.match.participants[0]?.senshuu ? `
                                <div class="absolute bottom-2 -right-8 w-[90px] h-[90px] bg-white" style="clip-path: polygon(100% 0, 0 100%, 100% 100%);">
                                    <span class="absolute bottom-[6px] right-[18px] text-[#00a651] font-black text-[48px] leading-none">S</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- BLUE AO -->
                <div class="w-[50%] flex flex-col relative" style="clip-path: polygon(0 0, 90% 0, 100% 68%, 84% 120%, 0 120%);">
                    <div class="absolute top-0 left-0 right-0 bottom-[-2.4em] z-[-1]" style="background: linear-gradient(180deg, #00184a 0%, #000000 100%);"></div>
                    <div class="absolute top-0 left-0 right-0 bottom-[-2.4em] z-[-1]" style="background: linear-gradient(to right, transparent 20%, #00051a 100%);"></div>
                    <div class="relative z-10 w-full h-full flex flex-col">
                    <!-- Top Blue Bar -->
                    <div class="w-full bg-gradient-to-r from-[#0055ff] to-[#00081a] py-1 px-8 font-bold text-[1.8em] tracking-widest flex items-center h-[8%] shadow-md text-white">
                        AO
                    </div>
                    <div class="flex flex-col px-10 pt-8 pb-4 h-[42%] justify-center items-start text-left w-full">
                        ${getFlagUrl(STATES.match.participants[1]?.country) ? `
                            <div class="flex flex-col items-center mb-2 relative -top-4">
                                <img src="${getFlagUrl(STATES.match.participants[1]?.country)}" alt="Flag" class="w-[8em] h-auto rounded shadow border border-gray-600 object-cover">
                                <span class="font-bold text-gray-300 mt-1 text-[1.8em] leading-none">${getCountryInitials(STATES.match.participants[1]?.country)}</span>
                            </div>
                        ` : ''}
                        <div class="flex items-center w-full">
                            <h1 class="text-[4.5em] font-normal uppercase truncate w-[85%] text-left leading-none">${STATES.match.participants[1]?.name}</h1>
                        </div>
                        <p class="text-[2.8em] text-gray-300 uppercase tracking-wide mt-2 leading-none">${STATES.match.participants[1]?.contingent}</p>
                    </div>
                    
                    <div class="w-[calc(100%-2.5rem)] h-[2px] bg-gradient-to-r from-[#1976d2] to-transparent opacity-80 ml-10"></div>
                    
                    <!-- Penalties row -->
                    <div class="flex justify-between w-[80%] ml-10 mt-4 gap-3 z-[80]">
                        ${['H', 'HC', 'C3', 'C2', 'C1'].map(p => `
                            <div class="flex flex-1 justify-center items-center py-2 rounded-lg ${STATES.match.participants[1]?.[p.toLowerCase()] ? 'bg-[#FEFF04]' : 'bg-transparent'}">
                                <span class="font-bold text-[2.4em] tracking-wider ${STATES.match.participants[1]?.[p.toLowerCase()] ? 'text-black' : 'text-white'}">${p}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="w-[calc(100%-2.5rem)] h-[2px] bg-gradient-to-r from-gray-700 to-gray-300 opacity-80 ml-10 mt-4"></div>
                    
                    <!-- Bottom right accent line -->
                    <div class="absolute bottom-[-2.4em] right-10 w-32 h-[2px] bg-gray-400 shadow-[0_0_8px_#9ca3af]" style="clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);"></div>
                </div>
            </div>

            <!-- RED AKA -->
            <div class="absolute right-0 top-0 bottom-0 w-[50%] flex flex-col" style="clip-path: polygon(10% 0, 100% 0, 100% 120%, 16% 120%, 0 68%);">
                <div class="absolute top-0 left-0 right-0 bottom-[-2.4em] z-[-1]" style="background: linear-gradient(180deg, #4a0000 0%, #000000 100%);"></div>
                <div class="absolute top-0 left-0 right-0 bottom-[-2.4em] z-[-1]" style="background: linear-gradient(to left, transparent 20%, #1a0000 100%);"></div>
                <div class="relative z-10 w-full h-full flex flex-col">
                    <!-- Top Red Bar -->
                    <div class="w-full bg-gradient-to-l from-[#e60000] to-[#1a0000] py-1 px-8 font-bold text-[1.8em] tracking-widest flex justify-end items-center h-[8%] shadow-md text-white">
                        AKA
                    </div>
                    <div class="flex flex-col px-10 pt-8 pb-4 h-[42%] justify-center items-end text-right w-full">
                        ${getFlagUrl(STATES.match.participants[0]?.country) ? `
                            <div class="flex flex-col items-center mb-2 relative -top-4">
                                <img src="${getFlagUrl(STATES.match.participants[0]?.country)}" alt="Flag" class="w-[8em] h-auto rounded shadow border border-gray-600 object-cover">
                                <span class="font-bold text-gray-300 mt-1 text-[1.8em] leading-none">${getCountryInitials(STATES.match.participants[0]?.country)}</span>
                            </div>
                        ` : ''}
                        <div class="flex items-center justify-end w-full">
                            <h1 class="text-[4.5em] font-normal uppercase truncate w-[85%] text-right leading-none">${STATES.match.participants[0]?.name}</h1>
                        </div>
                        <p class="text-[3em] text-gray-300 uppercase tracking-wide mt-2 leading-none">${STATES.match.participants[0]?.contingent}</p>
                    </div>
                    
                    <div class="w-[calc(100%-2.5rem)] h-[2px] bg-gradient-to-l from-[#d32f2f] to-transparent opacity-80 mr-10 ml-auto"></div>
                    
                    <!-- Penalties row -->
                    <div class="flex justify-between w-[80%] mr-10 ml-auto mt-4 gap-3 z-[80]">
                        ${['C1', 'C2', 'C3', 'HC', 'H'].map(p => `
                            <div class="flex flex-1 justify-center items-center py-2 rounded-lg ${STATES.match.participants[0]?.[p.toLowerCase()] ? 'bg-[#FEFF04]' : 'bg-transparent'}">
                                <span class="font-bold text-[2.4em] tracking-wider ${STATES.match.participants[0]?.[p.toLowerCase()] ? 'text-black' : 'text-white'}">${p}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="w-[calc(100%-2.5rem)] h-[2px] bg-gradient-to-r from-gray-300 to-gray-700 opacity-80 mr-10 ml-auto mt-4"></div>
                    
                    <!-- Bottom left accent line -->
                    <div class="absolute bottom-[-2.4em] left-10 w-32 h-[2px] bg-gray-400 shadow-[0_0_8px_#9ca3af]" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 5px 100%);"></div>
                </div>
            </div>

            <!-- Bottom divider lines aligned with PENALTIES box -->
                <div class="absolute bottom-[-2.9em] left-0 w-[calc(50%-10rem)] h-[10px] bg-[#0055FF] z-[90]" style="clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);"></div>
                <div class="absolute bottom-[-2.9em] right-0 w-[calc(50%-10rem)] h-[10px] bg-[#FF0000] z-[90]" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%);"></div>

            </div>

            <!-- BOTTOM BAR -->
            <div class="flex h-[22%] relative bg-black px-12 flex-row items-center justify-between pt-20">
                <!-- Left Dots Indicator -->
                <div class="flex gap-4 px-12 py-3 border-[3px] border-gray-500 rounded-full bg-[#0a0a0a] z-[100]">
                    <div class="w-[1.8em] h-[1.8em] rounded-full bg-[#0047b3]"></div>
                    <div class="w-[1.8em] h-[1.8em] rounded-full bg-[#0047b3]"></div>
                    <div class="w-[1.8em] h-[1.8em] rounded-full bg-[#0047b3]"></div>
                </div>

                <!-- Center Timer -->
                <div class="flex flex-1 justify-center z-[100]">
                    <div class="flex flex-col items-center justify-center border-[2px] border-gray-600 rounded-[1em] px-12 py-3 bg-[#0a0a0a] relative transform -translate-y-4">
                        <div class="flex flex-row items-start justify-center relative -top-2 transform scale-[1.15] origin-center">
                            <span id="timer" class="tabular-nums text-[10em] font-bold leading-none tracking-wide ${!STATES.match.play ? "text-white" : STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"}">
                                ${Math.floor(STATES.match.time / 60)}.${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}
                            </span>
                            <span id="timer-ms" class="tabular-nums text-[4.5em] font-bold leading-none tracking-wide pt-3 ${!STATES.match.play ? "text-white" : STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"}">
                                ${Math.floor((STATES.match.time % 1) * 10)}
                            </span>
                        </div>

                    </div>
                </div>

                <!-- Right Dots Indicator -->
                <div class="flex gap-4 px-12 py-3 border-[3px] border-gray-500 rounded-full bg-[#0a0a0a] z-[100]">
                    <div class="w-[1.8em] h-[1.8em] rounded-full bg-[#c00000]"></div>
                    <div class="w-[1.8em] h-[1.8em] rounded-full bg-[#c00000]"></div>
                    <div class="w-[1.8em] h-[1.8em] rounded-full bg-[#c00000]"></div>
                </div>
            </div>
        </div>
    `;
};

// Services

const serviceOnLoad = async () => {
  const match = await localStorage.getItem("stage_kumite");
  if (!match) {
    renderContent();
    return;
  }

  STATES.match = JSON.parse(match);
  renderContent();
};

const serviceOnUnload = () => {
  clearInterval(intervalId);
  intervalId = null;
};

const serviceOnLocalStorageChange = (e) => {
  if (e.key == "stage_kumite") {
    if (e.newValue === null) {
      location.reload();
      return;
    }

    STATES.match = JSON.parse(e.newValue);

    if (!STATES.match.play && intervalId == null) renderContent();
    if (STATES.match?.rest == true) {
      console.log("Re-render ...");
      STATES.match.rest = false;
      renderContent();
    }

    if (!STATES.match.play && intervalId != null) {
      clearInterval(intervalId);
      intervalId = null;
      renderContent();
    }

    if (STATES.match.play && intervalId == null) {
      intervalId = setInterval(() => {
        const timer = document.getElementById("timer");
        const timerMs = document.getElementById("timer-ms");
        STATES.match.time = Math.max(STATES.match.time - 0.01, 0);

        timer.innerText = `${Math.floor(STATES.match.time / 60)}.${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}`;
        if (timerMs) timerMs.innerText = `${Math.floor((STATES.match.time % 1) * 10)}`;

        if (STATES.match.time <= 0) {
          timer.style.color = "white";
          if (timerMs) timerMs.style.color = "white";
        } else if (STATES.match.time <= 16.00) {
          timer.style.color = "#FF0000";
          if (timerMs) timerMs.style.color = "#FF0000";
        } else if (STATES.match.time < 60) {
          timer.style.color = "yellow";
          if (timerMs) timerMs.style.color = "yellow";
        } else {
          timer.style.color = "white";
          if (timerMs) timerMs.style.color = "white";
        }

        if (STATES.match.time <= 16.10 && !STATES.shortBellPlayed) {
          STATES.shortBellPlayed = true;
          let sb = document.getElementById("short-bell");
          if (sb) sb.play().catch(e => console.log(e));
        }
        if (STATES.match.time > 16.00) {
          STATES.shortBellPlayed = false;
        }

        if (STATES.match.time <= 0 && STATES.hasPlayedEndBell !== true) {
          STATES.hasPlayedEndBell = true;
          document.getElementById("long-bell").play();
        }
        if (STATES.match.time > 0) {
          STATES.hasPlayedEndBell = false;
        }

        if (STATES.match.time == 0) {
          clearInterval(intervalId);
          STATES.match.play = false;
          intervalId = null;
        }
      }, 10);
    }
  }

  if (e.key == "confetti_kumite") {
    const confetti = e.newValue.split("-");
    if (confetti?.length > 0) {
      const container = document.getElementById(`confetti`);
      let content = "";

      switch (confetti[0]) {
        case "c1":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold">PENALTY</h1>
                        <h2 class="text-[1.2em]">( C1 )</h2>
                    `;
          break;
        case "c2":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold">PENALTY</h1>
                        <h2 class="text-[1.2em]">( C2 )</h2>
                    `;
          break;
        case "c3":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold tracking-[0.1em]">PENALTY</h1>
                        <h2 class="text-[1.2em]">( C3 )</h2>
                    `;
          break;
        case "hc":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold tracking-[0.1em]">PENALTY</h1>
                        <h2 class="text-[1.2em]">( HANSHOKU )</h2>
                    `;
          break;
        case "h":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold tracking-[0.1em]">PENALTY</h1>
                        <h2 class="text-[1.2em]">( HANSHOKU )</h2>
                    `;
          break;
        case "senshuu":
          content = `
                        <h1 class="text-center text-[1.75em] font-bold tracking-[0.1em]">FIRST POINT ADVANTAGE</h1>
                        <h2 class="text-[1.2em]">( SENSHUU )</h2>
                    `;
          break;
        case "yuko":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold tracking-[0.1em]">1 POINT</h1>
                        <h2 class="text-[1.2em]">( YUKO )</h2>
                    `;
          break;
        case "wazari":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold tracking-[0.1em]">2 POINT</h1>
                        <h2 class="text-[1.2em]">( WAZARI )</h2>
                    `;
          break;
        case "ippon":
          content = `
                        <h1 class="text-center text-[2.4em] font-bold tracking-[0.1em]">3 POINT</h1>
                        <h2 class="text-[1.2em]">( IPPON )</h2>
                    `;
          break;
        case "min":
          content = `<h1 class="text-center text-[2.4em] font-bold tracking-[0.1em]">-1 POINT</h1>`;
          break;
        case "win":
          content = `
                        <h1 class="text-center text-[1.5em] font-bold tracking-[0.1em]">${STATES.match.participants[confetti[1] == "red" ? 0 : 1].name}</h1>
                        <h2 class="text-[1.2em]">( WINNER )</h2>
                    `;
          break;
        default:
          break;
      }

      switch (confetti[1]) {
        case "red":
          container.style.backgroundColor = "#FF0000F2";
          break;
        case "blue":
          container.style.backgroundColor = "#0000FFF2";
          break;
        default:
          break;
      }

      container.innerHTML = content;
      container.classList.remove("hide");
      container.classList.add("show");

      clearTimeout(timeOutId);
      timeOutId = null;
      timeOutId = setTimeout(() => {
        document.getElementById("confetti").classList.remove("show");
        document.getElementById("confetti").classList.add("hide");
      }, 2500);
    }
  }
};

window.addEventListener("load", serviceOnLoad);
window.addEventListener("unload", serviceOnUnload);
window.addEventListener("storage", serviceOnLocalStorageChange);

// Prevent browser zooming (Ctrl + / Ctrl - / Ctrl + Scroll / Pinch-to-zoom)
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === '+' || e.key === '=' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
}, { passive: false });
document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
}, { passive: false });
document.addEventListener('gestureend', function (e) {
    e.preventDefault();
}, { passive: false });

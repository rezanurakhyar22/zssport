const STATES = {
    match: {},
};

let intervalId = null;

// Handlers

// Renders

const renderContent = () => {
    // Alarm logic
    if (STATES.match.time <= 16.10 && STATES.match.time > 0 && STATES.match.play && !window.shortBellPlayed && !STATES.match.is5MinTimer) {
        window.shortBellPlayed = true;
        const bell = document.getElementById('short-bell');
        if (bell) {
            bell.currentTime = 0;
            bell.play().catch(e => console.log(e));
        }
    }
    if (STATES.match.time > 16.10 || STATES.match.time === 0) {
        window.shortBellPlayed = false;
    }

    if (!STATES.match || !STATES.match.participants || STATES.match.participants.length === 0) {
        document.getElementById("content").innerHTML = `
          <div class="fixed inset-0 flex items-center justify-center bg-[#050505] z-[9999]">
              <div class="w-[55em] h-[55em] bg-contain bg-center bg-no-repeat drop-shadow-md animate-logo-dark-pulse" style="background-image: url('/icons/logo.png'); animation-delay: -${Date.now() % 2000}ms;"></div>
          </div>
        `;
        return;
    }

    const p1 = STATES.match.participants[0] || {};
    const p2 = STATES.match.participants[1] || {};

    if (STATES.match?.is_closed && !STATES.match?.show_result) {
        document.getElementById("content").innerHTML = `<div class="w-full h-full bg-black"></div>`;
        return;
    }

    if (!STATES.match?.show_result) {
        const isTimerVisible = STATES.match.timerStarted && STATES.match.time >= 0;
        const showP1 = !STATES.match?.is_final || STATES.match?.active_player === 0;
        const showP2 = !STATES.match?.is_final || STATES.match?.active_player === 1;

        const p1Point = parseFloat(STATES.match.participants[0]?.point) || 0;
        const p2Point = parseFloat(STATES.match.participants[1]?.point) || 0;
        const totalPoints = p1Point + p2Point;
        const isP1Blink = totalPoints === 5 && p1Point > p2Point;
        const isP2Blink = totalPoints === 5 && p2Point > p1Point;
        const animDelay = -(Date.now() % 800);

        const timerColorClass = STATES.match?.is5MinTimer ? "text-white" : (STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white");
        const borderColor = (STATES.match.time < 60 && !(STATES.match?.is_final && STATES.match?.is5MinTimer)) ? 'white' : 'black';
        const timerStrokeStyle = STATES.match?.is_final ? `text-shadow: -4px -4px 0 ${borderColor}, 4px -4px 0 ${borderColor}, -4px 4px 0 ${borderColor}, 4px 4px 0 ${borderColor}, 0 4px 0 ${borderColor}, 4px 0 0 ${borderColor}, 0 -4px 0 ${borderColor}, -4px 0 0 ${borderColor};` : '';

        document.getElementById("content").innerHTML = `
        <style>
            @keyframes blinkAnim {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .blink-anim {
                animation: blinkAnim 0.8s infinite;
            }
        </style>

        ${showP1
                ? `
                <div class="scoreboard-row relative flex justify-between bg-gradient-to-r from-red-500 to-black p-4" style="height: ${STATES.match?.is_final ? '70%' : '35%'};">
                    <div class="flex flex-1 flex-col px-8 pb-8 ${STATES.match?.is_final ? "justify-center items-center" : "justify-between"}">
                        <div class="flex flex-col ${STATES.match?.is_final ? "items-center justify-center w-full text-center -mt-48" : ""}">
                            <h1 class="scoreboard-title shrink-0 line-clamp-1 m-0 p-0 leading-none ${STATES.match?.is_final ? "text-center w-full" : ""}" style="${STATES.match?.is_final ? 'font-size: 8.5em;' : 'font-size: 5.5em;'}">${STATES.match.participants[0]?.name}</h1>
                            <p class="scoreboard-subtitle leading-none ${STATES.match?.is_final ? 'w-full line-clamp-1 text-center -mt-20' : 'text-[3.5em] -mt-16'}" ${STATES.match?.is_final ? `style="font-size: 7.5em;"` : ''}>${STATES.match.participants[0]?.contingent}</p>
                            ${(STATES.match.participants[0]?.kata_name || STATES.match.kata_name) ? `<p class="scoreboard-subtitle text-white mt-0 uppercase leading-none" style="font-size: ${STATES.match?.is_final ? '7.5em' : '3.8em'};">${STATES.match.participants[0]?.kata_name || STATES.match.kata_name}</p>` : ''}
                            ${STATES.match?.is_final && isTimerVisible ? `
                                <div id="timer" class="absolute bottom-[0%] left-1/2 transform -translate-x-1/2 flex items-start whitespace-nowrap text-[14em] font-bold ${timerColorClass} leading-none tabular-nums" style="${timerStrokeStyle}">
                                    <span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span>
                                    <span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>
                                </div>
                            ` : ''}
                        </div>
                        ${!STATES.match?.is_final
                    ? `
                                <div class="flex space-x-[10em] px-4 absolute bottom-[5%] left-[3em] min-h-[3.5em]">
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g1 !== undefined && STATES.match.participants[0]?.g1 !== "" && STATES.match.participants[0]?.g1 != 0 ? STATES.match.participants[0]?.g1 : ""}</span>
                                        ${STATES.match.participants[0]?.g1 !== undefined && STATES.match.participants[0]?.g1 !== "" && STATES.match.participants[0]?.g1 != 0 && !STATES.match.participants[0]?.c1
                         ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                         : ""
                     }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g2 !== undefined && STATES.match.participants[0]?.g2 !== "" && STATES.match.participants[0]?.g2 != 0 ? STATES.match.participants[0]?.g2 : ""}</span>
                                        ${STATES.match.participants[0]?.g2 !== undefined && STATES.match.participants[0]?.g2 !== "" && STATES.match.participants[0]?.g2 != 0 && !STATES.match.participants[0]?.c2
                         ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                         : ""
                     }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g3 !== undefined && STATES.match.participants[0]?.g3 !== "" && STATES.match.participants[0]?.g3 != 0 ? STATES.match.participants[0]?.g3 : ""}</span>
                                        ${STATES.match.participants[0]?.g3 !== undefined && STATES.match.participants[0]?.g3 !== "" && STATES.match.participants[0]?.g3 != 0 && !STATES.match.participants[0]?.c3
                         ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                         : ""
                     }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g4 !== undefined && STATES.match.participants[0]?.g4 !== "" && STATES.match.participants[0]?.g4 != 0 ? STATES.match.participants[0]?.g4 : ""}</span>
                                        ${STATES.match.participants[0]?.g4 !== undefined && STATES.match.participants[0]?.g4 !== "" && STATES.match.participants[0]?.g4 != 0 && !STATES.match.participants[0]?.c4
                         ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                         : ""
                     }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g5 !== undefined && STATES.match.participants[0]?.g5 !== "" && STATES.match.participants[0]?.g5 != 0 ? STATES.match.participants[0]?.g5 : ""}</span>
                                        ${STATES.match.participants[0]?.g5 !== undefined && STATES.match.participants[0]?.g5 !== "" && STATES.match.participants[0]?.g5 != 0 && !STATES.match.participants[0]?.c5
                         ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                         : ""
                     }
                                    </div>
                                </div>
                            `
                     : ""
                 }
                    </div>
                    ${!STATES.match?.is_final
                     ? `
                             <div class="flex flex-col justify-center items-center -mt-12">
                                 <div class="relative">
                                     <h1 id="0-point" class="scoreboard-point text-[16em] font-bold text-red-500 mx-10 ${isP1Blink ? 'blink-anim' : ''}" ${isP1Blink ? `style="animation-delay: ${animDelay}ms;"` : ''}>${STATES.match.participants[0]?.point !== undefined && STATES.match.participants[0]?.point !== "" && STATES.match.participants[0]?.point != 0 ? STATES.match.participants[0]?.point : ""}</h1>
                                 </div>
                             </div>
                         `
                     : ""
                 }
                </div>
            `
                 : ""
             }
        
        ${showP2
                 ? `
                <div class="scoreboard-row relative flex justify-between bg-gradient-to-r from-blue-500 to-black p-4" style="height: ${STATES.match?.is_final ? '70%' : '35%'};">
                    <div class="flex flex-1 flex-col px-8 pb-8 ${STATES.match?.is_final ? "justify-center items-center" : "justify-between"}">
                        <div class="flex flex-col ${STATES.match?.is_final ? "items-center justify-center w-full text-center -mt-48" : ""}">
                            <h1 class="scoreboard-title shrink-0 line-clamp-1 m-0 p-0 leading-none ${STATES.match?.is_final ? "text-center w-full" : ""}" style="${STATES.match?.is_final ? 'font-size: 8.5em;' : 'font-size: 5.5em;'}">${STATES.match.participants[1]?.name}</h1>
                            <p class="scoreboard-subtitle leading-none ${STATES.match?.is_final ? 'w-full line-clamp-1 text-center -mt-20' : 'text-[3.5em] -mt-16'}" ${STATES.match?.is_final ? `style="font-size: 7.5em;"` : ''}>${STATES.match.participants[1]?.contingent}</p>
                            ${(STATES.match.participants[1]?.kata_name || STATES.match.kata_name) ? `<p class="scoreboard-subtitle text-white mt-0 uppercase leading-none" style="font-size: ${STATES.match?.is_final ? '7.5em' : '3.8em'};">${STATES.match.participants[1]?.kata_name || STATES.match.kata_name}</p>` : ''}
                            ${STATES.match?.is_final && isTimerVisible ? `
                                <div id="timer" class="absolute bottom-[0%] left-1/2 transform -translate-x-1/2 flex items-start whitespace-nowrap text-[14em] font-bold ${timerColorClass} leading-none tabular-nums" style="${timerStrokeStyle}">
                                    <span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span>
                                    <span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>
                                </div>
                            ` : ''}
                        </div>
                       ${!STATES.match?.is_final
                    ? `
                                <div class="flex space-x-[10em] px-4 absolute bottom-[5%] left-[3em] min-h-[3.5em]">
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g1 !== undefined && STATES.match.participants[1]?.g1 !== "" && STATES.match.participants[1]?.g1 != 0 ? STATES.match.participants[1]?.g1 : ""}</span>
                                        ${STATES.match.participants[1]?.g1 !== undefined && STATES.match.participants[1]?.g1 !== "" && STATES.match.participants[1]?.g1 != 0 && !STATES.match.participants[1]?.c1
                        ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                        : ""
                    }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g2 !== undefined && STATES.match.participants[1]?.g2 !== "" && STATES.match.participants[1]?.g2 != 0 ? STATES.match.participants[1]?.g2 : ""}</span>
                                        ${STATES.match.participants[1]?.g2 !== undefined && STATES.match.participants[1]?.g2 !== "" && STATES.match.participants[1]?.g2 != 0 && !STATES.match.participants[1]?.c2
                        ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                        : ""
                    }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g3 !== undefined && STATES.match.participants[1]?.g3 !== "" && STATES.match.participants[1]?.g3 != 0 ? STATES.match.participants[1]?.g3 : ""}</span>
                                        ${STATES.match.participants[1]?.g3 !== undefined && STATES.match.participants[1]?.g3 !== "" && STATES.match.participants[1]?.g3 != 0 && !STATES.match.participants[1]?.c3
                        ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                        : ""
                    }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g4 !== undefined && STATES.match.participants[1]?.g4 !== "" && STATES.match.participants[1]?.g4 != 0 ? STATES.match.participants[1]?.g4 : ""}</span>
                                        ${STATES.match.participants[1]?.g4 !== undefined && STATES.match.participants[1]?.g4 !== "" && STATES.match.participants[1]?.g4 != 0 && !STATES.match.participants[1]?.c4
                        ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                        : ""
                    }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g5 !== undefined && STATES.match.participants[1]?.g5 !== "" && STATES.match.participants[1]?.g5 != 0 ? STATES.match.participants[1]?.g5 : ""}</span>
                                        ${STATES.match.participants[1]?.g5 !== undefined && STATES.match.participants[1]?.g5 !== "" && STATES.match.participants[1]?.g5 != 0 && !STATES.match.participants[1]?.c5
                        ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
                        : ""
                    }
                                    </div>
                                </div>
                            `
                    : ""
                }
                    </div>
                    ${!STATES.match?.is_final
                    ? `
                            <div class="flex flex-col justify-center items-center -mt-12">
                                <div class="relative">
                                    <h1 id="1-point" class="scoreboard-point text-[16em] font-bold text-blue-500 mx-10 ${isP2Blink ? 'blink-anim' : ''}" ${isP2Blink ? `style="animation-delay: ${animDelay}ms;"` : ''}>${STATES.match.participants[1]?.point !== undefined && STATES.match.participants[1]?.point !== "" && STATES.match.participants[1]?.point != 0 ? STATES.match.participants[1]?.point : ""}</h1>
                                </div>          
                            </div>
                        `
                    : ""
                }
                </div>
            `
                : ""
            }
        
        <div class="scoreboard-bottom flex h-[30%] relative items-center justify-center bg-gray-900 px-16">
            <div class="flex flex-col max-w-[40em] absolute left-16">
                <p class="text-yellow-400 text-[5em] font-bold">${STATES.match.tatami}</p>
                <p class="text-[2.2em]">${STATES.match.category}</p>
            </div>
            <div class="absolute right-16 flex items-center gap-16">
                ${(!STATES.match?.is_final && isTimerVisible) ? `
                <div id="timer" class="flex items-start text-[12em] ${STATES.match?.is5MinTimer ? "text-white" : STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"} leading-none tabular-nums" style="${timerStrokeStyle}">
                    <span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span>
                    <span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>
                </div>
                ` : ''}
                <div class="w-[20em] h-[20em] bg-contain bg-center bg-no-repeat" style="background-image: url('/icons/logo.png');"></div>
            </div>
        </div>
    `;
    } else {
        // Calculate Votes
        let rVotes = 0;
        let bVotes = 0;
        let hasScores = false;
        let hasManualFlags = false;

        for (let i = 1; i <= 5; i++) {
            const manualColor = STATES.match.circleColors?.[i];
            const rs = parseFloat(p1[`g${i}`] || 0);
            const bs = parseFloat(p2[`g${i}`] || 0);

            if (rs > 0 || bs > 0) hasScores = true;

            if (manualColor === 'red') {
                rVotes++;
                hasScores = true;
                hasManualFlags = true;
            } else if (manualColor === 'blue') {
                bVotes++;
                hasScores = true;
                hasManualFlags = true;
            } else if (manualColor !== 'black' && manualColor !== undefined) {
            } else {
                if (rs > bs) { rVotes++; }
                if (bs > rs) { bVotes++; }
            }
        }

        let winnerText = "";
        if (rVotes > bVotes) winnerText = `WINNER AKA ${rVotes} - ${bVotes}`;
        else if (bVotes > rVotes) winnerText = `WINNER AO ${bVotes} - ${rVotes}`;
        else if (hasScores) winnerText = "TIE";
        if (!STATES.match.reveal_result) winnerText = "";

        const countryMap = {
            indonesia: "id", ind: "id", malaysia: "my", mas: "my", singapore: "sg", singapura: "sg", brunei: "bn",
            "brunei darussalam": "bn", thailand: "th", vietnam: "vn", "viet nam": "vn", philippines: "ph", filipina: "ph",
            myanmar: "mm", cambodia: "kh", kamboja: "kh", laos: "la", "timor leste": "tl", "timor-leste": "tl",
            japan: "jp", jepang: "jp", "south korea": "kr", "korea selatan": "kr", korea: "kr", china: "cn",
            cina: "cn", tiongkok: "cn", taiwan: "tw", "hong kong": "hk", australia: "au", "new zealand": "nz",
            india: "in", "united kingdom": "gb", inggris: "gb", "united states": "us", america: "us", usa: "us",
            amerika: "us", "amerika serikat": "us", germany: "de", jerman: "de", france: "fr", perancis: "fr",
            prancis: "fr", netherlands: "nl", belanda: "nl", italy: "it", italia: "it", spain: "es", spanyol: "es",
            portugal: "pt", russia: "ru", rusia: "ru", brazil: "br", brasil: "br", argentina: "ar", canada: "ca", kanada: "ca"
        };

        const getFlagUrl = (countryName) => {
            if (!countryName) return null;
            const name = countryName.trim().toLowerCase();
            if (name.length === 2) return `https://flagcdn.com/w160/${name}.png`;
            const code = countryMap[name];
            if (code) return `https://flagcdn.com/w160/${code}.png`;
            for (const key in countryMap) {
                if (name.includes(key) || key.includes(name)) return `https://flagcdn.com/w160/${countryMap[key]}.png`;
            }
            return null;
        };

        const countryInitialsMap = {
            id: "IDN", my: "MAS", sg: "SGP", bn: "BRU", th: "THA", vn: "VIE", ph: "PHI", mm: "MYA", kh: "CAM",
            la: "LAO", tl: "TLS", jp: "JPN", kr: "KOR", cn: "CHN", tw: "TPE", hk: "HKG", au: "AUS", nz: "NZL",
            in: "IND", gb: "GBR", us: "USA", de: "GER", fr: "FRA", nl: "NED", it: "ITA", es: "ESP", pt: "POR",
            ru: "RUS", br: "BRA", ar: "ARG", ca: "CAN"
        };

        const getCountryInitials = (countryName) => {
            if (!countryName) return "";
            const name = countryName.trim().toLowerCase();
            if (name.length === 3) return name.toUpperCase();
            let code = name.length === 2 ? name : countryMap[name];
            if (!code) {
                for (const key in countryMap) {
                    if (name.includes(key) || key.includes(name)) {
                        code = countryMap[key];
                        break;
                    }
                }
            }
            if (code && countryInitialsMap[code]) return countryInitialsMap[code];
            return name.slice(0, 3).toUpperCase();
        };
        const timerColorClass = STATES.match?.is5MinTimer ? "text-white" : (STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white");

        document.getElementById("content").innerHTML = `
<div class="flex flex-col w-full h-full font-sans bg-[#01091a] text-white relative overflow-hidden">
    <!-- TOP BAR -->
    <div class="h-[8%] w-full flex items-center px-10 z-10 bg-black relative border-b-[2px] border-gray-600">
        <div class="flex items-center h-full">
            <span class="text-yellow-500 text-[3.2em] font-bold tracking-wider mr-4">${STATES.match.tatami || ''}</span>
            <div class="h-[50%] w-[3px] bg-gray-600 mx-8"></div>
            <span class="text-white text-[3.2em] tracking-wide uppercase font-semibold">${STATES.match.category || ''}</span>
        </div>
    </div>

    <!-- Top Display (Athletes) -->
    <div class="flex flex-col w-full h-[26%]">
        <!-- Red Athlete -->
        <div class="flex h-1/2 w-full bg-[#990000] items-center px-10 border-b-[2px] border-white shadow-md">
            ${getFlagUrl(p1.country) ? `
            <img src="${getFlagUrl(p1.country)}" alt="Flag" class="w-[6em] h-[4em] object-cover mr-8 border-[2px] border-white shadow-sm">
            ` : ''}
            <h2 class="text-[3em] font-bold uppercase flex-1 truncate">${p1.name || ''} ${p1.country ? `<span class="ml-4 font-bold text-gray-300">(${getCountryInitials(p1.country)})</span>` : ''}${p1.contingent ? `<span class="ml-4 font-bold text-[0.8em] text-gray-200">${p1.contingent}</span>` : ''}</h2>
            ${p1.kata_name ? `<div class="text-[2.5em] font-bold text-white ml-4 whitespace-nowrap uppercase">${p1.kata_name}</div>` : ''}
        </div>
        <!-- Blue Athlete -->
        <div class="flex h-1/2 w-full bg-[#0033cc] items-center px-10">
            ${getFlagUrl(p2.country) ? `
            <img src="${getFlagUrl(p2.country)}" alt="Flag" class="w-[6em] h-[4em] object-cover mr-8 border-[2px] border-white shadow-sm">
            ` : ''}
            <h2 class="text-[3em] font-bold uppercase flex-1 truncate">${p2.name || ''} ${p2.country ? `<span class="ml-4 font-bold text-gray-300">(${getCountryInitials(p2.country)})</span>` : ''}${p2.contingent ? `<span class="ml-4 font-bold text-[0.8em] text-gray-200">${p2.contingent}</span>` : ''}</h2>
            ${p2.kata_name ? `<div class="text-[2.5em] font-bold text-white ml-4 whitespace-nowrap uppercase">${p2.kata_name}</div>` : ''}
        </div>
    </div>

    <!-- Scores Grid -->
    <div class="flex flex-col w-full border-[2px] border-[#304156] h-[46%]">
        <!-- Red Scores -->
        <div class="flex w-full ${hasScores ? 'h-[30%]' : 'h-[50%]'} border-b-[2px] border-[#304156] bg-[#021029]">
            ${[1, 2, 3, 4, 5].map(i => `
                <div class="flex-1 flex items-center justify-center border-r-[2px] border-[#304156] last:border-r-0 relative">
                    <span class="text-[4em] font-bold text-white z-10">${STATES.match.reveal_result ? (p1[`g${i}`] || '') : ''}</span>
                </div>
            `).join('')}
        </div>
        <!-- Blue Scores -->
        <div class="flex w-full ${hasScores ? 'h-[30%]' : 'h-[50%]'} ${hasScores ? 'border-b-[2px] border-[#304156]' : ''} bg-[#021029]">
            ${[1, 2, 3, 4, 5].map(i => `
                <div class="flex-1 flex items-center justify-center border-r-[2px] border-[#304156] last:border-r-0 relative">
                    <span class="text-[4em] font-bold text-white z-10">${STATES.match.reveal_result ? (p2[`g${i}`] || '') : ''}</span>
                </div>
            `).join('')}
        </div>
        <!-- Votes (Flags) -->
        ${hasScores ? `
        <div class="flex w-full h-[40%] bg-[#021029]">
            ${[1, 2, 3, 4, 5].map(i => {
            const rs = parseFloat(p1[`g${i}`] || 0);
            const bs = parseFloat(p2[`g${i}`] || 0);
            const isRedKept = p1[`c${i}`];
            const isBlueKept = p2[`c${i}`];

            const manualColor = STATES.match.circleColors?.[i];
            let color = '';

            if (STATES.match.reveal_result) {
                if (manualColor === 'red') color = 'red';
                else if (manualColor === 'blue') color = 'blue';
                else if (manualColor !== 'black' && manualColor !== undefined) {
                    // keep empty
                } else {
                    if (rs > bs) color = 'red';
                    else if (bs > rs) color = 'blue';
                }
            }

            let circle = '';
            if (color === 'red') {
                circle = '<div class="w-[8em] h-[8em] rounded-full bg-[#990000] flex items-center justify-center shadow-lg relative z-10"></div>';
            } else if (color === 'blue') {
                circle = '<div class="w-[8em] h-[8em] rounded-full bg-[#0033cc] flex items-center justify-center shadow-lg relative z-10"></div>';
            }

            // Dropped scores get a white box with a line (like in the image)
            const showWhiteBox = color === 'red' || color === 'blue';
            const lineColor = color === 'red' ? 'bg-[#990000]' : 'bg-[#0033cc]';

            return `
                <div class="flex-1 flex items-center justify-center relative overflow-hidden">
                    ${showWhiteBox ? `<div class="absolute w-[9.5em] h-[9.5em] bg-[#f0f0f0] flex items-center justify-center"><div class="w-full h-[4px] ${lineColor} absolute"></div></div>` : ''}
                    ${circle}
                </div>
                `;
        }).join('')}
        </div>
        ` : ''}
    </div>

    <!-- Bottom Winner Text & Timer -->
    <div class="flex w-full h-[20%] items-center justify-center relative">
        <!-- Logo Bottom Right -->
        <div class="absolute right-10 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-[100]">
            <div class="w-[12em] h-[12em] bg-contain bg-center bg-no-repeat drop-shadow-md" style="background-image: url('/icons/logo.png');"></div>
        </div>
        <!-- Centered Timer & Winner Text -->
        <div class="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-10">
            <!-- Winner Text -->
            <div class="text-[3.5em] font-bold text-yellow-400 uppercase drop-shadow-md leading-none mb-1">
                ${winnerText}
            </div>
            <!-- Timer -->
            ${STATES.match.timerStarted && STATES.match.time >= 0 ? `
            <div class="flex items-start text-[8.5em] font-bold ${STATES.match?.is5MinTimer ? "text-white" : STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"} leading-none tabular-nums drop-shadow-md" style="text-shadow: none;">
                <span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span>
                <span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>
            </div>
            ` : ''}
        </div>
    </div>
</div>
  `;
    }
};

// Services

const serviceOnLoad = async () => {
    const match = await localStorage.getItem("stage_kata_2");
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
    if (e.key == "stage_kata_2") {
        if (e.newValue === null) {
            location.reload();
            return;
        }

        STATES.match = JSON.parse(e.newValue);
        renderContent();
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

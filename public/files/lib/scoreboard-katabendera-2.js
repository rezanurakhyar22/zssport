const STATES = {
  match: {},
};

let intervalId = null;

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

  const showP1 = STATES.match.participants[0] != null;
  const showP2 = STATES.match.participants[1] != null;

  document.getElementById("content").innerHTML = `
        <div class="flex flex-col w-full h-[70%] font-sans">
            <!-- Participants Container -->
            <div class="flex flex-col w-full h-full">
                <!-- Red Row -->
                ${showP1 ? `
                <div class="flex w-full ${showP2 ? 'h-[50%]' : 'h-full'} border-b-[2px] border-yellow-500 shadow-md">
                    <div class="flex flex-col w-[85%] h-full">
                        <div class="flex w-full h-[55%]">
                            <div class="flex-1 bg-[#1a1a1a] text-white flex items-center px-8">
                                <span class="text-[4em] font-bold uppercase mr-6">${STATES.match.participants[0]?.contingent}</span>
                                <span class="text-[4em] font-bold uppercase">${STATES.match.participants[0]?.name}</span>
                            </div>

                        </div>
                        <div class="flex w-full h-[45%]">
                            <div class="w-full bg-[#e5e5e5] flex items-center justify-around px-2 border-t border-gray-300">
                                ${[1, 2, 3, 4, 5].map(i => {
    const score0 = parseFloat(STATES.match.participants[0]?.[`g${i}`]) || 0;
    const score1 = parseFloat(STATES.match.participants[1]?.[`g${i}`]) || 0;
    const showRedFlag = score0 > score1 && score0 > 0;
    return `
                                    <div class="relative flex items-center justify-center h-full w-full border-r border-gray-300 last:border-r-0">
                                        <span class="text-[4.5em] font-bold text-[#1a1a1a] font-mono tracking-tighter">${STATES.match.participants[0][`g${i}`] || "-"}</span>
                                        ${!STATES.match.participants[0][`c${i}`] && STATES.match.participants[0][`g${i}`] ? `
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <div class="w-[80%] h-[6px] bg-black"></div>
                                            </div>
                                        ` : ''}
                                        ${showRedFlag ? `
                                            <div class="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[4.5em] h-[2.5em]">
                                                <div class="w-full h-[4px] bg-red-600 absolute"></div>
                                                <i class='bx bxs-circle text-red-600 text-[2.5em] absolute z-10'></i>
                                            </div>
                                        ` : ''}
                                    </div>
                                `}).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="w-[15%] h-full bg-[#d32f2f] text-white flex items-center justify-center text-[5em] font-bold tracking-widest border-l border-gray-800">
                        AKA
                    </div>
                </div>
                ` : ''}

                <!-- Blue Row -->
                ${showP2 ? `
                <div class="flex w-full ${showP1 ? 'h-[50%]' : 'h-full'} border-b-[2px] border-yellow-500 shadow-md">
                    <div class="flex flex-col w-[85%] h-full">
                        <div class="flex w-full h-[55%]">
                            <div class="flex-1 bg-[#1a1a1a] text-white flex items-center px-8">
                                <span class="text-[4em] font-bold uppercase mr-6">${STATES.match.participants[1]?.contingent}</span>
                                <span class="text-[4em] font-bold uppercase">${STATES.match.participants[1]?.name}</span>
                            </div>

                        </div>
                        <div class="flex w-full h-[45%]">
                            <div class="w-full bg-[#e5e5e5] flex items-center justify-around px-2 border-t border-gray-300">
                                ${[1, 2, 3, 4, 5].map(i => {
      const score0 = parseFloat(STATES.match.participants[0]?.[`g${i}`]) || 0;
      const score1 = parseFloat(STATES.match.participants[1]?.[`g${i}`]) || 0;
      const showBlueFlag = score1 > score0 && score1 > 0;
      return `
                                    <div class="relative flex items-center justify-center h-full w-full border-r border-gray-300 last:border-r-0">
                                        <span class="text-[4.5em] font-bold text-[#1a1a1a] font-mono tracking-tighter">${STATES.match.participants[1][`g${i}`] || "-"}</span>
                                        ${!STATES.match.participants[1][`c${i}`] && STATES.match.participants[1][`g${i}`] ? `
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <div class="w-[80%] h-[6px] bg-black"></div>
                                            </div>
                                        ` : ''}
                                        ${showBlueFlag ? `
                                            <div class="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[4.5em] h-[2.5em]">
                                                <div class="w-full h-[4px] bg-blue-600 absolute"></div>
                                                <i class='bx bxs-circle text-blue-600 text-[2.5em] absolute z-10'></i>
                                            </div>
                                        ` : ''}
                                    </div>
                                `}).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="w-[15%] h-full bg-[#1976d2] text-white flex items-center justify-center text-[5em] font-bold tracking-widest border-l border-gray-800">
                        AO
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="scoreboard-bottom flex h-[30%] relative justify-between items-center bg-gray-900 px-16 mt-auto">
            <div class="flex flex-col max-w-[40em]">
                <p class="text-yellow-400 text-[5em] font-bold">${STATES.match.tatami}</p>
                <p class="text-[2.2em] text-white">${STATES.match.category}</p>
            </div>
            <span id="timer" class="tabular-nums text-[12em] ${STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"}">${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}.${Math.floor((STATES.match.time % 1) * 10)}</span>
        </div>
    `;
};

// Services

const serviceOnLoad = async () => {
  const match = await localStorage.getItem("stage_kata_bendera2");
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
  if (e.key == "stage_kata_bendera2") {
    if (e.newValue === null) {
      location.reload();
      return;
    }

    STATES.match = JSON.parse(e.newValue);

    if (!STATES.match.play && intervalId == null) renderContent();
    if (STATES.match?.rest == true) {
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
        STATES.match.time = Math.max(STATES.match.time - 0.01, 0);
        if (timer) {
          timer.innerText = `${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}.${Math.floor((STATES.match.time % 1) * 10)}`;
          if (STATES.match.time <= 0) timer.style.color = "white";
          else if (STATES.match.time <= 16.00) timer.style.color = "#FF0000";
          else if (STATES.match.time < 60) timer.style.color = "yellow";
          else timer.style.color = "white";
        }
        // if (STATES.match.time <= 16.10 && STATES.longBell == false) {
        //     STATES.longBell = true
        //     document.getElementById('short-bell').play()
        // }
        if (STATES.match.time > 16.10) STATES.longBell = false;
        if (STATES.match.time == 0) {
          document.getElementById("long-bell").play();
          clearInterval(intervalId);
          STATES.match.play = false;
          intervalId = null;
        }
      }, 10);
    }
  }

  if (e.key == "confetti_kata_bendera2") {
    const confetti = e.newValue.split("-");
    if (confetti?.length > 0) {
      const container = document.getElementById(`confetti`);
      let content = "";

      switch (confetti[0]) {
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

      setTimeout(() => {
        document.getElementById("confetti").classList.remove("show");
        document.getElementById("confetti").classList.add("hide");
      }, 2000);
    }
  }
};

window.addEventListener("load", serviceOnLoad);
window.addEventListener("unload", serviceOnUnload);
window.addEventListener("storage", serviceOnLocalStorageChange);
window.addEventListener("storage", serviceOnLocalStorageChange);


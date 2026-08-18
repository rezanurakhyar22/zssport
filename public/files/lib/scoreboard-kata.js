const STATES = {
  match: {},
};

let intervalId = null;
let isTimerVisible = false;

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

  const showP1 = !(STATES.match?.is_final && STATES.match.active_player == 1);
  const showP2 = !(STATES.match?.is_final && STATES.match.active_player == 0);

  document.getElementById("content").innerHTML = `

        ${showP1
      ? `
                <div class="scoreboard-row flex h-[${STATES.match?.is_final ? "70%" : "35%"}] justify-between bg-gradient-to-r from-red-500 to-black p-4">
                    <div class="flex flex-1 flex-col px-8 pb-8 ${STATES.match?.is_final ? "justify-center" : "justify-between"}">
                        <div class="flex flex-col ${STATES.match?.is_final ? "items-center justify-center" : ""}">
                            <h1 class="scoreboard-title text-[5.5em] shrink-0 line-clamp-1 m-0 p-0">${STATES.match.participants[0]?.name}</h1>
                            ${STATES.match?.is_final && isTimerVisible ? `
                                <div id="timer" class="flex items-start text-[16em] font-bold ${STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"} leading-none mt-2 tabular-nums">
                                    <span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span>
                                    <span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>
                                </div>
                            ` : `
                                <p class="scoreboard-subtitle text-[3.5em]">${STATES.match.participants[0]?.contingent}</p>
                                ${STATES.match.kata_name ? `<p class="scoreboard-subtitle text-[2.5em] text-yellow-400 mt-2 uppercase">${STATES.match.kata_name}</p>` : ''}
                            `}
                        </div>
                        ${!STATES.match?.is_final
        ? `
                                <div class="flex space-x-[10em] mt-4 px-4">
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g1}</span>
                                        ${!STATES.match.participants[0]?.c1
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g2}</span>
                                        ${!STATES.match.participants[0]?.c2
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g3}</span>
                                        ${!STATES.match.participants[0]?.c3
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g4}</span>
                                        ${!STATES.match.participants[0]?.c4
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[0]?.g5}</span>
                                        ${!STATES.match.participants[0]?.c5
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
                            <div class="flex flex-col justify-center items-center">
                                <div class="relative">
                                    <h1 id="0-point" class="scoreboard-point text-[16em] font-bold text-red-500 mx-10">${STATES.match.participants[0]?.point}</h1>
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
                <div class="scoreboard-row flex h-[${STATES.match?.is_final ? "70%" : "35%"}] justify-between bg-gradient-to-r from-blue-500 to-black p-4">
                    <div class="flex flex-1 flex-col px-8 pb-8 ${STATES.match?.is_final ? "justify-center items-center" : "justify-between"}">
                        <div class="flex flex-col ${STATES.match?.is_final ? "items-center justify-center" : ""}">
                            <h1 class="scoreboard-title text-[5.5em] shrink-0 line-clamp-1 m-0 p-0">${STATES.match.participants[1]?.name}</h1>
                            ${STATES.match?.is_final && isTimerVisible ? `
                                <div id="timer" class="flex items-start text-[16em] font-bold ${STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"} leading-none mt-2 tabular-nums">
                                    <span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span>
                                    <span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>
                                </div>
                            ` : `
                                <p class="scoreboard-subtitle text-[3.5em]">${STATES.match.participants[1]?.contingent}</p>
                                ${STATES.match.kata_name ? `<p class="scoreboard-subtitle text-[2.5em] text-yellow-400 mt-2 uppercase">${STATES.match.kata_name}</p>` : ''}
                            `}
                        </div>
                       ${!STATES.match?.is_final
        ? `
                                <div class="flex space-x-[10em] mt-4 px-4">
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g1}</span>
                                        ${!STATES.match.participants[1]?.c1
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g2}</span>
                                        ${!STATES.match.participants[1]?.c2
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g3}</span>
                                        ${!STATES.match.participants[1]?.c3
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g4}</span>
                                        ${!STATES.match.participants[1]?.c4
          ? `
                                                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <i class="bx bx-minus text-5xl"></i>
                                                </div>                            
                                            `
          : ""
        }
                                    </div>
                                    <div class="flex relative">
                                        <span class="text-[3.2em] font-semibold text-yellow-400">${STATES.match.participants[1]?.g5}</span>
                                        ${!STATES.match.participants[1]?.c5
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
                            <div class="flex flex-col justify-center items-center">
                                <div class="relative">
                                    <h1 id="1-point" class="scoreboard-point text-[16em] font-bold text-blue-500 mx-10">${STATES.match.participants[1]?.point}</h1>
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
            ${(!STATES.match?.is_final && isTimerVisible) ? `
            <div id="timer" class="flex items-start text-[12em] ${STATES.match.time <= 0 ? "text-white" : STATES.match.time <= 16.00 ? "text-[#FF0000]" : STATES.match.time < 60 ? "text-yellow-500" : "text-white"} leading-none tabular-nums">
                <span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span>
                <span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>
            </div>
            ` : ''}
            <div class="absolute right-16 flex items-center">
                <div class="w-[20em] h-[20em] bg-contain bg-center bg-no-repeat mx-auto" style="background-image: url('/icons/logo.png');"></div>
            </div>
        </div>
    `;
};

// Services

const serviceOnLoad = async () => {
  const match = await localStorage.getItem("stage_kata");
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
  if (e.key == "stage_kata") {
    if (e.newValue === null) {
      location.reload();
      return;
    }

    STATES.match = JSON.parse(e.newValue);

    if (STATES.match.play) {
      isTimerVisible = true;
    }
    if (STATES.match.time <= 0) {
      isTimerVisible = false;
    }

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
      renderContent();
      intervalId = setInterval(() => {
        const timer = document.getElementById("timer");
        STATES.match.time = Math.max(STATES.match.time - 0.01, 0);
        if (timer) {
          timer.innerHTML = `<span>${Math.floor(STATES.match.time / 60)}:${`0${Math.floor(STATES.match.time % 60)}`.slice(-2)}</span><span class="text-[0.4em] mt-2 ml-1 relative -top-4">${Math.floor((STATES.match.time % 1) * 10)}</span>`;
          if (STATES.match.time <= 0) timer.style.color = "white";
          else if (STATES.match.time <= 16.00) timer.style.color = "#FF0000";
          else if (STATES.match.time < 60) timer.style.color = "yellow";
          else timer.style.color = "white";
        }
        if (STATES.match.time <= 16.10 && STATES.longBell == false) {
          STATES.longBell = true;
          document.getElementById('short-bell').play();
        }
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

  if (e.key == "confetti_kata") {
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

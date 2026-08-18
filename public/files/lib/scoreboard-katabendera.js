const STATES = {
  match: {},
};

// Handlers

const handlerFade = (i) => {
  let cls = "";

  if (
    STATES.match.participants[0] != null &&
    STATES.match.participants[1] != null
  ) {
    if (
      STATES.match.participants[0].point > STATES.match.participants[1].point &&
      i == 0
    )
      cls = "fade";
    if (
      STATES.match.participants[1].point > STATES.match.participants[0].point &&
      i == 1
    )
      cls = "fade";
  }

  return cls;
};

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
    
        ${STATES.match.participants[0] != null
      ? `
                <div class="scoreboard-row flex h-[${STATES.match.participants[1] == null ? "70%" : "35%"}] justify-between bg-gradient-to-r from-red-500 to-black p-4">
                    <div class="flex flex-1 flex-col px-8 pb-8 justify-between">
                        <div class="flex flex-1 flex-col justify-center">
                            <h1 class="scoreboard-title text-[5.5em] line-clamp-1 m-0 p-0">${STATES.match.participants[0]?.name}</h1>
                            <p class="scoreboard-subtitle text-[3.5em]">${STATES.match.participants[0]?.contingent}</p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <div class="relative">
                            <h1 id="0-point" class="scoreboard-point ${handlerFade(0)} font-bold text-red-500 mx-10" style="font-size: 20em !important; line-height: 1 !important;">${STATES.match.participants[0]?.point}</h1>
                        </div>
                    </div>
                </div>
            `
      : ""
    }

        ${STATES.match.participants[1] != null
      ? `
                <div class="scoreboard-row flex h-[${STATES.match.participants[0] == null ? "70%" : "35%"}] justify-between bg-gradient-to-r from-blue-500 to-black p-4">
                    <div class="flex flex-1 flex-col px-8 pb-8 justify-between">
                        <div class="flex flex-1 flex-col justify-center">
                            <h1 class="scoreboard-title text-[5.5em] line-clamp-1 m-0 p-0">${STATES.match.participants[1]?.name}</h1>
                            <p class="scoreboard-subtitle text-[3.5em]">${STATES.match.participants[1]?.contingent}</p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <div class="relative">
                            <h1 id="1-point" class="scoreboard-point ${handlerFade(1)} font-bold text-blue-500 mx-10" style="font-size: 20em !important; line-height: 1 !important;">${STATES.match.participants[1]?.point}</h1>
                        </div>
                    </div>
                </div>
            `
      : ""
    }

        <div class="scoreboard-bottom flex h-[30%] relative justify-between items-center bg-gray-900 px-16">
            <div class="w-[22em] h-[22em] bg-contain bg-center bg-no-repeat drop-shadow-md" style="background-image: url('/icons/logo.png');"></div>
            <div class="flex flex-col max-w-[40em] items-end text-right">
                <p class="text-yellow-400 text-[5em] font-bold">${STATES.match.tatami}</p>
                <p class="text-[2.2em] text-white">${STATES.match.category}</p>
            </div>
        </div>
    `;
};

// Services

const serviceOnLoad = async () => {
  const match = await localStorage.getItem("stage_kata_bendera");
  if (!match) {
    renderContent();
    return;
  }

  STATES.match = JSON.parse(match);
  renderContent();
};

const serviceOnUnload = () => { };

const serviceOnLocalStorageChange = (e) => {
  if (e.key == "stage_kata_bendera") {
    if (e.newValue === null) {
      location.reload();
      return;
    }

    STATES.match = JSON.parse(e.newValue);
    renderContent();
  }

  if (e.key == "confetti_kata_bendera") {
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

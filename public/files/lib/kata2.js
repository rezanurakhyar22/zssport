const STATES = {
    event: {},
    categories: [],
    matches: [],
    filteredMatches: [],
    participants: [],
    sortOrder: [true, true],
    category: '',
    currentPage: 1,
    stageKata2: null
}

const socket = io()
let timeId = null

// Handlers

const handlerGetAllParticipants = async () => {

    const res = await fetch(`/api/participant/event/${STATES.event.id}`)
    const data = await res?.json()

    if (data?.statusCode == 200) {
        STATES.participants = data.data?.participants
        STATES.categories = [...new Set(data?.data?.participants?.filter(d => d?.category?.includes("KATA")).map(d => d?.category))];
    }
}

const handlerGetAllMatches = async () => {

    const res = await fetch(`/api/match/${STATES.event.id}/${encodeURIComponent(STATES.category)}`)
    const data = await res?.json()

    if (data?.statusCode == 200) {
        const filtered = data.data?.filter(d => d?.match_type == "KATA" || d?.match_type == "KATA REGU")
        STATES.matches = filtered
        STATES.filteredMatches = filtered
        handlerRenderTable()
    }
}

const handlerCloseModal = (add) => {

    const category = document.getElementById("category");
    const participant1 = document.getElementById("participant-1");
    const participant2 = document.getElementById("participant-2");
    const isFinal = document.getElementById("is-final");
    const tatami = document.getElementById("tatami");
    const modal = document.getElementById("modal");

    const isFinalChecked = isFinal ? isFinal.checked : false;

    if (add) {
        if (category.value == '' || participant1.value == '' || participant2.value == '' || tatami.value == '') {
            alert('Data belum lengkap!');
            return
        }
    }

    modal.innerHTML = "";
    modal.classList.add("hidden");

    if (add) {

        const stageKata2 = {
            id: Math.floor(Math.random() * 1000000),
            match_id: Math.random().toString(36).substring(2, 6).toUpperCase(),
            event_id: STATES.event.id,
            category: category.value,
            participants: [],
            tatami: tatami.value,
            time: 0,
            play: false,
            rest: false,
            is_final: isFinalChecked,
            active_player: 0,
            is5MinTimer: false
        }

        if (participant1.value?.split('|')?.[0]) {
            stageKata2.participants.push({
                ...STATES.participants.find(participant => participant?.id == participant1.value?.split('|')[0]),
                g1: 0,
                g2: 0,
                g3: 0,
                g4: 0,
                g5: 0,
                c1: true,
                c2: true,
                c3: true,
                c4: true,
                c5: true,
                point: 0,
            })
        } else stageKata2.participants.push(null)

        if (participant2.value?.split('|')?.[0]) {
            stageKata2.participants.push({
                ...STATES.participants.find(participant => participant?.id == participant2.value?.split('|')[0]),
                g1: 0,
                g2: 0,
                g3: 0,
                g4: 0,
                g5: 0,
                c1: true,
                c2: true,
                c3: true,
                c4: true,
                c5: true,
                point: 0,
            })
        } else stageKata2.participants.push(null)

        localStorage.setItem("stage_kata_2", JSON.stringify(stageKata2))
        STATES.stageKata2 = stageKata2
        document.getElementById("match-handler").classList.remove("hidden");
        if (document.getElementById("kata-name")) {
            document.getElementById("kata-name").value = "";
        }
        document.getElementById("title").innerText = `${stageKata2?.match_id} | ${stageKata2?.tatami} | ${stageKata2?.category?.toUpperCase()}`
        document.getElementById("main-content").classList.add("hidden");
        document.getElementById("match-content").classList.remove("hidden");
        handlerRenderMatch()
        window.open('/scoreboard/kata2', '_blank');
    }

}

const handlerDeleteStageMatch = () => {

    let conf = confirm("Apakah anda yakin untuk tidak menyimpan pertandingan ini?")

    if (conf) {
        localStorage.removeItem("stage_kata_2")
        STATES.stageKata2 = null
        document.getElementById("match-handler").classList.add("hidden");
        document.getElementById("title").innerText = `KATA | EVENT ${STATES.event?.name?.toUpperCase()}`
        document.getElementById("main-content").classList.remove("hidden");
        document.getElementById("match-content").classList.add("hidden");
        handlerRenderTable()
    }
}


const handlerSetParticipantKataName = (index, value) => {
    if (STATES.stageKata2 != null && STATES.stageKata2.participants[index]) {
        STATES.stageKata2.participants[index].kata_name = value;
        STATES.stageKata2.id = Math.floor(Math.random() * 1000000);
        localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2));
    }
}


const handlerSetKataName = () => {
    if (STATES.stageKata2 != null) {
        STATES.stageKata2.kata_name = document.getElementById("kata-name").value;
        STATES.stageKata2.id = Math.floor(Math.random() * 1000000);
        localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2));
    }
}

const handlerFilterKata = () => {
    const val = document.getElementById("kata-name").value.toLowerCase();
    const items = document.querySelectorAll("#kata-dropdown li");
    items.forEach(item => {
        if (item.innerText.toLowerCase().includes(val)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
    handlerSetKataName();
}

const handlerSelectKataOption = (name) => {
    document.getElementById("kata-name").value = name;
    handlerSetKataName();
    const dropdown = document.getElementById("kata-dropdown");
    if (dropdown) dropdown.classList.add("hidden");
}

const handlerMatchControl = (i, type) => {

    if (type == 'play' && STATES.stageKata2.time != 0) {
        STATES.stageKata2.play = !STATES.stageKata2?.play

        if (STATES.stageKata2.play) {
            STATES.stageKata2.timerStarted = true;
            timeId = setInterval(() => {
                STATES.stageKata2.time = Math.max(STATES.stageKata2.time - .01, 0)
                document.getElementById("timer").textContent = `${Math.floor(STATES.stageKata2.time / 60)}:${`0${Math.floor(STATES.stageKata2.time % 60)}`.slice(-2)}.${Math.floor((STATES.stageKata2.time % 1) * 10)}`
                if (STATES.stageKata2.time == 0) STATES.stageKata2.play = false
                if (STATES.stageKata2.time <= 16.10 && !STATES.shortBellPlayed && !STATES.stageKata2.is5MinTimer) {
                    STATES.shortBellPlayed = true;
                    if (document.getElementById('short-bell')) document.getElementById('short-bell').play();
                }
                if (STATES.stageKata2.time > 16.10) STATES.shortBellPlayed = false;
                STATES.stageKata2.id = Math.floor(Math.random() * 1000000)
                STATES.stageKata2.rest = false
                localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2))
                if (STATES.stageKata2.time == 0) {
                    clearInterval(timeId)
                    timeId = null
                    handlerRenderMatch()
                    if (document.getElementById("long-bell") && !STATES.stageKata2.isSilentTimer) document.getElementById("long-bell").play()
                }
            }, 10);
        } else {
            clearInterval(timeId)
            timeId = null
        }

        STATES.stageKata2.rest = false
    } else {
        STATES.stageKata2.rest = true
    }

    if (type == 'set') {
        STATES.stageKata2.time = document.getElementById("time").value
        document.getElementById("time").value = 0
        STATES.stageKata2.timerStarted = false;
        STATES.stageKata2.isSilentTimer = false;
        STATES.stageKata2.is5MinTimer = (STATES.stageKata2.time == 300);
    }
    if (type == '-1s') STATES.stageKata2.time = Math.max(STATES.stageKata2.time - 1, 0)
    if (type == '-30s') STATES.stageKata2.time = Math.max(STATES.stageKata2.time - 30, 0)
    if (type == '-60s') STATES.stageKata2.time = Math.max(STATES.stageKata2.time - 60, 0)
    if (type == '+1s') STATES.stageKata2.time = STATES.stageKata2.time + 1
    if (type == '+30s') STATES.stageKata2.time = STATES.stageKata2.time + 30
    if (type == '+35s') {
        STATES.stageKata2.time = STATES.stageKata2.time + 35
        STATES.stageKata2.isSilentTimer = true;
    }
    if (type == '+60s') STATES.stageKata2.time = STATES.stageKata2.time + 60
    if (type == '+300s') {
        STATES.stageKata2.time = STATES.stageKata2.time + 300
        STATES.stageKata2.isSilentTimer = true;
        STATES.stageKata2.is5MinTimer = true;
    }
    if (type == 'reset') {
        STATES.stageKata2.time = 0
        STATES.stageKata2.play = false
        STATES.stageKata2.timerStarted = false;
        STATES.stageKata2.isSilentTimer = false;
        STATES.stageKata2.is5MinTimer = false;
        clearInterval(timeId)
        timeId = null
    }

    STATES.stageKata2.id = Math.floor(Math.random() * 1000000)
    localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2))

    handlerRenderMatch()
}

const handlerCheckWinner = () => {

    let winner = null

    if (STATES.stageKata2.participants[0].point > STATES.stageKata2.participants[1].point) winner = STATES.stageKata2.participants[0].id
    if (STATES.stageKata2.participants[1].point > STATES.stageKata2.participants[0].point) winner = STATES.stageKata2.participants[1].id

    return winner
}

const handlerSaveMatch = () => {

    if ((document.getElementById("w-1") != undefined && document.getElementById("w-2") != undefined) && (!document.getElementById("w-1").checked && !document.getElementById("w-2").checked)) {
        const conf = confirm("Pemenang belum ditentukan, apakah kamu ingin pemenang di tentukan oleh system ?")
        if (!conf) return
    }

    let con = confirm("Apakah anda yakin untuk menyimpan pertandingan ini?")
    if (!con) return

    const isRegu = !(STATES.stageKata2.participants[0] != null && STATES.stageKata2.participants[1] != null)

    let winner = isRegu ? '' : document.getElementById("w-1").checked ? STATES.stageKata2.participants[0].id : document.getElementById("w-2").checked ? STATES.stageKata2.participants[1].id : handlerCheckWinner()
    let grade1 = '';
    if (STATES.stageKata2.participants[0] != null) {
        let scores1 = [STATES.stageKata2.participants[0].g1, STATES.stageKata2.participants[0].g2, STATES.stageKata2.participants[0].g3, STATES.stageKata2.participants[0].g4, STATES.stageKata2.participants[0].g5].map(v => parseFloat(v) || 0).sort((a, b) => a - b);
        let point1 = scores1[1] + scores1[2] + scores1[3];
        grade1 = `${STATES.stageKata2.participants[0]?.g1}, ${STATES.stageKata2.participants[0]?.g2}, ${STATES.stageKata2.participants[0]?.g3}, ${STATES.stageKata2.participants[0]?.g4}, ${STATES.stageKata2.participants[0]?.g5}, Point ${point1.toFixed(2)}`;
    }

    let grade2 = '';
    if (STATES.stageKata2.participants[1] != null) {
        let scores2 = [STATES.stageKata2.participants[1].g1, STATES.stageKata2.participants[1].g2, STATES.stageKata2.participants[1].g3, STATES.stageKata2.participants[1].g4, STATES.stageKata2.participants[1].g5].map(v => parseFloat(v) || 0).sort((a, b) => a - b);
        let point2 = scores2[1] + scores2[2] + scores2[3];
        grade2 = `${STATES.stageKata2.participants[1]?.g1}, ${STATES.stageKata2.participants[1]?.g2}, ${STATES.stageKata2.participants[1]?.g3}, ${STATES.stageKata2.participants[1]?.g4}, ${STATES.stageKata2.participants[1]?.g5}, Point ${point2.toFixed(2)}`;
    }

    const data = {
        event_id: STATES.event.id,
        category: STATES.stageKata2.category,
        match_type: isRegu ? "KATA REGU" : "KATA",
        winner_id: winner,
        arena: STATES.stageKata2.tatami,
        time: "",
        participants: []
    }

    if (STATES.stageKata2.participants[0] != null) {
        data.participants.push({
            id: STATES.stageKata2.participants[0].id,
            grade: grade1
        })
    }

    if (STATES.stageKata2.participants[1] != null) {
        data.participants.push({
            id: STATES.stageKata2.participants[1].id,
            grade: grade2
        })
    }

    fetch(`/api/match/create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(res => {
            if (res?.statusCode == 200) {
                STATES.stageKata2 = null
                localStorage.removeItem("stage_kata_2")
                localStorage.removeItem("confetti_kata_2")
                window.location.reload()
            }
        })
}

const handlerToggleCheckbox = (n) => {

    if (n == 1) document.getElementById('w-2').checked = false
    if (n == 2) document.getElementById('w-1').checked = false

    if (document.getElementById(`w-1`).checked || document.getElementById(`w-2`).checked) localStorage.setItem("confetti_kata_2", `win-${n == 1 ? 'red' : 'blue'}-${Math.floor(Math.random() * 1000)}`)
}

const handlerTogglePerform = (n) => {

    STATES.stageKata2.active_player = n
    localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2))
    handlerRenderMatch()
}

const handlerMatchControlFlag = (i, type) => {

    let currentPoint = parseFloat(STATES.stageKata2?.participants[i]?.point) || 0;

    if (type == '1b') {
        currentPoint += 1;
    }
    if (type == '2b') {
        currentPoint += 2;
    }
    if (type == '3b') {
        currentPoint += 3;
    }
    if (type == '-1') {
        currentPoint = Math.max(currentPoint - 1, 0);
    }

    STATES.stageKata2.participants[i].point = currentPoint;
    STATES.stageKata2.id = Math.floor(Math.random() * 1000000);
    localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2));

    handlerRenderMatch();
}

const handlerSetPoint = () => {
    STATES.stageKata2?.participants?.forEach((item, i) => {
        if (item != null) {
            let grades = [item.g1, item.g2, item.g3, item.g4, item.g5];
            let allSet = grades.every(v => v !== undefined && v !== "" && v != 0 && v !== 0);

            if (allSet) {
                let indexedGrades = [
                    { val: parseFloat(item.g1) || 0, idx: 1 },
                    { val: parseFloat(item.g2) || 0, idx: 2 },
                    { val: parseFloat(item.g3) || 0, idx: 3 },
                    { val: parseFloat(item.g4) || 0, idx: 4 },
                    { val: parseFloat(item.g5) || 0, idx: 5 }
                ];
                // Sort ascending by value
                indexedGrades.sort((a, b) => a.val - b.val);

                // Reset all to true
                STATES.stageKata2.participants[i].c1 = true;
                STATES.stageKata2.participants[i].c2 = true;
                STATES.stageKata2.participants[i].c3 = true;
                STATES.stageKata2.participants[i].c4 = true;
                STATES.stageKata2.participants[i].c5 = true;

                // Discard min (index 0) and max (index 4)
                STATES.stageKata2.participants[i][`c${indexedGrades[0].idx}`] = false;
                STATES.stageKata2.participants[i][`c${indexedGrades[4].idx}`] = false;

                let sum = indexedGrades[1].val + indexedGrades[2].val + indexedGrades[3].val;
                STATES.stageKata2.participants[i].point = parseFloat(sum).toFixed(2);
            } else {
                STATES.stageKata2.participants[i].point = 0;
                STATES.stageKata2.participants[i].c1 = true;
                STATES.stageKata2.participants[i].c2 = true;
                STATES.stageKata2.participants[i].c3 = true;
                STATES.stageKata2.participants[i].c4 = true;
                STATES.stageKata2.participants[i].c5 = true;
            }
        }
    });

    localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2));
    handlerRenderMatch();
}

const handlerToggleField = (index, jury) => {

    STATES.stageKata2.id = Math.floor(Math.random() * 1000)
    STATES.stageKata2.participants[index][`c${jury}`] = !STATES.stageKata2.participants[index][`c${jury}`]
    localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2))

    handlerSetPoint()
}

const handlerSetGrade = (index, jury) => {
    if (STATES.stageKata2.is_locked || STATES.stageKata2.participants[index]?.is_locked) return;

    const value = document.getElementById(`g-${index}-${jury}`).value

    STATES.stageKata2.id = Math.floor(Math.random() * 1000)
    STATES.stageKata2.participants[index][`g${jury}`] = value
    localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2))

    handlerSetPoint()
}

const handlerToggleLockParticipant = (index) => {
    if (STATES.stageKata2.is_locked) return;

    if (STATES.stageKata2.participants[index]) {
        STATES.stageKata2.participants[index].is_locked = !STATES.stageKata2.participants[index].is_locked;
        STATES.stageKata2.id = Math.floor(Math.random() * 1000);
        localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2));
        handlerRenderMatch();
    }
}

const handlerDisqualify = (index) => {
    if (STATES.stageKata2.is_locked) return;

    if (STATES.stageKata2.participants[index]?.is_locked) {
        STATES.stageKata2.participants[index].is_locked = false;
        for (let i = 1; i <= 5; i++) {
            STATES.stageKata2.participants[index][`g${i}`] = "";
        }
    } else {
        STATES.stageKata2.participants[index].is_locked = true;
        for (let i = 1; i <= 5; i++) {
            STATES.stageKata2.participants[index][`g${i}`] = "0.0";
        }
    }

    STATES.stageKata2.id = Math.floor(Math.random() * 1000);
    localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2));
    handlerSetPoint();
    handlerRenderMatch();
}

const handlerToggleCircleColor = (i, color) => {
    if (!STATES.stageKata2.circleColors) STATES.stageKata2.circleColors = {};
    const current = STATES.stageKata2.circleColors[i] || 'black';

    if (current === color) {
        STATES.stageKata2.circleColors[i] = 'black';
    } else {
        STATES.stageKata2.circleColors[i] = color;
    }

    STATES.stageKata2.id = Math.floor(Math.random() * 1000);
    localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2));
    handlerRenderMatch();
}

const handlerPreviewResult = () => {
    STATES.stageKata2.preview_result = !STATES.stageKata2.preview_result;
    STATES.stageKata2.id = Math.floor(Math.random() * 1000);
    localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2));
    handlerRenderMatch();
}

const handlerToggleLock = () => {
    STATES.stageKata2.is_locked = !STATES.stageKata2.is_locked;
    if (!STATES.stageKata2.is_locked) {
        if (STATES.stageKata2.participants[0]) STATES.stageKata2.participants[0].is_locked = false;
        if (STATES.stageKata2.participants[1]) STATES.stageKata2.participants[1].is_locked = false;
    }
    STATES.stageKata2.id = Math.floor(Math.random() * 1000);
    localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2));
    handlerRenderMatch();
}

const handlerShowResult = () => {
    if (!STATES.stageKata2.show_result) {
        STATES.stageKata2.show_result = true;
        STATES.stageKata2.reveal_result = false;
    } else if (!STATES.stageKata2.reveal_result) {
        STATES.stageKata2.reveal_result = true;
    } else {
        STATES.stageKata2.show_result = false;
        STATES.stageKata2.reveal_result = false;
        STATES.stageKata2.is_closed = false;
    }

    STATES.stageKata2.id = Math.floor(Math.random() * 1000);
    localStorage.setItem('stage_kata_2', JSON.stringify(STATES.stageKata2));
    handlerRenderMatch();
}

// Renders

const handlerRenderMatch = () => {

    document.getElementById("match-content").innerHTML = `
        <div class="flex flex-col gap-0 text-white flex-1 min-h-0 w-10/12 mx-auto">
            ${STATES.stageKata2.participants[0] != null ? `
                <div class="flex flex-col border-4 border-red-600 rounded-lg overflow-hidden">
                    <div class="flex flex-col justify-center items-center py-4 px-6 bg-red-600 relative text-white">
                        ${STATES.stageKata2.is_final ? `
                                <div class="absolute bottom-4 left-4 flex items-center justify-center">
                                    <input id="p-1" type="checkbox" ${STATES.stageKata2.active_player == 0 ? 'checked' : ''} onclick="handlerTogglePerform(0)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">Perform</span>
                                </div>
                            ` : ''
            }
                        ${STATES.stageKata2.participants[1] != null ? `
                                <div class="absolute bottom-4 left-[15%] flex items-center justify-center">
                                    <input id="w-1" type="checkbox" onclick="handlerToggleCheckbox(1)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">🏆</span>
                                </div>
                            ` : ''
            }
                        <div class="flex items-baseline gap-2">
                            <h1 class="text-4xl font-bold line-clamp-1">${STATES.stageKata2?.participants[0]?.name}</h1>
                            <h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[0]?.contingent})</h2>
                        </div>
                        <div class="flex items-center gap-2 mt-2">
                            <input type="text" list="kata-list" value="${STATES.stageKata2?.participants[0]?.kata_name || ''}" onchange="handlerSetParticipantKataName(0, this.value)" class="text-gray-900 px-3 py-1 rounded bg-white w-[16em] text-center focus:outline-none" placeholder="Pilih Kata...">
                            ${!STATES.stageKata2.is_final ? `
                            <div class="flex gap-2 text-black">
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(0, '1b')">1 BENDERA</button>
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(0, '2b')">2 BENDERA</button>
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(0, '3b')">3 BENDERA</button>
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(0, '-1')">Kurangi (-1)</button>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="flex justify-between items-center flex-row flex-nowrap gap-1 bg-red-100 p-1 w-full text-black">
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-0-1" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[0]?.g1 != 0 || STATES.stageKata2.participants[0]?.g1 === '0.0' ? STATES.stageKata2.participants[0]?.g1 : ''}" onchange="handlerSetGrade(0, 1)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J1" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-0-2" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[0]?.g2 != 0 || STATES.stageKata2.participants[0]?.g2 === '0.0' ? STATES.stageKata2.participants[0]?.g2 : ''}" onchange="handlerSetGrade(0, 2)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J2" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-0-3" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[0]?.g3 != 0 || STATES.stageKata2.participants[0]?.g3 === '0.0' ? STATES.stageKata2.participants[0]?.g3 : ''}" onchange="handlerSetGrade(0, 3)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J3" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-0-4" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[0]?.g4 != 0 || STATES.stageKata2.participants[0]?.g4 === '0.0' ? STATES.stageKata2.participants[0]?.g4 : ''}" onchange="handlerSetGrade(0, 4)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J4" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-0-5" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[0]?.g5 != 0 || STATES.stageKata2.participants[0]?.g5 === '0.0' ? STATES.stageKata2.participants[0]?.g5 : ''}" onchange="handlerSetGrade(0, 5)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[0]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J5" />
                        </div>
                        <button onclick="handlerToggleLockParticipant(0)" class="flex items-center justify-center bg-white text-black rounded-md px-2 py-1 hover:bg-gray-100 shadow" title="Kunci/Buka Nilai"><i class='bx ${STATES.stageKata2.participants[0]?.is_locked ? 'bxs-lock text-red-600' : 'bxs-lock-open text-green-600'} text-xl'></i></button>
                        <button onclick="handlerDisqualify(0)" class="flex items-center justify-center bg-white text-black rounded-md px-2 py-1 hover:bg-gray-100 shadow" title="Diskualifikasi (Nilai 0.0)">🚫</button>
                    </div>

                </div>
            ` : ''}

            ${STATES.stageKata2.participants[1] != null ? `
                <div class="flex flex-col border-4 border-blue-600 rounded-lg overflow-hidden">
                    <div class="flex flex-col justify-center items-center py-4 px-6 bg-blue-600 relative text-white">
                        ${STATES.stageKata2.is_final ? `
                                <div class="absolute bottom-4 left-4 flex items-center justify-center">
                                    <input id="p-2" type="checkbox" ${STATES.stageKata2.active_player == 1 ? 'checked' : ''} onclick="handlerTogglePerform(1)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">Perform</span>
                                </div>
                            ` : ''
            }
                        ${STATES.stageKata2.participants[0] != null ? `
                                <div class="absolute bottom-4 left-[15%] flex items-center justify-center">
                                    <input id="w-2" type="checkbox" onclick="handlerToggleCheckbox(2)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">🏆</span>
                                </div>
                            ` : ''
            }
                        <div class="flex items-baseline gap-2">
                            <h1 class="text-4xl font-bold line-clamp-1">${STATES.stageKata2?.participants[1]?.name}</h1>
                            <h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[1]?.contingent})</h2>
                        </div>
                        <div class="flex items-center gap-2 mt-2">
                            <input type="text" list="kata-list" value="${STATES.stageKata2?.participants[1]?.kata_name || ''}" onchange="handlerSetParticipantKataName(1, this.value)" class="text-gray-900 px-3 py-1 rounded bg-white w-[16em] text-center focus:outline-none" placeholder="Pilih Kata...">
                            ${!STATES.stageKata2.is_final ? `
                            <div class="flex gap-2 text-black">
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(1, '1b')">1 BENDERA</button>
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(1, '2b')">2 BENDERA</button>
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(1, '3b')">3 BENDERA</button>
                                <button class="py-1 px-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm shadow" onclick="handlerMatchControlFlag(1, '-1')">Kurangi (-1)</button>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="flex justify-between items-center flex-row flex-nowrap gap-1 bg-blue-100 p-1 w-full text-black">
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-1-1" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[1]?.g1 != 0 || STATES.stageKata2.participants[1]?.g1 === '0.0' ? STATES.stageKata2.participants[1]?.g1 : ''}" onchange="handlerSetGrade(1, 1)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J1" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-1-2" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[1]?.g2 != 0 || STATES.stageKata2.participants[1]?.g2 === '0.0' ? STATES.stageKata2.participants[1]?.g2 : ''}" onchange="handlerSetGrade(1, 2)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J2" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-1-3" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[1]?.g3 != 0 || STATES.stageKata2.participants[1]?.g3 === '0.0' ? STATES.stageKata2.participants[1]?.g3 : ''}" onchange="handlerSetGrade(1, 3)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J3" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-1-4" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[1]?.g4 != 0 || STATES.stageKata2.participants[1]?.g4 === '0.0' ? STATES.stageKata2.participants[1]?.g4 : ''}" onchange="handlerSetGrade(1, 4)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J4" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input id="g-1-5" type="text" ${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'readonly' : ''} value="${STATES.stageKata2.participants[1]?.g5 != 0 || STATES.stageKata2.participants[1]?.g5 === '0.0' ? STATES.stageKata2.participants[1]?.g5 : ''}" onchange="handlerSetGrade(1, 5)" class="${STATES.stageKata2.is_locked || STATES.stageKata2.participants[1]?.is_locked ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f5f5f5]'} w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J5" />
                        </div>
                        <button onclick="handlerToggleLockParticipant(1)" class="flex items-center justify-center bg-white text-black rounded-md px-2 py-1 hover:bg-gray-100 shadow" title="Kunci/Buka Nilai"><i class='bx ${STATES.stageKata2.participants[1]?.is_locked ? 'bxs-lock text-red-600' : 'bxs-lock-open text-green-600'} text-xl'></i></button>
                        <button onclick="handlerDisqualify(1)" class="flex items-center justify-center bg-white text-black rounded-md px-2 py-1 hover:bg-gray-100 shadow" title="Diskualifikasi (Nilai 0.0)">🚫</button>
                    </div>

                </div>
            ` : ''}

        </div> <!-- Close grid -->

        ${STATES.stageKata2.participants[0] != null && STATES.stageKata2.participants[1] != null ? `
        <div class="flex justify-center w-full -mt-4 relative z-10 gap-4">
            <button class="${STATES.stageKata2.preview_result ? 'bg-gray-500 hover:bg-gray-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white font-bold py-2 px-6 rounded shadow-md" onclick="handlerPreviewResult()">${STATES.stageKata2.preview_result ? 'TUTUP PREVIEW' : 'PREVIEW'}</button>
            <div class="flex gap-2">
                <button class="${STATES.stageKata2.show_result && STATES.stageKata2.reveal_result ? 'bg-red-500 hover:bg-red-600' : (STATES.stageKata2.show_result ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600')} text-white font-bold py-2 px-6 rounded shadow-md" onclick="handlerShowResult()">
                    ${STATES.stageKata2.show_result && STATES.stageKata2.reveal_result ? 'TUTUP HASIL' : (STATES.stageKata2.show_result ? 'TAMPILKAN HASIL' : 'HASIL')}
                </button>
            </div>
            
            <label class="absolute right-[8.333%] top-1/2 transform -translate-y-1/2 flex items-center bg-white px-3 py-1 rounded shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                <input type="checkbox" class="mr-2 cursor-pointer w-4 h-4" ${STATES.stageKata2.is_locked ? 'checked' : ''} onchange="handlerToggleLock()">
                <i class='bx ${STATES.stageKata2.is_locked ? 'bxs-lock text-red-600' : 'bxs-lock-open text-green-600'} text-xl'></i>
            </label>
        </div>
        <div class="flex w-10/12 mx-auto bg-[#01091a] border-[2px] border-[#1e3a8a] -mt-4 rounded overflow-hidden">
            ${[1, 2, 3, 4, 5].map(i => {
                const manualColor = STATES.stageKata2.circleColors?.[i];
                let color = manualColor || 'black';

                if (STATES.stageKata2.preview_result && (!manualColor || manualColor === 'black')) {
                    const rs = parseFloat(STATES.stageKata2.participants[0]?.[`g${i}`] || 0);
                    const bs = parseFloat(STATES.stageKata2.participants[1]?.[`g${i}`] || 0);
                    if (rs > bs) color = 'red';
                    else if (bs > rs) color = 'blue';
                }

                const circleColorClass = color === 'red' ? 'bg-red-600 shadow-md text-white' : color === 'blue' ? 'bg-blue-600 shadow-md text-white' : 'bg-transparent text-gray-500';
                return `
                    <div class="flex-1 flex flex-col border-r-[2px] border-[#1e3a8a] last:border-r-0">
                        <div class="flex w-full">
                            <div onclick="handlerToggleCircleColor(${i}, 'red')" class="flex-1 text-center font-bold text-white py-1 bg-red-600 text-lg cursor-pointer hover:opacity-80 transition-opacity">AKA</div>
                            <div onclick="handlerToggleCircleColor(${i}, 'blue')" class="flex-1 text-center font-bold text-white py-1 bg-blue-600 text-lg cursor-pointer hover:opacity-80 transition-opacity">AO</div>
                        </div>
                        <div class="flex w-full h-[5em] justify-center items-center bg-[#f4f4f4] p-2">
                            <div class="w-10 h-10 rounded-full ${circleColorClass} transition-colors duration-200 flex justify-center items-center font-bold text-sm">J${i}</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        ` : ''}
    
        <div class="flex flex-col justify-center items-center bg-gray-300 p-2 rounded-lg -mt-4 relative z-0 w-10/12 mx-auto">
            <div class="flex gap-4 mb-2">
                <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, '-60s')">-60s</button>
                <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, '-30s')">-30s</button>
                <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, '-1s')">-1s</button>
                <div id="timer" class="text-6xl font-bold mx-4 text-center" style="width: 280px; flex-shrink: 0;">${Math.floor(STATES.stageKata2.time / 60)}:${`0${Math.floor(STATES.stageKata2.time % 60)}`.slice(-2)}.${Math.floor((STATES.stageKata2.time % 1) * 10)}</div>
                <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, '+1s')">+1s</button>
                <div class="relative flex">
                    <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, '+30s')">+30s</button>
                    <button class="absolute top-[120%] left-0 w-full h-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md" onclick="handlerMatchControl(0, '+35s')">+35s</button>
                </div>
                <div class="relative flex">
                    <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, '+60s')">+60s</button>
                    <button class="absolute top-[120%] left-0 w-full h-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-md" onclick="handlerMatchControl(0, '+300s')">+5m</button>
                </div>
            </div>
            <div class="flex gap-4">
                <input id="time" type="number" class="text-gray-500 pl-3 bg-white border border-[.1px] border-[#dddddd] p-2 rounded min-w-[6em] shadow-md focus:outline-none" placeholder="Set Waktu (detik)">
                <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, 'set')">Set</button>
                <button class="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500" onclick="handlerMatchControl(0, 'reset')">Reset</button>
            </div>
            <button class="py-2 px-6 ${STATES.stageKata2.play ? "bg-red-600 text-white" : "bg-green-600 text-white"} text-white rounded-lg ${STATES.stageKata2.time > 0 ? STATES.stageKata2.play ? "hover:bg-red-500" : "hover:bg-green-500" : 'opacity-50'} flex items-center mt-2" onclick="handlerMatchControl(0, 'play')">
                ${STATES.stageKata2.play ? "<i class='bx bx-stop text-5xl'></i>" : "<i class='bx bx-play text-5xl'></i>"
        }
            </button>
        </div>
    `

    document.getElementById("match-content").classList.remove("hidden");
}

const handlerRenderFormModal = () => {

    const modal = document.getElementById("modal");
    const category = document.getElementById("category");

    let participants = '';

    STATES.participants.forEach(participant => {

        if (participant?.category == category.value) {
            participants += `
                <option value="${participant?.id} | ${participant?.name}">${participant?.id} | ${participant?.name}</option>
            `;
        }
    });

    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg w-[30em]">
            <h2 class="text-[1.5em] font-bold text-gray mb-4">Buat Pertandingan Kata</h2>
            <select id="tatami" class="text-gray-500 bg-white border border-[.1px] border-[#dddddd] p-2 rounded shadow-md focus:outline-none w-full mb-3">
                <option value="" disabled selected>Pilih Tatami ...</option>
                <option value="TATAMI 1" >TATAMI 1</option>
                <option value="TATAMI 2" >TATAMI 2</option>
                <option value="TATAMI 3" >TATAMI 3</option>
                <option value="TATAMI 4" >TATAMI 4</option>
                <option value="TATAMI 5" >TATAMI 5</option>
                <option value="TATAMI 6" >TATAMI 6</option>
                <option value="TATAMI 7" >TATAMI 7</option>
                <option value="TATAMI 8" >TATAMI 8</option>
                <option value="TATAMI 9" >TATAMI 9</option>
                <option value="TATAMI 10" >TATAMI 10</option>
            </select>
            <input list="participant-1-list" id="participant-1" type="text" autocomplete="off" placeholder="Pilih Peserta Merah..." class="text-gray-500 bg-white border border-[.1px] border-[#dddddd] p-2 rounded shadow-md focus:outline-none w-full mb-3">
            <datalist id="participant-1-list">
                ${participants}
            </datalist>
            <input list="participant-2-list" id="participant-2" type="text" autocomplete="off" placeholder="Pilih Peserta Biru..." class="text-gray-500 bg-white border border-[.1px] border-[#dddddd] p-2 rounded shadow-md focus:outline-none w-full mb-3">
            <datalist id="participant-2-list">
                ${participants}
            </datalist>
            <div class="flex items-center justify-end mb-6">
                <label for="is-final" class="text-blue-500 mr-2">Satu per satu ? </label>
                <input id="is-final" type="checkbox" class="mr-2 w-4 h-4">
            </div>
            <div class="flex justify-end gap-2">
                <button class="bg-green-500 px-4 py-2 rounded shadow-md text-white" onclick="handlerCloseModal(true)">Lanjut</button>
                <button class="bg-red-500 px-4 py-2 rounded shadow-md text-white" onclick="handlerCloseModal()">Batal</button>
            </div>
        </div>
    `

    modal.classList.remove("hidden");
}

const handlerRenderPagination = () => {

    const pagination = document.getElementById("pagination");
    let rowsPerPage = parseInt(document.getElementById("perPage").value) || 5;
    pagination.innerHTML = "";
    const totalPages = Math.ceil(STATES.filteredMatches.length / rowsPerPage);

    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            let button = document.createElement("button");
            button.innerText = i;
            button.classList = `border border-[.1px] border-[#dddddd] px-3 py-1 rounded shadow ${i === STATES.currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`;
            button.onclick = () => { STATES.currentPage = i; handlerRenderTable(); };
            pagination.appendChild(button);
        }
    }
}

const handlerRenderCategory = () => {

    const category = document.getElementById("category-container");
    let options = '';

    STATES.categories.forEach(d => {
        options += `<option value="${d}">${d}</option>`;
    })

    category.innerHTML = `
        <input value="${STATES.category}" list="categories" type="text" autocomplete="off" id="category" placeholder="Pilih Kategori..." class="text-gray-500 bg-white border border-[.1px] border-[#dddddd] p-2 rounded shadow-md focus:outline-none mr-4 min-w-75" onchange="handlerFilterTable('category')">
        <datalist id="categories">
            ${options}
        </datalist>
    `;
}

const handlerRenderTable = () => {

    if (STATES.stageKata2 != null) return

    let i = 0;
    let rowsPerPage = parseInt(document.getElementById("perPage").value) || 5;
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    if (STATES.currentPage > Math.ceil(STATES.filteredMatches.length / rowsPerPage)) {
        STATES.currentPage = Math.ceil(STATES.filteredMatches.length / rowsPerPage);
    }

    const start = (STATES.currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = STATES.filteredMatches.slice(start, end);

    pageData.forEach(row => {
        i = i + 1
        const tr = `
            <tr class="bg-opacity-20 hover:bg-gray-200 transition duration-300 cursor-pointer" >
                <td class="pl-4 bg-white">
                    <p>${i}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col items-start justify-start">
                        <p>${row?.arena ? `(${row?.match_type}) ${row?.arena}` : "-"}</p>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col items-start justify-start">
                        <p>${row?.category || "-"}</p>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col items-start justify-start">
                        <div class="flex flex-col items-start justify-start"></div>
                            <p class="text-xs font-regular ${row.winner_id == row?.participants?.[0]?.id ? 'text-green-700' : ''}">${row.winner_id == row?.participants?.[0]?.id ? "🏆 " : ""}${row?.participants?.[0]?.name || "-"}</p>
                            <p class="text-[.8em] font-semibold">${row?.participants?.[0] ? `(${row?.participants?.[0]?.contingent})` : '-'}</p>
                        </div>
                        <p class="text-xs font-regular mt-2">${row?.participants?.[0]?.grade || "-"}</p>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col items-start justify-start">
                        <div class="flex flex-col items-start justify-start"></div>
                            <p class="text-xs font-regular ${row.winner_id == row?.participants?.[1]?.id ? 'text-green-700' : ''}">${row.winner_id == row?.participants?.[1]?.id ? "🏆 " : ""}${row?.participants?.[1]?.name || "-"}</p>
                            <p class="text-[.8em] font-semibold">${row?.participants?.[1] ? `(${row?.participants?.[1]?.contingent})` : '-'}</p>
                        </div>
                        <p class="text-xs font-regular mt-2">${row?.participants?.[1]?.grade || "-"}</p>
                    </div>
                </td>
                <td class="pl-4">
                    <svg class="w-4 fill-current text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" onclick="handlerDeleteMatch(${row?.id})">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                </td>
            </tr>
        `;
        tableBody.innerHTML += tr;
    });

    if (STATES.filteredMatches.length == 0) {
        tableBody.innerHTML = `
            <tr class="bg-opacity-20 hover:bg-gray-200 transition duration-300 cursor-pointer" >
                <td class="pl-4" colspan="8">
                    <p class="text-center p-4">Tidak ada data pertandingan</p>
                </td>
            </tr>
        `;
    }

    handlerRenderCategory()
    handlerRenderPagination()
}

const handlerSortTable = (column) => {

    const order = STATES.sortOrder[column] === 'asc' ? 'desc' : 'asc';
    STATES.sortOrder[column] = order;
    STATES.filteredMatches.sort((a, b) => {
        if (order === 'asc') {
            return a[column] > b[column] ? 1 : -1;
        } else {
            return a[column] < b[column] ? 1 : -1;
        }
    });
    STATES.currentPage = 1;
    handlerRenderTable();
}

const handlerFilterTable = (type) => {

    if (type == 'category') {
        STATES.category = document.getElementById("category").value
        if (document.getElementById("category").value == '') {
            document.getElementById("creatematch").classList.add("hidden");
        } else {
            document.getElementById("creatematch").classList.remove("hidden");
        }
        STATES.filteredMatches = STATES.matches.filter(row =>
            row?.category == document.getElementById("category").value
        );
    } else {
        if (query == '') handlerFilterTable("category")
        else {
            const query = document.getElementById("search").value.toLowerCase();
            STATES.filteredMatches = STATES.matches.filter(row =>
                row?.arena.toLowerCase().includes(query) ||
                row?.participants?.some(m => m?.name?.toLowerCase().includes(query))
            );
        }
    }

    STATES.currentPage = 1;
    handlerRenderTable();
}

const handlerDeleteMatch = async (id) => {

    let conf = confirm("Apakah anda yakin ingin menghapus data pertandingan ini?")
    if (!conf) return

    fetch('/api/match/delete/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res?.statusCode == 200) {
                handlerGetAllMatches()
            }
        })
}

// Services

const handlerOnload = async () => {

    const e = await localStorage.getItem("event")
    if (!e) {
        window.location.href = "/"
        return
    }
    STATES.event = JSON.parse(e)


    socket.on("update-grade", (data) => {
        console.log("Receiving update-grade: ", data);
        const isEventMatch = String(data?.jury?.eventId).trim() === String(STATES.event?.id).trim();
        const isArenaMatch = STATES.stageKata2 != null && String(STATES.stageKata2?.tatami).replace(/[^0-9]/g, '') === String(data?.jury?.arenaId).replace(/[^0-9]/g, '');
        console.log("Validation: ", { isEventMatch, isArenaMatch, stageKata2: STATES.stageKata2 });

        if (isEventMatch && STATES.stageKata2 != null && isArenaMatch) {
            if (STATES.stageKata2.is_locked || STATES.stageKata2.participants[data?.participant]?.is_locked) return;
            const juryId = String(data?.jury?.juryId).replace(/[^0-9]/g, '');
            const gElement = document.getElementById(`g-${data?.participant}-${juryId}`);
            if (gElement) gElement.value = data?.grade;
            STATES.stageKata2.id = Math.floor(Math.random() * 1000)
            STATES.stageKata2.participants[data?.participant][`g${juryId}`] = parseFloat(data?.grade).toFixed(1)
            localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2))
            handlerSetPoint()
        }
    })

    const stageKata2 = await localStorage.getItem("stage_kata_2")
    const parsedStageKumite = JSON.parse(stageKata2)

    if (stageKata2 && parsedStageKumite?.event_id == STATES.event?.id) {
        STATES.stageKata2 = JSON.parse(stageKata2)
        document.getElementById("match-handler").classList.remove("hidden");
        if (document.getElementById("kata-name")) {
            document.getElementById("kata-name").value = STATES.stageKata2.kata_name || "";
        }
        document.getElementById("title").innerText = `${STATES.stageKata2?.match_id} | ${STATES.stageKata2?.tatami} | ${STATES.stageKata2?.category?.toUpperCase()}`
        handlerRenderMatch()
    } else {
        document.getElementById("match-handler").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
        document.getElementById("title").innerText = `KATA | EVENT ${STATES.event?.name?.toUpperCase()}`
    }

    await handlerGetAllParticipants()
    await handlerGetAllMatches()
}

const handlerOnUnload = () => {

    clearInterval(timeId)
    if (STATES.stageKata2 != null) {
        STATES.stageKata2.play = false
        localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2))
    }
}

const handlerOnKeydown = (e) => {

    if (e.keyCode == 32 && STATES.stageKata2 != null) {
        e.preventDefault()
        handlerMatchControl(null, 'play')
    }
}

window.addEventListener("load", handlerOnload)
window.addEventListener("unload", handlerOnUnload)
window.addEventListener("keydown", handlerOnKeydown)
window.addEventListener("keydown", handlerOnKeydown)
window.addEventListener("unload", handlerOnUnload)
window.addEventListener("keydown", handlerOnKeydown)
window.addEventListener("keydown", handlerOnKeydown)
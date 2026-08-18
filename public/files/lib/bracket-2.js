const STATES = {
    event: {},
    category: null,
    bracket_id: null,
    brackets: [],
    matches: [],
    winners: [],
    participants: [],
    winner_tab: false
}

let draggedItem = null

const bracket16 = [
    [
        [
            {
                participant: null,
                coordinate: "1-0-0"
            },
            {
                participant: null,
                coordinate: "1-0-0"
            },
            {
                participant: null,
                coordinate: "1-0-1"
            },
            {
                participant: null,
                coordinate: "1-0-1"
            },
            {
                participant: null,
                coordinate: "1-0-2"
            },
            {
                participant: null,
                coordinate: "1-0-2"
            },
            {
                participant: null,
                coordinate: "1-0-3"
            },
            {
                participant: null,
                coordinate: "1-0-3"
            },
        ],
        [
            {
                participantd: null,
                coordinate: "1-1-0"
            },
            {
                participant: null,
                coordinate: "1-1-0"
            },
            {
                participant: null,
                coordinate: "1-1-1"
            },
            {
                participant: null,
                coordinate: "1-1-1"
            },
            {
                participant: null,
                coordinate: "1-1-2"
            },
            {
                participant: null,
                coordinate: "1-1-2"
            },
            {
                participant: null,
                coordinate: "1-1-3"
            },
            {
                participant: null,
                coordinate: "1-1-3"
            },
        ],

    ],
    [
        [
            {
                participant: null,
                coordinate: "2-0-0"
            },
            {
                participant: null,
                coordinate: "2-0-0"
            },
            {
                participant: null,
                coordinate: "2-0-1"
            },
            {
                participant: null,
                coordinate: "2-0-1"
            },
        ],
        [
            {
                participant: null,
                coordinate: "2-1-0"
            },
            {
                participant: null,
                coordinate: "2-1-0"
            },
            {
                participant: null,
                coordinate: "2-1-1"
            },
            {
                participant: null,
                coordinate: "2-1-1"
            },
        ],
    ],
    [
        [
            {
                participant: null,
                coordinate: "3-0-0"
            },
            {
                participant: null,
                coordinate: "3-0-0"
            },
        ],
        [
            {
                participant: null,
                coordinate: "3-1-0"
            },
            {
                participant: null,
                coordinate: "3-1-0"
            },
        ],
    ],
    [
        [
            {
                participant: null,
                coordinate: ""
            },
        ],
        [
            {
                participant: null,
                coordinate: ""
            },
        ],
    ]
]

const bracket32 = [
    [
        [
            {
                participant: null,
                coordinate: "1-0-0"
            },
            {
                participant: null,
                coordinate: "1-0-0"
            },
            {
                participant: null,
                coordinate: "1-0-1"
            },
            {
                participant: null,
                coordinate: "1-0-1"
            },
            {
                participant: null,
                coordinate: "1-0-2"
            },
            {
                participant: null,
                coordinate: "1-0-2"
            },
            {
                participant: null,
                coordinate: "1-0-3"
            },
            {
                participant: null,
                coordinate: "1-0-3"
            },
            {
                participant: null,
                coordinate: "1-0-4"
            },
            {
                participant: null,
                coordinate: "1-0-4"
            },
            {
                participant: null,
                coordinate: "1-0-5"
            },
            {
                participant: null,
                coordinate: "1-0-5"
            },
            {
                participant: null,
                coordinate: "1-0-6"
            },
            {
                participant: null,
                coordinate: "1-0-6"
            },
            {
                participant: null,
                coordinate: "1-0-7"
            },
            {
                participant: null,
                coordinate: "1-0-7"
            },
        ],
        [
            {
                participant: null,
                coordinate: "1-1-0"
            },
            {
                participant: null,
                coordinate: "1-1-0"
            },
            {
                participant: null,
                coordinate: "1-1-1"
            },
            {
                participant: null,
                coordinate: "1-1-1"
            },
            {
                participant: null,
                coordinate: "1-1-2"
            },
            {
                participant: null,
                coordinate: "1-1-2"
            },
            {
                participant: null,
                coordinate: "1-1-3"
            },
            {
                participant: null,
                coordinate: "1-1-3"
            },
            {
                participant: null,
                coordinate: "1-1-4"
            },
            {
                participant: null,
                coordinate: "1-1-4"
            },
            {
                participant: null,
                coordinate: "1-1-5"
            },
            {
                participant: null,
                coordinate: "1-1-5"
            },
            {
                participant: null,
                coordinate: "1-1-6"
            },
            {
                participant: null,
                coordinate: "1-1-6"
            },
            {
                participant: null,
                coordinate: "1-1-7"
            },
            {
                participant: null,
                coordinate: "1-1-7"
            }
        ],
    ],
    [
        [
            {
                participant: null,
                coordinate: "2-0-0"
            },
            {
                participant: null,
                coordinate: "2-0-0"
            },
            {
                participant: null,
                coordinate: "2-0-1"
            },
            {
                participant: null,
                coordinate: "2-0-1"
            },
            {
                participant: null,
                coordinate: "2-0-2"
            },
            {
                participant: null,
                coordinate: "2-0-2"
            },
            {
                participant: null,
                coordinate: "2-0-3"
            },
            {
                participant: null,
                coordinate: "2-0-3"
            },
        ],
        [
            {
                participant: null,
                coordinate: "2-1-0"
            },
            {
                participant: null,
                coordinate: "2-1-0"
            },
            {
                participant: null,
                coordinate: "2-1-1"
            },
            {
                participant: null,
                coordinate: "2-1-1"
            },
            {
                participant: null,
                coordinate: "2-1-2"
            },
            {
                participant: null,
                coordinate: "2-1-2"
            },
            {
                participant: null,
                coordinate: "2-1-3"
            },
            {
                participant: null,
                coordinate: "2-1-3"
            },
        ]
    ],
    [
        [
            {
                participant: null,
                coordinate: "3-0-0"
            },
            {
                participant: null,
                coordinate: "3-0-0"
            },
            {
                participant: null,
                coordinate: "3-0-1"
            },
            {
                participant: null,
                coordinate: "3-0-1"
            },
        ],
        [
            {
                participant: null,
                coordinate: "3-1-0"
            },
            {
                participant: null,
                coordinate: "3-1-0"
            },
            {
                participant: null,
                coordinate: "3-1-1"
            },
            {
                participant: null,
                coordinate: "3-1-1"
            },
        ]
    ],
    [
        [
            {
                participant: null,
                coordinate: "4-0-0"
            },
            {
                participant: null,
                coordinate: "4-0-0"
            },
        ],
        [
            {
                participant: null,
                coordinate: "4-1-0"
            },
            {
                participant: null,
                coordinate: "4-1-0"
            },
        ]
    ],
    [
        [
            {
                participant: null,
                coordinate: ""
            },
        ],
        [
            {
                participant: null,
                coordinate: ""
            },
        ]
    ]
]

// Handlers

const handlerGetParticipant = async () => {

    let link = `/api/participant/category/${STATES.event.id}/${encodeURIComponent(STATES.category)}`

    await fetch(link, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            if (res?.statusCode == 200) {
                STATES.participants = res.data
            }
        })
}

const handlerGetBracket = async () => {

    const res = await fetch(`/api/bracket/${STATES.event.id}/${encodeURIComponent(STATES.category)}`)
    const data = await res?.json()

    if (data?.statusCode == 200 && data.data) {
        STATES.bracket_id = data.data?.id || null
        STATES.brackets = JSON.parse(data.data?.bracket || "[]")
        STATES.winners = JSON.parse(data.data?.rangking || "[]")
    }
}

const handlerGetMatches = async () => {

    await fetch(`/api/match/category/${STATES.event.id}/${encodeURIComponent(STATES.category)}`)
        .then(res => res.json())
        .then(res => {
            if (res?.statusCode == 200) {
                STATES.matches = res.data
            }
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
}

const handlerCreateBracket = () => {

    fetch('/api/bracket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_id: STATES.event.id,
            category: STATES.category,
            bracket: JSON.stringify(STATES.brackets)
        })
    }).then(res => res.json())
        .then(res => {
            if (res?.statusCode == 200) {
                renderBracket()
            }
        })
}

const handlerUpdateBracket = async () => {

    if (STATES.bracket_id) {
        await fetch(`/api/bracket/${STATES.bracket_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bracket: JSON.stringify(STATES.brackets),
                rangking: JSON.stringify(STATES.winners)
            })
        })
    }
}

const handlerReshuffleBrackets = () => {

    let conf = confirm("Apakah anda yakin ingin mengacak kembali pertandingan?")
    if (!conf) return

    STATES.brackets = generateBracket(STATES.participants, STATES.participants?.length <= 16 ? bracket16 : bracket32)
    // STATES.brackets = generateBracket(STATES.participants, bracket32)
    handlerUpdateBracket()
    renderBracket()
}

const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const chunkArrayWithNull = (arr, size) => {

    return arr.reduce((acc, _, i) => {
        if (i % size === 0) {
            acc.push(arr.slice(i, i + size));
        }
        return acc;
    }, []);
}

const groupByCoordinate = (data) => {

    const grouped = {};

    data.flat(2).forEach(obj => {
        const coord = obj.coordinate || "";
        if (!grouped[coord]) {
            grouped[coord] = [];
        }
        grouped[coord].push(obj);
    });

    return Object.values(grouped);
}

const genFillParticipants = (participants, length) => {

    const generated = []
    const p = participants
    const arrNull = Array(length - participants.length).fill(null)

    arrNull.forEach((_, i) => {
        const ind = Math.floor(Math.random() * p.length)
        const d = p.splice(ind, 1)
        generated.push([d[0], arrNull[i]])
    })

    return [...chunkArrayWithNull(p, 2), ...generated].flat()

}

const handlerCheckMatch = () => {

    if (STATES.bracket_id && STATES.matches.length > 0) {
        const expectMatch = groupByCoordinate(STATES.brackets)
        expectMatch.forEach((expect, i) => {
            if (expect[0].participant != null && expect[1].participant != null) {
                const expectPids = expect.map(p => p.participant.id)
                STATES.matches.forEach((match, j) => {
                    if (expectPids.includes(match.participants?.[0]?.id) && expectPids.includes(match.participants?.[1]?.id)) {
                        const winner = expect[0].participant.id == match.winner_id ? expect[0].participant : expect[1].participant
                        if (expect[0].coordinate == '') STATES.winners[0] = winner
                        else {
                            const ids = expect[0].coordinate.split("-")
                            if (STATES.brackets[ids[0]][ids[1]][ids[2]].participant == null) STATES.brackets[ids[0]][ids[1]][ids[2]].participant = winner
                        }
                    }
                })
            }
        })
        renderBracket()
        handlerUpdateBracket()
    }
}

const generateBracket = (participants, bracket) => {
    // If only two participants, directly assign them to the final match slots
    if (participants.length === 2) {
        const gen_bracket = JSON.parse(JSON.stringify(bracket));
        const finalRoundIndex = gen_bracket.length - 1;
        if (gen_bracket[finalRoundIndex]) {
            if (gen_bracket[finalRoundIndex][0] && gen_bracket[finalRoundIndex][0][0]) {
                gen_bracket[finalRoundIndex][0][0].participant = participants[0];
            }
            if (gen_bracket[finalRoundIndex][1] && gen_bracket[finalRoundIndex][1][0]) {
                gen_bracket[finalRoundIndex][1][0].participant = participants[1];
            }
        }
        return gen_bracket;
    }


    let gen_bracket = bracket
    const totalParticipants = participants.length;
    const shuffledParticipants = shuffleArray(participants);

    const half = Math.ceil(totalParticipants / 2);
    let groupB = shuffledParticipants.slice(0, half)
    let groupA = shuffledParticipants.slice(half)

    let roundIndex = null
    for (let r = 0; r < gen_bracket.length; r++) {
        totalP = (gen_bracket[r][0].length + gen_bracket[r][1].length)
        totalN = (r + 1) == gen_bracket.length ? 1 : ((gen_bracket?.[r + 1]?.[0].length || 0) + (gen_bracket?.[r + 1]?.[1].length || 0))
        if ((totalP >= totalParticipants && totalN < totalParticipants)) {
            roundIndex = r
            break
        }
    }

    if (roundIndex != null) {

        groupA = genFillParticipants(groupA, gen_bracket[roundIndex][0].length)
        groupB = genFillParticipants(groupB, gen_bracket[roundIndex][1].length)

        for (let i = 0; i < groupA.length; i++) {
            if ((i % 2 == 0) && (groupA?.[i + 1] == null)) {
                const indexes = gen_bracket[roundIndex][0][i].coordinate.split("-")
                gen_bracket[indexes[0]][indexes[1]][indexes[2]].participant = groupA[i]
            } else gen_bracket[roundIndex][0][i].participant = groupA[i]
        }
        for (let i = 0; i < groupB.length; i++) {
            if ((i % 2 == 0) && (groupB?.[i + 1] == null)) {
                const indexes = gen_bracket[roundIndex][1][i].coordinate.split("-")
                gen_bracket[indexes[0]][indexes[1]][indexes[2]].participant = groupB[i]
            } else gen_bracket[roundIndex][1][i].participant = groupB[i]
        }
    }

    return gen_bracket
}

const drawCircle = (ctx, centerX, centerY, radius) => {

    // Gambar lingkaran
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

const drawConnectors = () => {

    const canvas = document.getElementById("bracket-connectors");
    const ctx = canvas.getContext("2d");

    // Atur ukuran canvas sesuai ukuran window agar koordinat getBoundingClientRect presisi
    canvas.width = window.isExportingPDF ? 1920 : window.innerWidth;
    canvas.height = window.isExportingPDF ? 1080 : window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "#323232";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    STATES.brackets?.forEach((item, i) => {
        item?.forEach((it, j) => {
            it?.forEach((d, k) => {

                const bracket = document.getElementById(`${i}-${j}-${k}`)
                const nextBracket = document.getElementById(`${d.coordinate}`)

                if (!nextBracket) return

                const rect1 = bracket.getBoundingClientRect();
                const rect2 = nextBracket.getBoundingClientRect();

                const midX1 = rect1.right;
                const midY1 = rect1.top + rect1.height / 2;
                const midX2 = rect2.left;
                const midY2 = rect2.top + rect2.height / 2;

                const halfX = (midX1 + midX2) / 2;

                drawLine(midX1, midY1, halfX, midY1);
                drawLine(halfX, midY1, halfX, midY2);
                drawLine(halfX, midY2, midX2, midY2);
            })
        })
    })

    // Hubungkan final ke pemenang
    const winner = document.getElementById("winner");
    if (winner) {
        const winnerRect = winner.getBoundingClientRect();
        const lastBracket1 = document.getElementById(`${STATES.brackets.length - 1}-0-0`);
        const lastBracket2 = document.getElementById(`${STATES.brackets.length - 1}-1-0`);

        if (lastBracket1 && lastBracket2) {

            const lastRect = lastBracket1.getBoundingClientRect();
            const lastRect2 = lastBracket2.getBoundingClientRect();

            const midXLast = lastRect.right;
            const midYLast = lastRect.top + lastRect.height / 2;
            const midXLast2 = lastRect2.right;
            const midYLast2 = lastRect2.top + lastRect2.height / 2;
            const midXWinner = winnerRect.left;
            const midYWinner = winnerRect.top + winnerRect.height / 2;

            const halfX1 = (midXLast + midXWinner) / 2;
            const halfX2 = (midXLast2 + midXWinner) / 2;

            drawLine(midXLast, midYLast, halfX1, midYLast);
            drawLine(halfX1, midYLast, halfX1, midYWinner);
            drawLine(halfX1, midYWinner, midXWinner, midYWinner);

            drawLine(midXLast2, midYLast2, halfX2, midYLast2);
            drawLine(halfX2, midYLast2, halfX2, midYWinner);
            drawLine(halfX2, midYWinner, midXWinner, midYWinner);

        }
    }
};

const handlerDragStart = (event) => {
    draggedItem = event.target
}

const handlerDragEnd = (event) => {
    draggedItem = null
}

const handlerDrop = (event) => {

    event.preventDefault();

    if (draggedItem && (draggedItem.id != event.currentTarget.id)) {

        targetIndexes = event.currentTarget.id.split("-")
        indexes = draggedItem.id.split("-")
        data = STATES.brackets[indexes[0]][indexes[1]][indexes[2]].participant

        if (data == null) return

        if (indexes?.[0] >= targetIndexes?.[0]) {

            // Swap data
            let temp = STATES.brackets[targetIndexes[0]][targetIndexes[1]][targetIndexes[2]].participant
            STATES.brackets[targetIndexes[0]][targetIndexes[1]][targetIndexes[2]].participant = STATES.brackets[indexes[0]][indexes[1]][indexes[2]].participant
            STATES.brackets[indexes[0]][indexes[1]][indexes[2]].participant = temp
        } else if (indexes?.[0] < targetIndexes?.[0]) {

            // Copy data
            STATES.brackets[targetIndexes[0]][targetIndexes[1]][targetIndexes[2]].participant = STATES.brackets[indexes[0]][indexes[1]][indexes[2]].participant
        }

        renderBracket()
        handlerUpdateBracket()
    }
}

const handlerDropWinner = (event, index) => {

    event.preventDefault();

    let indexes = draggedItem.id.split("-")
    let data = STATES.brackets[indexes[0]][indexes[1]][indexes[2]].participant

    STATES.winners[parseInt(index)] = data

    renderBracket()
    handlerUpdateBracket()
}

const handlerClearWinner = (event, index) => {

    event.preventDefault();

    STATES.winners[parseInt(index)] = undefined
    renderBracket()
    handlerUpdateBracket()
}

const handlerAllowDrop = (event) => {
    event.preventDefault();
}

const handlerClear = (event) => {

    event.preventDefault();

    const indexes = event.currentTarget.id.split("-")

    if (indexes?.[0] > 0) {
        STATES.brackets[indexes[0]][indexes[1]][indexes[2]].participant = null
        renderBracket()
        handlerUpdateBracket()
    }
}

const handlerToggleBracket = async () => {

    if (document.getElementById("bracket-type").checked) STATES.brackets = generateBracket(STATES.participants, bracket32)
    else STATES.brackets = generateBracket(STATES.participants, bracket16)

    await handlerUpdateBracket()
    setTimeout(renderBracket, 300);
}

const handlerToggleWinnerTab = () => {

    STATES.winner_tab = !STATES.winner_tab
    if (STATES.winner_tab) document.getElementById("winners").classList.remove("hidden")
    else document.getElementById("winners").classList.add("hidden")

    renderBracket()
}

const handlerDownloadPDF = () => {

    document.getElementById("control").classList.add("hidden")
    window.isExportingPDF = true;

    // Simpan state awal tab pemenang
    const originalWinnerTab = STATES.winner_tab;

    // Tampilkan tab pemenang sementara untuk unduhan PDF konsisten (sesuai dengan saat tab pemenang aktif)
    if (!originalWinnerTab) {
        STATES.winner_tab = true;
        document.getElementById("winners").classList.remove("hidden");
    }

    renderBracket();

    const origBodyWidth = document.body.style.width;
    const origBodyHeight = document.body.style.height;
    document.body.style.width = "1920px";
    document.body.style.height = "1080px";

    // Scroll ke atas sebelum mengambil bounding rect agar koordinat Y akurat
    window.scrollTo(0, 0);

    setTimeout(() => {
        // Paksa skala bagan menyesuaikan ukuran tab aktif setelah layout terupdate
        scaleBracket();
        drawConnectors();

        setTimeout(() => {
            html2canvas(document.getElementById("capture-bracket"), {
                useCORS: true,
                scrollY: 0,
                scale: 1.5,
                windowWidth: 1920,
                windowHeight: 1080
            }).then(canvas => {

                document.body.style.width = origBodyWidth;
                document.body.style.height = origBodyHeight;

                // Kembalikan state asli tab pemenang setelah pengambilan gambar selesai
                if (!originalWinnerTab) {
                    STATES.winner_tab = false;
                    document.getElementById("winners").classList.add("hidden");
                }

                window.isExportingPDF = false;

                renderBracket();

                scaleBracket();
                drawConnectors();


                const logo = new Image();
                logo.src = '/icons/logo.png';
                logo.crossOrigin = "Anonymous";

                const originalWidth = canvas.width;
                const originalHeight = canvas.height;

                const cropWidth = originalWidth;
                const cropHeight = originalHeight;

                const croppedCanvas = document.createElement('canvas');
                croppedCanvas.width = cropWidth;
                croppedCanvas.height = cropHeight;

                const ctx = croppedCanvas.getContext('2d');
                // Isi background dengan warna putih karena JPEG tidak mendukung transparansi
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, cropWidth, cropHeight);
                ctx.drawImage(canvas, 0, 0, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

                const imgData = croppedCanvas.toDataURL("image/jpeg", 0.6);

                const pdf = new window.jspdf.jsPDF({
                    orientation: "landscape",
                    unit: "px",
                    format: [595, 842],
                    compress: true
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * pdfWidth) / canvas.width;

                let heightLeft = pdfHeight;
                let position = 0;

                const margin = 10;
                let y = margin + 4;

                pdf.setFillColor("#c3c3c3");
                pdf.rect(0, 0, pdfWidth, 30, "F");

                pdf.setFontSize(12);
                pdf.setFont("helvetica", "bold");
                pdf.text(STATES.category, margin, y);
                y += 10;

                pdf.setFontSize(10);
                pdf.setFont("helvetica", "normal");
                pdf.text(`EVENT: ${STATES.event?.name}`, margin, y);
                y += 6;

                // Garis horizontal
                pdf.setDrawColor(0);
                pdf.setLineWidth(0.5);
                pdf.line(0, y, pdfWidth, y);
                y += 10;

                // Tanggal
                pdf.setFontSize(12);
                pdf.text((new Date()).toISOString().split("T")[0], pdfWidth - margin - 46, margin + 4);

                position = y;

                pdf.addImage(imgData, "JPEG", 25, position - 8, 880, 600, undefined, 'FAST');
                pdf.addImage(logo, "PNG", pdfWidth - margin - 88, 20, 100, 100);
                heightLeft = imgHeight - (pdfHeight - position);

                const colWidth = (STATES.participants?.length > 16) ? 260 : 320;
                const rowHeight = 30;
                const startX = pdfWidth - margin - colWidth;
                const startY = pdfHeight - margin - (rowHeight * 4);

                for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
                    pdf.rect(startX, startY + (rowHeight * rowIndex), colWidth, rowHeight);
                    pdf.setFontSize(11);
                    pdf.text(`${rowIndex + 1}. ${STATES.winners?.[rowIndex]?.name || "-"}`, startX + 11, startY + (rowHeight * rowIndex) + 20);
                }

                pdf.save(`${STATES.event.name}_${STATES.category}.pdf`);

            });
        }, 100);
    }, 200);

    setTimeout(() => {
        document.getElementById("control").classList.remove("hidden")
    }, 1500);
}

// Renders

const scaleBracket = () => {
    const wrapper = document.getElementById("bracket-wrapper");
    if (!wrapper) return;

    wrapper.style.transform = 'scale(1)';

    // Selalu gunakan lebar stabil (dikurangi lebar sidebar pemenang ~440px) agar skala konsisten dan tidak melompat saat tab diaktifkan/dinonaktifkan
    let availableWidth = window.innerWidth - 440;
    let availableHeight = window.innerHeight - 120;

    if (window.isExportingPDF) {
        availableWidth = 1920 - 440;
        availableHeight = 1080 - 120;
    }

    const wrapperWidth = wrapper.scrollWidth;

    // Hitung tinggi dari tinggi maksimum anak-anaknya agar tidak terpengaruh regangan flexbox
    let wrapperHeight = 0;
    Array.from(wrapper.children).forEach(child => {
        if (child.scrollHeight > wrapperHeight) {
            wrapperHeight = child.scrollHeight;
        }
    });

    if (wrapperWidth === 0 || wrapperHeight === 0) return;

    const scaleX = (availableWidth * 0.95) / wrapperWidth;
    const scaleY = (availableHeight * 0.95) / wrapperHeight;

    let scale = 0.8;
    const contentEl = document.getElementById("content");

    if (window.isExportingPDF) {
        scale = Math.min(scaleX * 0.95, scaleY * 0.95, 0.8);
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        if (contentEl) contentEl.style.overflow = "hidden";
    } else if (STATES.participants?.length > 16) {
        // Untuk peserta > 16: biarkan menyusut sedikit menyesuaikan layar, tapi batasi maksimal mengecil sampai 0.65 agar font tidak terlalu kecil. Sisanya bisa di-scroll sedikit.
        scale = Math.max(0.65, Math.min(scaleY, 0.8));
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        if (contentEl) contentEl.style.overflow = "auto";
    } else {
        // Untuk peserta <= 16: susutkan menyesuaikan layar, matikan scroll
        scale = Math.min(scaleY, 0.8);
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        if (contentEl) contentEl.style.overflow = "hidden";
    }

    wrapper.style.transform = `scale(${scale})`;

    if (contentEl) {
        contentEl.style.justifyContent = 'flex-start';
        wrapper.style.transformOrigin = 'top left';
        wrapper.style.marginLeft = '0px';
    }
}

const renderWinners = () => {

    document.getElementById("winners").innerHTML = `
        <div class="max-w-lg m-4 p-6 py-14 pl-10">
            <h2 class="text-2xl font-semibold text-gray-700 text-center mb-6 pb-2">
                🏆   Daftar Pemenang
            </h2>
            <ul class="space-y-5">
                <li class="flex items-center justify-between rounded-lg p-4 bg-white text-gray-500 shadow-md hover:cursor-pointer border-[1px] border-gray-200" allowdrop="true" ondragover="handlerAllowDrop(event)" ondrop="handlerDropWinner(event, '0')" ondblclick="handlerClearWinner(event, '0')">
                    <span class="font-semibold line-clamp-2">🥇 ${STATES.winners?.[0]?.name || "-"}</span>
                </li>
                <li class="flex items-center justify-between rounded-lg p-4 bg-white text-gray-500 shadow-md hover:cursor-pointer border-[1px] border-gray-200" allowdrop="true" ondragover="handlerAllowDrop(event)" ondrop="handlerDropWinner(event, '1')" ondblclick="handlerClearWinner(event, '1')">
                    <span class="font-semibold line-clamp-2">🥈 ${STATES.winners?.[1]?.name || "-"}</span>
                </li>
                <li class="flex items-center justify-between rounded-lg p-4 bg-white text-gray-500 shadow-md hover:cursor-pointer border-[1px] border-gray-200" allowdrop="true" ondragover="handlerAllowDrop(event)" ondrop="handlerDropWinner(event, '2')" ondblclick="handlerClearWinner(event, '2')">
                    <span class="font-semibold line-clamp-2">🥉 ${STATES.winners?.[2]?.name || "-"}</span>
                </li>
                <li class="flex items-center justify-between rounded-lg p-4 bg-white text-gray-500 shadow-md hover:cursor-pointer border-[1px] border-gray-200" allowdrop="true" ondragover="handlerAllowDrop(event)" ondrop="handlerDropWinner(event, '3')" ondblclick="handlerClearWinner(event, '3')">
                    <span class="font-semibold line-clamp-2">🎖️ ${STATES.winners?.[3]?.name || "-"}</span>
                </li>
            </ul>
        </div>  
    `
}

const renderBracket = () => {

    const content = document.getElementById("content")

    let row1 = ""
    let row2 = ""
    let is16 = STATES.participants?.length <= 16
    let boxWidthClass = is16 ? "w-[600px]" : "w-[520px]"
    let minHeightClass = is16 ? "min-h-[5em]" : "min-h-[3.5em]"
    let textSizeClass = is16 ? "text-[36px]" : "text-[30px]"
    let textPosClass = is16 ? "text-left justify-start px-4" : "text-left justify-start px-2"
    let emptySpaceClass = is16 ? "my-4" : "my-2"

    if (STATES.brackets.length > 1) {
        row1 += `<div class="flex">`
        row2 += `<div class="flex">`
        for (let i = 0; i < STATES.brackets.length; i++) {
            for (let j = 0; j < STATES.brackets[i].length; j++) {
                if (j == 0) {
                    row1 += `<div class="flex flex-col justify-center">`
                    const matches = STATES.brackets[i][j]
                    if (matches?.length > 0) {
                        for (let k = 0; k < matches.length; k++) {
                            const participant = matches[k]?.participant
                            const m = k % 2 == 0
                            row1 += `<div class="flex flex-col ${i > 0 ? 'flex-[.6] justify-center' : ''} overflow-visible"><div id='${i}-${j}-${k}' class="${boxWidthClass} text-white my-1 mx-[1em] overflow-visible">`
                            if (participant == null || Object.keys(participant).length == 0) {
                                row1 += `
                                    <div id="${i}-${j}-${k}" class="${(is16 && i == 0) ? 'my-2' : ''} flex bg-gradient-to-r from-[${(k % 2 == 0) ? '#eb343480' : '#3437eb80'}] to-[#ffffff33] overflow-hidden border-t-2 border-b-2 border-l-2 border-t-[${(k % 2 == 0) ? '#eb3434' : '#3437eb'}] border-b-[${(k % 2 == 0) ? '#eb3434' : '#3437eb'}] border-l-[${(k % 2 == 0) ? '#eb3434' : '#3437eb'}] ${minHeightClass}" allowdrop="true" ondrop="handlerDrop(event)" ondragover="handlerAllowDrop(event)">
                                    </div>
                                `
                            } else {
                                row1 += `
                                    <div id="${i}-${j}-${k}" class="${(is16 && i == 0) ? 'my-2' : ''} flex items-center ${textPosClass} bg-gradient-to-r from-[${(k % 2 == 0) ? '#eb343480' : '#3437eb80'}] to-[#ffffff33] hover:cursor-pointer hover:bg-gray-600 border-t-2 overflow-visible border-b-2 border-l-2 border-t-[${(k % 2 == 0) ? '#eb3434' : '#3437eb'}] border-b-[${(k % 2 == 0) ? '#eb3434' : '#3437eb'}] border-l-[${(k % 2 == 0) ? '#eb3434' : '#3437eb'}] ${minHeightClass} relative" draggable="true" allowdrop="true" ondragover="handlerAllowDrop(event)" ondragstart="handlerDragStart(event)" ondragend="handlerDragEnd(event)" ondrop="handlerDrop(event)" ondblclick="handlerClear(event)">
                                        <span id="name-${i}-${j}-${k}" class="${textSizeClass} text-black text-left font-bold whitespace-nowrap">${participant.name} - ${participant.contingent?.toUpperCase()}</span>
                                    </div>
                                `
                            }
                            row1 += `</div></div>`
                        }
                    } else {
                        row1 += `<div class="${boxWidthClass} ${emptySpaceClass}"></div>`
                    }
                    row1 += `</div>`
                }
                if (j == 1) {
                    row2 += `<div class="flex flex-col justify-center">`
                    const matches = STATES.brackets[i][j]
                    if (matches?.length > 0) {
                        for (let k = 0; k < matches.length; k++) {
                            const participant = matches[k]?.participant
                            row2 += `<div class="flex flex-col ${i > 0 ? 'flex-[.6] justify-center' : ''} overflow-visible"><div id='${i}-${j}-${k}' class="${boxWidthClass} text-white my-1 mx-[1em] overflow-visible">`
                            if (participant == null || Object.keys(participant).length == 0) {
                                row2 += `
                                    <div id="${i}-${j}-${k}" class="${(is16 && i == 0) ? 'my-2' : ''} flex bg-gradient-to-r from-[${(k % 2 == 0) && matches.length > 1 ? '#eb343480' : '#3437eb80'}] to-[#ffffff33] overflow-hidden border-t-2 border-b-2 border-l-2 border-t-[${(k % 2 == 0) && matches.length > 1 ? '#eb3434' : '#3437eb'}] border-b-[${(k % 2 == 0) && matches.length > 1 ? '#eb3434' : '#3437eb'}] border-l-[${(k % 2 == 0) && matches.length > 1 ? '#eb3434' : '#3437eb'}] ${minHeightClass}" allowdrop="true" ondrop="handlerDrop(event)" ondragover="handlerAllowDrop(event)">
                                    </div>
                                `
                            } else {
                                row2 += `
                                    <div id="${i}-${j}-${k}" class="${(is16 && i == 0) ? 'my-2' : ''} flex items-center ${textPosClass} bg-gradient-to-r from-[${(k % 2 == 0) && matches.length > 1 ? '#eb343480' : '#3437eb80'}] to-[#ffffff33] hover:cursor-pointer hover:bg-gray-600 border-t-2 overflow-visible border-b-2 border-l-2 border-t-[${(k % 2 == 0) && matches.length > 1 ? '#eb3434' : '#3437eb'}] border-b-[${(k % 2 == 0) && matches.length > 1 ? '#eb3434' : '#3437eb'}] border-l-[${(k % 2 == 0) && matches.length > 1 ? '#eb3434' : '#3437eb'}] ${minHeightClass} relative" draggable="true" allowdrop="true" ondragover="handlerAllowDrop(event)" ondragstart="handlerDragStart(event)" ondragend="handlerDragEnd(event)" ondrop="handlerDrop(event)" ondblclick="handlerClear(event)">
                                        <span id="name-${i}-${j}-${k}" class="${textSizeClass} text-black text-left font-bold whitespace-nowrap">${participant.name} - ${participant.contingent?.toUpperCase()}</span>
                                    </div>
                                `
                            }
                            row2 += `</div></div>`
                        }
                    } else {
                        row2 += `<div class="${boxWidthClass} ${emptySpaceClass}"></div>`
                    }
                    row2 += `</div>`
                }
            }
        }
        row1 += `</div>`
        row2 += `</div>`
    }

    content.innerHTML = `
        <div id="control" class="fixed flex bottom-4 right-2">
            ${STATES.matches?.length == 0 ? `
                    <button
                        onclick="handlerReshuffleBrackets()"
                        class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 cursor-pointer mx-2">
                        <i class='bx bx-shuffle text-xl'></i>
                        Acak
                    </button>                        
                ` : `
                    <button
                        onclick="handlerCheckMatch()"
                        class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 cursor-pointer mx-2">
                        <i class='bx bx-refresh text-xl'></i>
                        Update Pertandingan
                    </button>
                `
        }
            <button
                onclick="handlerDownloadPDF()"
                class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 cursor-pointer mx-2">
                <i class='bx bx-download text-xl'></i>
                Unduh PDF
            </button>
            <div class="flex items-center space-x-3 ml-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input id="winners-tab" ${STATES.winner_tab ? 'checked' : ''} type="checkbox" onchange="handlerToggleWinnerTab()" class="sr-only peer">
                    <div class="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
                <span class="text-2xl font-medium">Tab Pemenang</span>
            </div>
            ${(STATES.participants?.length == 16) ? `
                    <div class="flex items-center space-x-3 ml-4">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input id="bracket-type" ${STATES.brackets.length == 4 ? '' : 'checked'} type="checkbox" onchange="handlerToggleBracket()" class="sr-only peer">
                            <div class="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                        <span class="text-lg font-medium">32</span>
                    </div>
                ` : ''
        }
        </div>
        <div id="bracket-wrapper" class="flex flex-row justify-center items-center origin-top" style="flex-shrink: 0; transform-origin: top center; min-width: max-content;">
            <div class="flex flex-col" style="flex-shrink: 0; min-width: max-content;">
                ${row1}
                ${row2}
            </div>
            <div id="winner" class="flex flex-col justify-center items-center ml-7" style="flex-shrink: 0; min-width: max-content;">
                <div class="min-w-[420px] max-w-[800px] px-4 text-white my-4 rounded-xs hover:cursor-pointer [background-image:linear-gradient(45deg,#eb343480,#3437eb33,#ffffff33)] border-y-2 border-l-2 border-[#eb3434] border-b-[#3437eb]" allowdrop="true" ondragover="handlerAllowDrop(event)" ondrop="handlerDropWinner(event, '0')" ondblclick="handlerClearWinner(event, '0')">
                    <div class="flex flex-col flex-1 p-2 px-3 ${minHeightClass} justify-center items-center text-center">
                        <span class="text-black font-bold text-[30px] whitespace-nowrap">${STATES.winners?.[0]?.name?.toUpperCase() || ''} - ${STATES.winners?.[0]?.contingent ? `(${STATES.winners?.[0]?.contingent?.toUpperCase()})` : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    `

    scaleBracket();
    setTimeout(() => {
        scaleBracket();
        drawConnectors();
    }, 50);
    setTimeout(() => {
        scaleBracket();
        drawConnectors();
    }, 200);
    setTimeout(() => {
        scaleBracket();
        drawConnectors();
    }, 500);
    setTimeout(() => {
        scaleBracket();
        drawConnectors();
    }, 1000);
    renderWinners()
}

// Services

const handlerOnload = async () => {

    const e = await localStorage.getItem("event")
    const category = await localStorage.getItem("category_bracket")
    if (!e) {
        if (!category) window.location.href = "/dashboard"
        else window.location.href = "/"
        return
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    STATES.event = JSON.parse(e)
    STATES.category = JSON.parse(category)

    document.getElementById("title").innerText = `EVENT ${STATES.event?.name?.toUpperCase()}\nBAGAN PERTANDINGAN : ${category.toUpperCase()}`

    await handlerGetParticipant()
    await handlerGetBracket()
    await handlerGetMatches()

    setTimeout(async () => {

        if (!STATES.bracket_id) {
            STATES.brackets = generateBracket(STATES.participants, STATES.participants.length <= 16 ? bracket16 : bracket32)
            await handlerCreateBracket()
        } else {
            // Jika bracket sudah ada di database namun formatnya masih untuk <= 16 peserta
            // padahal sekarang jumlah peserta > 16, maka kita lakukan peningkatan otomatis ke bracket32
            if (STATES.participants.length > 16 && STATES.brackets.length <= 4) {
                STATES.brackets = generateBracket(STATES.participants, bracket32)
                await handlerUpdateBracket()
            }
            renderBracket()
        }

        handlerCheckMatch()

        document.getElementById("loadingModal").classList.add("hidden")
    }, 1000);
}

window.addEventListener("load", handlerOnload)
window.addEventListener("resize", () => {
    scaleBracket();
    drawConnectors();
})
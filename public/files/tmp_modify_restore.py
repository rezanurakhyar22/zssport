new_html_block = """    document.getElementById("match-content").innerHTML = `
        <div class="flex flex-col gap-4 text-white flex-1 min-h-0 w-full">
            ${STATES.stageKata2.participants[0] != null ? `
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col justify-center items-center py-4 px-6 bg-red-600 rounded-md relative text-white">
                        ${STATES.stageKata2.is_final ? `
                                <div class="absolute bottom-12 left-4 flex items-center justify-center">
                                    <input id="p-1" type="checkbox" ${STATES.stageKata2.active_player == 0 ? 'checked' : ''} onclick="handlerTogglePerform(0)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">Perform</span>
                                </div>
                            ` : ''
                        }
                        ${STATES.stageKata2.participants[1] != null ? `
                                <div class="absolute bottom-4 left-4 flex items-center justify-center">
                                    <input id="w-1" type="checkbox" onclick="handlerToggleCheckbox(1)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">🏆</span>
                                </div>
                            ` : ''
                        }
                        <div class="flex items-baseline gap-2">
                            <h1 class="text-4xl font-bold line-clamp-1">${STATES.stageKata2?.participants[0]?.name}</h1>
                            <h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[0]?.contingent})</h2>
                        </div>
                        <input type="text" list="kata-list" value="${STATES.stageKata2?.participants[0]?.kata_name || ''}" onchange="handlerSetParticipantKataName(0, this.value)" class="text-gray-900 mt-2 px-3 py-1 rounded bg-white w-[16em] text-center focus:outline-none" placeholder="Pilih Kata...">
                        <h1 class="text-[5em] font-extrabold mt-2 leading-none">${STATES.stageKata2?.participants[0]?.point}</h1>
                    </div>
                    <div class="flex justify-between items-center flex-row flex-nowrap gap-1 bg-red-100 p-1 rounded-lg w-full text-black">
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[0]?.c1 ? 'checked' : ''} onclick="handlerToggleField(0, 1)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-0-1" type="text" value="${STATES.stageKata2.participants[0]?.g1 != 0 ? STATES.stageKata2.participants[0]?.g1 : ''}" onchange="handlerSetGrade(0, 1)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J1" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[0]?.c2 ? 'checked' : ''} onclick="handlerToggleField(0, 2)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-0-2" type="text" value="${STATES.stageKata2.participants[0]?.g2 != 0 ? STATES.stageKata2.participants[0]?.g2 : ''}" onchange="handlerSetGrade(0, 2)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J2" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[0]?.c3 ? 'checked' : ''} onclick="handlerToggleField(0, 3)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-0-3" type="text" value="${STATES.stageKata2.participants[0]?.g3 != 0 ? STATES.stageKata2.participants[0]?.g3 : ''}" onchange="handlerSetGrade(0, 3)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J3" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[0]?.c4 ? 'checked' : ''} onclick="handlerToggleField(0, 4)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-0-4" type="text" value="${STATES.stageKata2.participants[0]?.g4 != 0 ? STATES.stageKata2.participants[0]?.g4 : ''}" onchange="handlerSetGrade(0, 4)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J4" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[0]?.c5 ? 'checked' : ''} onclick="handlerToggleField(0, 5)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-0-5" type="text" value="${STATES.stageKata2.participants[0]?.g5 != 0 ? STATES.stageKata2.participants[0]?.g5 : ''}" onchange="handlerSetGrade(0, 5)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J5" />
                        </div>
                    </div>                
                </div>
            ` : ''}

            ${STATES.stageKata2.participants[1] != null ? `
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col justify-center items-center py-4 px-6 bg-blue-600 rounded-md relative text-white">
                        ${STATES.stageKata2.is_final ? `
                                <div class="absolute bottom-12 left-4 flex items-center justify-center">
                                    <input id="p-2" type="checkbox" ${STATES.stageKata2.active_player == 1 ? 'checked' : ''} onclick="handlerTogglePerform(1)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">Perform</span>
                                </div>
                            ` : ''
                        }
                        ${STATES.stageKata2.participants[0] != null ? `
                                <div class="absolute bottom-4 left-4 flex items-center justify-center">
                                    <input id="w-2" type="checkbox" onclick="handlerToggleCheckbox(2)" class="w-5 h-5 mr-2 shadowed">
                                    <span class="text-xl">🏆</span>
                                </div>
                            ` : ''
                        }
                        <div class="flex items-baseline gap-2">
                            <h1 class="text-4xl font-bold line-clamp-1">${STATES.stageKata2?.participants[1]?.name}</h1>
                            <h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[1]?.contingent})</h2>
                        </div>
                        <input type="text" list="kata-list" value="${STATES.stageKata2?.participants[1]?.kata_name || ''}" onchange="handlerSetParticipantKataName(1, this.value)" class="text-gray-900 mt-2 px-3 py-1 rounded bg-white w-[16em] text-center focus:outline-none" placeholder="Pilih Kata...">
                        <h1 class="text-[5em] font-extrabold mt-2 leading-none">${STATES.stageKata2?.participants[1]?.point}</h1>
                    </div>
                    <div class="flex justify-between items-center flex-row flex-nowrap gap-1 bg-blue-100 p-1 rounded-lg w-full text-black">
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[1]?.c1 ? 'checked' : ''} onclick="handlerToggleField(1, 1)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-1-1" type="text" value="${STATES.stageKata2.participants[1]?.g1 != 0 ? STATES.stageKata2.participants[1]?.g1 : ''}" onchange="handlerSetGrade(1, 1)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J1" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[1]?.c2 ? 'checked' : ''} onclick="handlerToggleField(1, 2)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-1-2" type="text" value="${STATES.stageKata2.participants[1]?.g2 != 0 ? STATES.stageKata2.participants[1]?.g2 : ''}" onchange="handlerSetGrade(1, 2)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J2" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[1]?.c3 ? 'checked' : ''} onclick="handlerToggleField(1, 3)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-1-3" type="text" value="${STATES.stageKata2.participants[1]?.g3 != 0 ? STATES.stageKata2.participants[1]?.g3 : ''}" onchange="handlerSetGrade(1, 3)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J3" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[1]?.c4 ? 'checked' : ''} onclick="handlerToggleField(1, 4)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-1-4" type="text" value="${STATES.stageKata2.participants[1]?.g4 != 0 ? STATES.stageKata2.participants[1]?.g4 : ''}" onchange="handlerSetGrade(1, 4)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J4" />
                        </div>
                        <div class="flex bg-white shadowed rounded-md overflow-hidden flex-1 min-w-0 items-center justify-between">
                            <input type="checkbox" ${STATES.stageKata2.participants[1]?.c5 ? 'checked' : ''} onclick="handlerToggleField(1, 5)" class="w-4 h-4 ml-2 mr-1 my-2 shrink-0">
                            <input id="g-1-5" type="text" value="${STATES.stageKata2.participants[1]?.g5 != 0 ? STATES.stageKata2.participants[1]?.g5 : ''}" onchange="handlerSetGrade(1, 5)" class="bg-[#f5f5f5] w-full min-w-0 appearance-none border-none outline-none focus:ring-0 rounded-e-md text-gray-900 focus:border-none text-base px-3 py-2 text-center" placeholder="J5" />
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>"""

import re

with open('lib/kata2.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('    document.getElementById("match-content").innerHTML = `\n        <div class="flex flex-col gap-4 text-white flex-1 min-h-0 w-full">')
end_idx = content.find('        <div class="flex flex-col justify-center items-center bg-gray-300')

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_html_block + "\n    \n" + content[end_idx:]
    with open('lib/kata2.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced.")
else:
    print("Could not find start or end index.")
    print("Start:", start_idx)
    print("End:", end_idx)

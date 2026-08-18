import re

with open(r'c:\Users\asus\Downloads\applikasi ZS\public\files\lib\kata2.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add the new handler
new_handler = """
const handlerSetParticipantKataName = (index, value) => {
    if (STATES.stageKata2 != null && STATES.stageKata2.participants[index]) {
        STATES.stageKata2.participants[index].kata_name = value;
        STATES.stageKata2.id = Math.floor(Math.random() * 1000000);
        localStorage.setItem("stage_kata_2", JSON.stringify(STATES.stageKata2));
    }
}
"""

# Insert before handlerSetKataName
js = js.replace('const handlerSetKataName = () => {', new_handler + '\nconst handlerSetKataName = () => {')

# Modify handlerRenderMatch
# For Blue Participant (Participant 1)
# Original string to replace:
blue_orig = """<h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[1]?.contingent})</h2>"""
blue_new = """<h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[1]?.contingent})</h2>
                        <input type="text" list="kata-list" value="${STATES.stageKata2?.participants[1]?.kata_name || ''}" onchange="handlerSetParticipantKataName(1, this.value)" class="text-gray-900 mt-2 px-3 py-1 rounded bg-white w-[16em] text-center focus:outline-none" placeholder="Pilih Kata...">"""

js = js.replace(blue_orig, blue_new)

# For Red Participant (Participant 0)
# Original string to replace:
red_orig = """<h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[0]?.contingent})</h2>"""
red_new = """<h2 class="text-2xl font-bold">(${STATES.stageKata2?.participants[0]?.contingent})</h2>
                        <input type="text" list="kata-list" value="${STATES.stageKata2?.participants[0]?.kata_name || ''}" onchange="handlerSetParticipantKataName(0, this.value)" class="text-gray-900 mt-2 px-3 py-1 rounded bg-white w-[16em] text-center focus:outline-none" placeholder="Pilih Kata...">"""

js = js.replace(red_orig, red_new)

with open(r'c:\Users\asus\Downloads\applikasi ZS\public\files\lib\kata2.js', 'w', encoding='utf-8') as f:
    f.write(js)

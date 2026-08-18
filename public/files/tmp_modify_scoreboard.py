import re

with open(r'c:\Users\asus\Downloads\applikasi ZS\public\files\lib\scoreboard-kata-2.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace Red Athlete block
red_orig = """<h2 class="text-[3.5em] font-bold uppercase flex-1 truncate">${p1.name || ''} ${p1.country ? `<span class="ml-4 font-bold text-gray-300">(${getCountryInitials(p1.country)})</span>` : ''}${p1.contingent ? `<span class="ml-4 font-bold text-[0.8em] text-gray-200">${p1.contingent}</span>` : ''}</h2>"""
red_new = """<h2 class="text-[3.5em] font-bold uppercase flex-1 truncate">${p1.name || ''} ${p1.country ? `<span class="ml-4 font-bold text-gray-300">(${getCountryInitials(p1.country)})</span>` : ''}${p1.contingent ? `<span class="ml-4 font-bold text-[0.8em] text-gray-200">${p1.contingent}</span>` : ''}</h2>
            ${p1.kata_name ? `<div class="text-[2.5em] font-bold text-yellow-300 ml-4 whitespace-nowrap uppercase">${p1.kata_name}</div>` : ''}"""

js = js.replace(red_orig, red_new)

# Replace Blue Athlete block
blue_orig = """<h2 class="text-[3.5em] font-bold uppercase flex-1 truncate">${p2.name || ''} ${p2.country ? `<span class="ml-4 font-bold text-gray-300">(${getCountryInitials(p2.country)})</span>` : ''}${p2.contingent ? `<span class="ml-4 font-bold text-[0.8em] text-gray-200">${p2.contingent}</span>` : ''}</h2>"""
blue_new = """<h2 class="text-[3.5em] font-bold uppercase flex-1 truncate">${p2.name || ''} ${p2.country ? `<span class="ml-4 font-bold text-gray-300">(${getCountryInitials(p2.country)})</span>` : ''}${p2.contingent ? `<span class="ml-4 font-bold text-[0.8em] text-gray-200">${p2.contingent}</span>` : ''}</h2>
            ${p2.kata_name ? `<div class="text-[2.5em] font-bold text-yellow-300 ml-4 whitespace-nowrap uppercase">${p2.kata_name}</div>` : ''}"""

js = js.replace(blue_orig, blue_new)

with open(r'c:\Users\asus\Downloads\applikasi ZS\public\files\lib\scoreboard-kata-2.js', 'w', encoding='utf-8') as f:
    f.write(js)

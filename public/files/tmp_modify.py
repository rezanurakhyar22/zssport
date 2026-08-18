import re

with open(r'c:\Users\asus\Downloads\applikasi ZS\public\files\kata2.html', 'r', encoding='utf-8') as f:
    html = f.read()

# find the ul block
start = html.find('<div class="relative mr-30">')
end = html.find('</div>\n                    <button class="p-2 px-[.68em] bg-red-600', start)

# extract lis
ul_block = html[start:end]
lis = re.findall(r'<li[^>]*>(.*?)</li>', ul_block)

# build datalist
datalist = '<datalist id="kata-list">\n'
for li in lis:
    datalist += f'    <option value="{li}"></option>\n'
datalist += '</datalist>\n'

# replace
new_html = html[:start] + datalist + html[end:]

with open(r'c:\Users\asus\Downloads\applikasi ZS\public\files\kata2.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

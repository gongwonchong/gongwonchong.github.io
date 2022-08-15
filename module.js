var langselect = document.createElement('select');
langselect.add(new Option('🇰🇷', 'ko_KR'));
langselect.add(new Option('🇨🇳', 'zh_CN'));
langselect.add(new Option('🇯🇵', 'ja_JP'));
langselect.add(new Option('🇺🇸', 'en_US'));
langselect.onchange = function() {
    location.href = 'index.html?lang=' + langselect.selectedOptions[0].value;
};
const urlParams = new URL(location.href).searchParams;
const lang = urlParams.get('lang');
if(lang != undefined)
{
    for(x of langselect.options)
    {
        if (lang == x.value)
        {
            x.selected = true;
        }
    }
}

document.body.appendChild(langselect);

async function getJSON(reqURL)
{
    let response = await fetch(reqURL);
    return response.json();
}

async function main()
{
    let moduleInfo = (await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/" + langselect.selectedOptions[0].value + "/gamedata/excel/uniequip_table.json"));
    let equipDict = moduleInfo["equipDict"];

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    var td = [];
    var trcnt = 0;
    
    // 표 만들기
    for (pos in equipDict)
    {
        if (Object.values(equipDict[pos])[0].split('_')[1] == '001' || Object.values(equipDict[pos])[0].split('_')[1] == '003')
        {
            continue;
        }
        // 항목 만들기
        var cur_td = document.createElement('td');
        var img = document.createElement('img');
        img.src = "https://aceship.github.io/AN-EN-Tags/img/avatars/" + equipDict[pos]["charId"] +".png";
        cur_td.id = equipDict[pos]["charId"];
        cur_td.appendChild(img);
        cur_td.onclick = async function() {
            location.href = 'module.html?operator='+ this.id + "&lang=" + langselect.selectedOptions[0].value;
        };
        td.push(cur_td);
        // 표 나누기
        if (td.length == 7 || (trcnt * 7) + td.length == Object.keys(equipDict).length / 2)
        {
            var tr = document.createElement('tr');
            for (x of td)
            {
                tr.appendChild(x);
            }
            tbody.appendChild(tr);
            td = [];
            trcnt++;
            continue;
        }
    }
    table.appendChild(thead);
    table.appendChild(tbody);

    document.body.appendChild(table);
}
main();
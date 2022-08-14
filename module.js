async function getJSON(reqURL)
{
    let response = await fetch(reqURL);
    return response.json();
}

async function main()
{
    let moduleInfo = (await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ko_KR/gamedata/excel/uniequip_table.json"));
    let equipDict = moduleInfo["equipDict"];

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    var cur = 1;
    var td = [];
    var trcnt = 0;
    
    // 표 만들기
    for (pos in equipDict)
    {
        if (cur % 2 == 0)
        {
            cur++;
            continue;
        }
        var cur_td = document.createElement('td');
        var img = document.createElement('img');
        img.src = "https://aceship.github.io/AN-EN-Tags/img/avatars/" + equipDict[pos]["charId"] +".png";
        cur_td.id = equipDict[pos]["charId"];
        cur_td.appendChild(img);
        cur_td.onclick = async function() {
            location.href = 'module.html?operator='+ this.id;
        };
        td.push(cur_td);
        if (td.length == 7 || (trcnt * 7) + td.length == Object.keys(equipDict).length / 2)
        {
            var tr = document.createElement('tr');
            for (x of td)
            {
                tr.appendChild(x);
            }
            tbody.appendChild(tr);
            td = [];
            cur++;
            trcnt++;
            continue;
        }
        else
        {
            cur++;
        }
    }
    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('body').appendChild(table);
}
main();
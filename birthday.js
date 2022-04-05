async function getJSON(reqURL)
{
    let response = await fetch(reqURL);
    return response.json();
}

async function main()
{
    let handbook_info_table = await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/handbook_info_table.json");
    let cnname = await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ko_KR/gamedata/excel/character_table.json");
    let krname = await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ko_KR/gamedata/excel/character_table.json");
    let opInfo = handbook_info_table["handbookDict"];
    let today = new Date();
    document.title = String(today.getMonth() + 1) + "월 " + String(today.getDate()) + "일" + " 생일 오퍼레이터";
    let table = document.createElement('table');
    var tr = document.createElement('tr');
    let reg = RegExp('[0-9]{0,2}月[0-9]{0,2}日');
    let regex = RegExp("月|日");
    
    for(opName in opInfo)
    {
        try
        {
            let op = opInfo[opName]["storyTextAudio"][0]["stories"][0]["storyText"];
            let birthday = op.match(reg);
            let birthstr = birthday.pop();
            let birth = birthstr.split(regex);
            if (birth[0] == today.getMonth() + 1 && birth[1] == today.getDate())
            {
                var img = new Image();
                var td = document.createElement('td');
                td.style.textAlign = "center";
                img.src = "https://aceship.github.io/AN-EN-Tags/img/avatars/" + opName + ".png";
                td.appendChild(img);
                tr.appendChild(td);
                if (krname[opName] != null)
                {
                    td.innerHTML += "<br>"+krname[opName]["name"];
                }
                else
                {
                    td.innerHTML += "<br>"+cnname[opName]["name"];
                }
            }
        }
        catch (e)
        {
            console.log(e);
            continue;
        }
    }
    table.appendChild(tr);
    document.getElementById('content').appendChild(table);
}
main();
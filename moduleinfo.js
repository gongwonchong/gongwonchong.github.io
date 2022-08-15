const urlParams = new URL(location.href).searchParams;
const operator = urlParams.get('operator');
const lang = urlParams.get('lang');
console.log(lang);

async function getJSON(reqURL)
{
    let response = await fetch(reqURL);
    return response.json();
}
async function main()
{
    const operatorName = await getOperatorName(operator);
    let module = (await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/"+ lang + "/gamedata/excel/uniequip_table.json"));
    let equipDict = module["equipDict"];
    let missionList = module["missionList"];
    var img = document.createElement('img');
    img.src = "https://aceship.github.io/AN-EN-Tags/img/avatars/" + operator + ".png";
    img.onclick = async function() {
        location.href = "index.html?lang=" + lang;
    }
    document.body.appendChild(img);

    document.title = operatorName;
    let moduleInfo = [equipDict["uniequip_001_" + operator.split("_")[2]], equipDict["uniequip_002_" + operator.split("_")[2]]];
    if (equipDict["uniequip_003_" + operator.split("_")[2]] != undefined)
    {
        moduleInfo.push(equipDict["uniequip_003_" + operator.split("_")[2]]);
    }
    let table = document.createElement('table');
    for (pos in moduleInfo)
    {
        let table_title = document.createElement('tr');
        let table_content = document.createElement('td');
        table_content.classList.add('table_title_text');
        // 기본모듈
        table_content.innerText = moduleInfo[pos]["uniEquipName"];
        table_title.appendChild(table_content);
        table.appendChild(table_title);

        // 일반모듈
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        if (moduleInfo[pos]["missionList"] != undefined)
        {
            let posList = moduleInfo[pos]["missionList"];
            let p1 = document.createElement('p');
            for (missionPos in posList)
            {
                p1.innerText += "\n" + missionList[posList[missionPos]]["desc"];
            }
            p1.classList.add('missionList');
            td.appendChild(p1);
        }
        p2 = document.createElement('p');
        p2.innerText = moduleInfo[pos]["uniEquipDesc"];
        td.appendChild(p2);
        tr.appendChild(td);
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}
main();
async function getOperatorName(code)
{
    let operator = await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/"+ lang + "/gamedata/excel/character_table.json");
    return operator[code]["name"];
}
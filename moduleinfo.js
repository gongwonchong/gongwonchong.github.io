const urlParams = new URL(location.href).searchParams;
const operator = urlParams.get('operator');
const lang = urlParams.get('lang');

async function getJSON(reqURL)
{
    let response = await fetch(reqURL);
    return response.json();
}
async function main()
{
    const operatorName = await getOperatorName(operator);
    let module = await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/"+ lang + "/gamedata/excel/uniequip_table.json");
    let battleEquip = await getJSON("https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/"+ lang + "/gamedata/excel/battle_equip_table.json");
    let equipDict = module["equipDict"]
    let missionList = module["missionList"];
    var img = document.createElement('img');
    img.src = "https://aceship.github.io/Aceship/Arknight-Images/main/avatars/" + operator + ".png";
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
    for (pos of moduleInfo)
    {
        let table_title = document.createElement('tr');
        let table_content = document.createElement('td');
        table_content.classList.add('table_title_text');
        // 모듈 제목
        table_content.innerText = pos["uniEquipName"];
        table_title.appendChild(table_content);
        table.appendChild(table_title);

        let tr = document.createElement('tr');
        let td = document.createElement('td');
        
        if (pos["uniEquipId"].split('_')[1] != '001')
        {
            // 미션
            let posList = pos["missionList"];
            let p1 = document.createElement('p');
            for (missionPos in posList)
            {
                p1.innerText += "\n" + missionList[posList[missionPos]]["desc"];
            }
            p1.classList.add('missionList');
            td.appendChild(p1);

            // 업그레이드 내용

            let upgrade_table = document.createElement('table');
            
            for (upgrade_pos of battleEquip[pos["uniEquipId"]]["phases"])
            {   
                let upgrade_tr = document.createElement('tr');
                var update = upgrade_pos["parts"][0];
                let upgrade_td = document.createElement('td');
                var upgrade_innerText = update["overrideTraitDataBundle"]["candidates"][0]["additionalDescription"] ?? update["overrideTraitDataBundle"]["candidates"][0]["overrideDescripton"] ?? "";
                upgrade_innerText = upgrade_innerText.replaceAll(new RegExp('<(.*?)>', "g"), '/span') ?? upgrade_innerText;
                var span = upgrade_innerText.split(new RegExp('/span(.*?)span', 'g'));
                span[0] ?? span.shift();
                for (span_text of span)
                {
                    if(span_text[span_text.length - 1] == '/')
                    {
                        var styled_text = document.createElement('span');
                        styled_text.innerText = span_text.replace('/', '');
                        styled_text.classList.add('advanced');
                        upgrade_td.appendChild(styled_text);
                    }
                    else
                    {
                        upgrade_td.innerHTML += span_text;
                    }
                }
                upgrade_tr.appendChild(upgrade_td);
                upgrade_table.appendChild(upgrade_tr);
            }
            td.appendChild(upgrade_table);
        }
        // 모듈 스토리
        p2 = document.createElement('p');
        p2.innerText = pos["uniEquipDesc"];
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
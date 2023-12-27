let url = new URL(window.location);
let params = new URLSearchParams(url.search);
let index = params.get("id");

document.addEventListener("DOMContentLoaded", function () {
    //chama a info dos spells
    async function fetchSpellInfoJSON(url) {
        const resposta = await fetch(url);
        const spellInfo = await resposta.json();
        return spellInfo;
    }


    const desc = document.querySelector('.desc');
    const stats = document.querySelector('.stats');


    fetchSpellInfoJSON("https://www.dnd5eapi.co/api/spells/" + index).then(spellInfo => {
        const level = spellInfo.higher_level ? spellInfo.higher_level : 'None';
        const material = spellInfo.material ? spellInfo.material : 'None';
        const attackType = spellInfo.attack_type ? spellInfo.attack_type : 'None';
     //   const damageType = spellInfo.damage.damage_type.name ? spellInfo.damage.damage_type.name : 'None';        <p><b>Damage type:</b> ${damageType}

        desc.insertAdjacentHTML('beforeend', `<div class="info"> <h1>${spellInfo.name}</h1>
        <h3>LEVEL: ${spellInfo.level}</h3>
        <p class="texto">${spellInfo.desc}
        <p><b>Higher Level:</b> ${level}
        <p><b>Material:</b> ${material}
        <p><b>School:</b> ${spellInfo.school.name}
        </div>` );

        console.log(spellInfo);
        console.log(spellInfo.higher_level);
        console.log(spellInfo.school.name);

        stats.insertAdjacentHTML('beforeend', `<div class="info"><p><b>Range:</b> ${spellInfo.range}
        <p><b>Duration:</b> ${spellInfo.duration}
        <p><b>Components:</b> ${spellInfo.components}
        <p><b>Concentration:</b> ${spellInfo.concentration}
        <p><b>Casting Time:</b> ${spellInfo.casting_time}
        <p><b>Attack Type:</b> ${attackType}
        <p><b>Ritual:</b> ${spellInfo.ritual}
        </div>` );
    }) 
})


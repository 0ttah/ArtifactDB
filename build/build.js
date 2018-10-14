const fs = require('fs');
const jsonfile = require('jsonfile');

const cwd = process.cwd();
const filePath = `${cwd}/${process.argv[2]}`;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err)
        throw err;
    let manifest = JSON.parse(data);
    //Set new ids
    let newAndOldIds = manifest.Sets.map(set => {
        return order(set.Cards).map((card, index) => updateId(card, index + 1));
    });

    //Remap related ids
    for (let i = 0; i < manifest.Sets.length; i++) {
        let set = manifest.Sets[i];
        let cardsWithRelated = set.Cards.filter(card => card.hasOwnProperty('RelatedId'));
        for (let card of cardsWithRelated) {
            card.RelatedId = card.RelatedId.map(id => {
                let match = newAndOldIds[i].find(pair => pair.oldId === id)
                if (match) {
                    return match.newId;
                }
                return id;
            });
        }
    }

    jsonfile.writeFile(filePath, manifest, { spaces: 2 }, function (err) {
        if (err) console.error(err);
        console.log("The cards manifest was updated!");
    });
});



function order(cards) {
    //Sort cards alphabetically
    return cards.sort((x, y) => {
        if (x.Name < y.Name)
            return -1;
        if (x.Name > y.Name)
            return 1;
        return 0;
    });
}

function updateId(card, newId) {
    //Renumber all cards from 1
    const oldId = card.Id;
    card.Id = newId;
    return { oldId, newId };
}
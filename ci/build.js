const fs = require('fs');
const jsonfile = require('jsonfile');

const cwd = process.cwd();
const filePath = `${cwd}/${process.argv[2]}`;

function order(cards) {
  // Sort cards alphabetically
  return cards.sort((x, y) => {
    if (x.Name < y.Name) { return -1; }
    if (x.Name > y.Name) { return 1; }
    return 0;
  });
}

function updateId(card, newId) {
  // Renumber all cards from 1
  const oldId = card.Id;
  card.Id = newId;
  return { oldId, newId };
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) { throw err; }
  const manifest = JSON.parse(data);
  // Set new ids
  const newAndOldIds = manifest.Sets.map(set => order(set.Cards).map((card, index) => updateId(card, index + 1)))[0];

  manifest.Sets[0].Cards.forEach((card) => {
    // console.log(card);
    if (card.RelatedIds) {
      card.RelatedIds = card.RelatedIds.map((id) => {
        const match = newAndOldIds.filter(x => x.oldId === id);
        if (match.length > 0) {
          return match[0].newId;
        }
        return id;
      });
      if (card.SignatureCard) {
        const match = newAndOldIds.filter(x => x.oldId === card.SignatureCard);

        if (match.length > 0) {
          card.SignatureCard = match[0].newId;
        }
      }
    }
  });

  jsonfile.writeFile(filePath, manifest, { spaces: 2 }, (err) => {
    if (err) console.error(err);
    console.log('The cards manifest was updated!');
  });
});

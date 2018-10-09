*Currently updating the readme.*

# ArtifactDB
The purpose of this repository is to provide an easy access to assets and information for developers creating & updating websites/tools for the game [Artifact by Valve](http://playartifact.com). Hopefully with enough people contributing we can fill out every card and keep it updated to track balance changes.
(Valve owns all art assets)

Currently there is all the known cards with art available for use, with a JSON manifest that can easily be integrated into your website/tool. If you spot something missing or wrong make a pull request!

# How can you contribute?
- Add new cards when they are announced
- Upload art
- Add card lore
- Add name of the artist

# JSON schema
I have tried to future proof the schema of the JSON manifest of changes by including expansion "Sets". Creep/Improvements/Items cards can have multiple abilities incase some point in the future they do. Null values are ignored and not included in the manifest to save space.

# Set Schema
- **Name** : string : Name of the card set.
- **Count** : int : Number of cards in the set.
- **ReleaseDate** : DateTime : Date of release for the set
- **Cards** : array : Array of cards within this set. (Look below for cards).

# Card Schema
- **Id** : Id of the card used for matching it with signature/related cards. Currently the Id is just a random number as we don't know the card collection number.
- **Name** : string : Card name
- **CardType** : string : **Hero/Creep/Improvement/Spell/Item**
- **ItemType** : string : __Consumable/Weapon/Armor/Accessory__
- **Color** : string : **Black/Blue/Green/Red/Yellow**
- **Rarity** : string : **Basic/Common/Uncommon/Rare**
- **Text** : string :The raw card text e.g. _Active 1: Do something._
- **Attack** : int : Attack
- **Armor** : int : Armor
- **Health** : int : Health
- **GoldCost** : int : Cost of buying an item.
- **Abilities** : array : An array of all abilities/effects for the Hero/Creep/Improvement/Item card. For creeps and improvements their **Text** has been parsed into an ability so it is easier to search for abilities.
  - **Name** : string : Name of the ability. For improvements/creeps the ability will be the name of the card + " : Effect" e.g. _Keenfolk Turret : Effect_. 
  - **Type** : string : **Active/Continuous/Play/Death**
  - **Text** : string : The description of the effect. For improvement/creep/item abilities it will remove the prefix e.g. "_Active 1: Do something._" will become "_Do something._".
  - **Cooldown** : int : Active affect cooldown.
- **Bounty** : int : Amount of gold given for destroying this card. Creep = 1, Hero = 5.
- **ManaCost** : int : Mana cost for card.
- **GetInitiative** : boolean : True if this card gives player initiative. If null/false it cannot.
- **CrossLane** : boolean : If true this card can be cast across lanes. If null/false it cannot.
- **Artist** : string : Artist name
- **Lore** : string : Lore description for the card.

# Artwork

## Card Art
Card art is available in the folder /card/. When getting a card change the card's name to lowercase, replace spaces with _ and ' with -.

Hero icons are available at /card/icon/hero/**hero_name**.png where **hero_name** is the card's name lowercase with spaces repaced with _ and ' replaced with -. E.g. _J'Muy The Wise_ = _j-muy_the_wise_

![Hero icon](https://raw.githubusercontent.com/ottah/ArtifactDB/master/card/icon/hero/j-muy_the_wise.png)

Not all card art has been made available but the ones that have are in the folder /card/artwork/

![Axe hero art](https://raw.githubusercontent.com/ottah/ArtifactDB/master/card/artwork/axe.jpg)

Abilities too! /card/ability/ use the ability name instead of card name, following the same rules for naming above.

![Static field ability](https://raw.githubusercontent.com/ottah/ArtifactDB/master/card/ability/static_field.jpg)

Card rarity icons are available as SVGs in the /card/icon/base_set_rarity folder.

![Rare set icon](https://raw.githubusercontent.com/ottah/ArtifactDB/master/card/base_set_rarity/rare.svg "Rare set icon")

## Full Card Artwork
The path to get full artwork is /fullcardart/**card_name**.png
where **card_name** is the card's name lowercase with spaces repaced with _ and ' replaced with -. E.g. _Keenfolk Turret_ = _keenfolk_turret_
![Full artwork card](https://raw.githubusercontent.com/ottah/ArtifactDB/master/fullcardart/keenfolk_turret.png "Full artwork for Keenfolk Turret")

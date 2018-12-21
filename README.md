# Currently adding new data from the API for v3.0

# ArtifactDB [![Build Status](https://travis-ci.com/ottah/ArtifactDB.svg?branch=master)](https://travis-ci.com/ottah/ArtifactDB)
The purpose of this repository is to provide easy access to assets and information about cards for developers creating websites/tools for the game [Artifact by Valve](http://playartifact.com). Hopefully with enough people contributing we can fill out every card and keep it updated to track balance changes.
(Valve owns all art assets)

Currently there is all the known cards with art available for use, with a JSON manifest that can easily be integrated into your website/tool. If you spot something missing or wrong make a pull request!

# Installation
`npm i artifactdb`

Or download the zip via Github. 

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
- **RelatedIds** : array : IDs of related cards such as signature spells and tokens.
- **Name** : string : Card name
- **CardType** : string : **Hero/Creep/Improvement/Spell/Item**
- **ItemType** : string : **Consumable/Weapon/Armor/Accessory**
- **Color** : string : **Black/Blue/Green/Red/Yellow**
- **Rarity** : string : **Basic/Common/Uncommon/Rare**
- **Text** : string :The raw card text e.g. _Active 1: Do something._
- **Attack** : int : Attack
- **Armor** : int : Armor
- **Health** : int : Health
- **SignatureCard** : int : The id of the card that is this card's signature card.
- **IsSignatureCard** : boolean : If true this card is a signature card for a hero. Use the **RelatedIds** to get the hero.
- **Charges** : int : How many charges a card has for its effect.
- **GoldCost** : int : Cost of buying an item.
- **Abilities** : array : An array of all abilities/effects for the Hero/Creep/Improvement/Item card. For creeps and improvements their **Text** has been parsed into an ability so it is easier to search for abilities.
  - **Name** : string : Name of the ability. For improvements/creeps the ability will be the name of the card + " : Effect" e.g. _Keenfolk Turret : Effect_. 
  - **Type** : string : **Active/Continuous/Play/Death/Equip**
  - **Text** : string : The description of the effect. For improvement/creep/item abilities it will remove the prefix e.g. "_Active 1: Do something._" will become "_Do something._".
  - **Cooldown** : int : Active affect cooldown.
- **ManaCost** : int : Mana cost for card.
- **GetInitiative** : boolean : If true this card gives player initiative. If null/false it cannot.
- **CrossLane** : boolean : If true this card can be cast across lanes. If null/false it cannot.
- **Token** : boolean : If true this card is a token created by another card.
- **FileName** : string : The name that assets files will use for this card. Just provide a path to what type of asset you want and the file extension.
- **Artist** : string : Artist name
- **Lore** : string : Lore description for the card.

# Artwork

## Card Art
Card art is available in the folder assets/. Each card object in the manifest has a __fileName__ property this will be the name of the assets relating to that card.

Hero icons are available at /assets/icon/hero/**hero_name**.png where **hero_name**.

![Hero icon](https://raw.githubusercontent.com/ottah/ArtifactDB/master/assets/icon/hero/jmuy_the_wise.png)

Not all card art has been made available but the ones that have are in the folder /assets/artwork/. There is small and large art work available. The small versions are perfect for list icons.

![Axe hero art](https://raw.githubusercontent.com/ottah/ArtifactDB/master/assets/artwork/small/axe.jpg)

![Axe hero art](https://raw.githubusercontent.com/ottah/ArtifactDB/master/assets/artwork/large/axe.jpg)

Abilities too! /assets/ability/ use the ability name instead of card name, following the same rules for naming above.

![Static field ability](https://raw.githubusercontent.com/ottah/ArtifactDB/master/assets/ability/static_field.jpg)

Card rarity icons are available as SVG/PNG in the /card/icon/base_set_rarity folder.

## Full Card Artwork
The path to get full artwork is /fullcard/**card_name**.png

![Full artwork card](https://raw.githubusercontent.com/ottah/ArtifactDB/master/assets/fullcard/keenfolk_turret.png "Full artwork for Keenfolk Turret")

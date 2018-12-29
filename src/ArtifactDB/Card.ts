import { Card as APICard, CardAPIObject, LanguageOptionText } from "@open-artifact/api-types";
import { Stats } from "fs";
import { CardType } from "./CardType";
import { ItemType } from "./ItemType";
export class Card {
  public id: number;
  /** This references the original card if this card is an alternative art version. */
  public baseCardId: number;
  public relatedCards: number[] = [];
  public type: CardType;
  public rarity: Rarity;
  /** At some point cards will be multicolored */
  public colors?: Color[] = undefined;
  public itemType?: ItemType;
  public name: LanguageOptionText;
  public text?: LanguageOptionText = undefined;
  public cleanText?: string = undefined;
  public stats?: Stats;
  public manaCost?: number;
  public illustrator: string;
  public lore?: string;
  public goldCost?: number;
  /** Get Initiative */
  public isQuick?: boolean;
  public isCrossLane?: boolean;
  public isToken?: boolean;
  /** Is this card playable in a deck? */
  public isPlayable: boolean = false;
  public isSignatureCard?: boolean;

  constructor(cardObj: APICard) {
    this.id = cardObj.card_id;
    this.baseCardId = cardObj.base_card_id;
    this.colors = getColor(cardObj);
    this.name = cardObj.card_name as LanguageOptionText;
    this.type = CardType[cardObj.card_type as keyof typeof CardType];
    this.rarity = Rarity[cardObj.rarity as keyof typeof Rarity];
    this.illustrator = cardObj.illustrator;
    this.goldCost = cardObj.gold_cost;

    // Remove html from card text
    if (cardObj.card_text === {} as LanguageOptionText) {
      this.text = cleanCardText(cardObj.card_text);
    }
    if (cardObj.card_type.match(/Hero|Creep|Spell|Improvement|Item/)) {
      this.isPlayable = true;
    }
  }
  /** Set property */
  public set(props: { [key: string]: any }): Card {
    Object.assign(this, props);
    return this;
  }
}

function getColor(card: APICard): Color[] | undefined {
  let colors: Color[] = [];
  if (card.is_red) {
    colors = colors.concat(Color.Red);
  }
  if (card.is_black) {
    colors = colors.concat(Color.Black);
  }
  if (card.is_green) {
    colors = colors.concat(Color.Green);
  }
  if (card.is_blue) {
    colors = colors.concat(Color.Blue);
  }
  return colors.length === 0 ? undefined : colors;
}

/** Remove HTML from card text */
function cleanCardText(text: LanguageOptionText): LanguageOptionText {
  const cleanText = {};
  Object.entries(text).map((prop) => {
    const [key, value] = prop;
    const cleanValue = value.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, "");
    Object.assign(cleanText, { [key]: cleanValue });
  });
  return cleanText as LanguageOptionText;
}

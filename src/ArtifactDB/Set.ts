import { CardAPIObject, LanguageOptionText } from "@open-artifact/api-types";
import { Card } from "./Card";
export class Set {
  public name: LanguageOptionText;
  public id: number;
  public releaseDate?: string;
  public cards: Card[];
  constructor(apiObject: CardAPIObject) {
    this.name = apiObject.card_set.set_info.name as LanguageOptionText;
    this.id = apiObject.card_set.set_info.set_id;
    this.cards = apiObject.card_set.card_list.map((x) => new Card(x));
  }
}

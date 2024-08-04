import { randomUUID } from "crypto";
import { cloneDeep } from "lodash";

class Card {
  public id: string;

  public name: string;

  public description: string;

  public createdAt: Date;

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.id = randomUUID();
  }
  public clone():Card {
    return { ...this, createdAt: new Date(), id: randomUUID() };
  }
  public lodashClone():Card {
    const clonedCard = cloneDeep(this);
    clonedCard.name=clonedCard.name+' copy';
    clonedCard.id = randomUUID();
    clonedCard.createdAt = new Date();
    return clonedCard;
  }
}

export { Card };

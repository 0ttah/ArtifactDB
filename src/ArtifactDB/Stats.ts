export class Stats {
  public attack: number = 0;
  public health: number = 0;
  public armor: number = 0;
  constructor(stats: Stats) {
    Object.assign(this, stats);
  }
}

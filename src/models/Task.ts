export class Task {
  constructor(id: string, title: string, motivation: string) {
    this.id = id;
    this.title = title;
    this.motivation = motivation;
  }
  public id!: string;
  public title!: string;
  public motivation!: string;
  public done!: boolean;
  public feeling!: number;
  public startDate!: Date;
  public endDate!: Date;
}

export class ProjectEntity {
  constructor(
    public readonly title: string,
    public readonly minimumScore: number,
    public readonly description: string,
  ) {}
}

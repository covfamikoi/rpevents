export default class PublicConference {
  id!: number;
  title!: string;

  static fromJson(json: Object): PublicConference {
    return Object.assign(new PublicConference(), json);
  }

  static cached(): Array<PublicConference> | null {
    return null;
  }

  static async fetch(): Promise<Array<PublicConference>> {
    return [PublicConference.fromJson({ id: 1, title: "Covfamikoi" })];
  }

  static async get(): Promise<Array<PublicConference>> {
    // todo: invalidate cache
    let cached = this.cached();
    if (cached !== null) {
      return cached;
    }

    return this.fetch();
  }
}

export class PostClass {
  comment: string;
  userId: string;
  id?:string;
  timestamp: string;

  constructor(comment: string, userId: string, timestamp: string, id?: string) {
    this.comment = comment;
    this.userId = userId;
    this.id = id;
    this.timestamp = timestamp;
  }
}

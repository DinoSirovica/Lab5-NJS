export class PostClass {
  comment: string;
  userId: string;
  id:string;
  date: string;
  isEditing: boolean;

  constructor(comment: string, userId: string, id: string, date: string, isEditing: boolean) {
    this.comment = comment;
    this.userId = userId;
    this.id = id;
    this.date = date;
    this.isEditing = isEditing;
  }
}

export class UserInfo {
  userid: number;
  username: string;
  password: string;
  description: string;

  getFullName(): string {
    return this.userid + ' ' + this.username;
  }

}

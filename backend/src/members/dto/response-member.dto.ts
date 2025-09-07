import { Exclude, Expose } from 'class-transformer';

export class ResponseMemberDTO {
  @Expose()
  member_id: number;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}

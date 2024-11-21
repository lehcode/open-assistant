import { IAuthCredentials } from "@libs/shared";
import { Field, ID, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export class AuthResult implements IAuthCredentials {
  @Field(() => ID)
  userId!: number;
  
  @Field()
  userName!: string;

  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}

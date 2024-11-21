import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class GqlUser {
  @Field(() => ID)
  id!: string;

  @Field()
  username!: string;
}

import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
@ApiOkResponse()
export class ResponsePairWithProject {
  @ApiProperty({
    description: "Final Pro's score",
  })
  score: number;

  @ApiProperty({
    description:
      "The project that the Pro will be allocated to, if any. Null if he doesn't have enough score",
  })
  selected_project: string | null;

  @ApiProperty({
    description:
      "The projects that the Pro is eligible to be allocated to, if any. Empty if he doesn't have enough score",
  })
  eligible_projects: string[];

  @ApiProperty({
    description:
      "The projects that the Pro is not eligible to be allocated to, if any. Empty if he doesn't have enough score",
  })
  ineligible_projects: string[];
}

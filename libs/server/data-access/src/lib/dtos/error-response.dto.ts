import { ApiProperty } from '@nestjs/swagger';
import { IApiErrorResponse } from '@quantalys/shared/domain';

export class ErrorResponseDto implements IApiErrorResponse {
  @ApiProperty({
    type: String,
  })
  message!: string;

  @ApiProperty({
    type: String,
  })
  error!: string;
}

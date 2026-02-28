import { IsString, IsInt, IsPositive, IsNotEmpty, IsIn } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['solo', 'partner', 'group'])
  type: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  length: number;

  @IsNotEmpty()
  @IsString()
  instructor: string;
}

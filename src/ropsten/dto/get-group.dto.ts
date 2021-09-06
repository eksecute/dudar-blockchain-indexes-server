import { IsNumber, Min, Max } from 'class-validator';
import IsUint256 from '../../common/validations/IsUint256'

export default class GetGroupDto{
  @IsUint256({message: "Id must be uint256"})
  id: number
}
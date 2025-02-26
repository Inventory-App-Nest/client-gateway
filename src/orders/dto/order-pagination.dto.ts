import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDTO } from '../../common/dto/pagination.dto';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class OrderPaginationDto extends PaginationDTO {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Valid status are ${OrderStatusList}`,

    })
    status: OrderStatus;
}

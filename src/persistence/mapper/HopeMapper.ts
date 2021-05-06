import { AxiosResponse } from 'axios';
import { IHope } from '@/entities/IHope';
import dayjs from 'dayjs'

export const HopeMapper = (res: AxiosResponse) => {
    const { data } = res;
    return data.map((data: any) => 
        new IHope(
            data._id,
            data.from,
            data.to,
            data.hope,
            dayjs(data.createdAt).format('YYYY-MMMM-DD')
        )
    );
}
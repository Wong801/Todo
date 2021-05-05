import { AxiosResponse } from 'axios';
import { ITodo } from '@/entities/ITodo';
import dayjs from 'dayjs'

export const TodoMapper = (res: AxiosResponse) => {
    const { data } = res;
    return data.map((data: any) => 
        new ITodo(
            data._id,
            data.title,
            data.desc,
            data.isCompleted,
            dayjs(data.createdAt).format('YYYY-MMMM-DD')
        )
    );
}
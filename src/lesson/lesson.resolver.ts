import { Resolver, Query } from "@nestjs/graphql";
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver 
{
    @Query(returns => LessonType)
    lesson() 
    {
        return {
            id: '123456789',
            name: 'Math Class',
            startDate: (new Date()).toISOString(),
            endDate: (new Date()).toISOString()
        };
    }
}
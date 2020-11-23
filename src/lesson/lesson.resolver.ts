import { Resolver, Query, Mutation, Args, Parent, ResolveField } from "@nestjs/graphql";
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver 
{
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService)
    {}

    @Query(returns => [LessonType])
    lessons() 
    {
        return this.lessonService.getLessons();
    }

    @Query(returns => LessonType)
    lesson( @Args('id') id: string) 
    {
        return this.lessonService.getLesson(id);
    }

    @Mutation(returns => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput)
    {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(@Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput)
    {
        return this.lessonService.assignStudentsToLesson(assignStudentsToLessonInput);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson)
    {
        //console.log(lesson)
        return this.studentService.getManyStudents(lesson.students);
    }
}
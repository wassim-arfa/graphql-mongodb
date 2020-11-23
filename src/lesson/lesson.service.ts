import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
    constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>)
    {}

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson>
    {
        const {name, startDate, endDate} = createLessonInput;
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students: []
        });
        return this.lessonRepository.save(lesson);
    }

    async getLesson(id: string): Promise<Lesson>
    {
        return this.lessonRepository.findOne({id});
    }

    async getLessons(): Promise<Lesson[]>
    {
        return this.lessonRepository.find();
    }

    async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput):Promise<Lesson>
    {
        const { lessonId, studentsIds } = assignStudentsToLessonInput;
        const lesson = await this.lessonRepository.findOne({id: lessonId});
        lesson.students = [...lesson.students, ...studentsIds];
        lesson.students = [...new Set(lesson.students)];
        return this.lessonRepository.save(lesson);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>)
    {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student>
    {
        const {firstName, lastName} = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });
        return this.studentRepository.save(student);
    }
}
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateStudentInput } from "./student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver 
{
    constructor(private studentService: StudentService)
    {}

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput)
    {
        return this.studentService.createStudent(createStudentInput);
    }
}
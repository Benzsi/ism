import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly db: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.db.courses.create({ 
      data:{
        name: createCourseDto.name,
        type: createCourseDto.type,
        length: createCourseDto.length,
        instructor: createCourseDto.instructor,
      },
    });
  }

 async findAll() {
    return this.db.courses.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        length: true,
        instructor: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  async apply(courseId: number) {
    // 1. Megkeressük a kurzust
    const course = await this.db.courses.findUnique({
      where: { id: courseId },
      select: { id: true, length: true },
    });

    // 2. Ha nincs ilyen kurzus -> 404 Not Found
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // 3. Kiszámoljuk az árat: length * 500
    const price = course.length * 500;

    // 4. Létrehozzuk az új application rekordot
    const application = await this.db.applications.create({
      data: {
        course_id: courseId,
        price: price,
      },
      select: {
        id: true,
        course_id: true,
        price: true,
      },
    });

    // 5. Visszaadjuk a választ
    return application;
  }
}

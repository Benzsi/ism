import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
	const courses = await prisma.courses.findMany({ select: { id: true } });
	console.log(`Talált kurzusok száma: ${courses.length}`);
	console.log('Kurzusok:', courses);
	
	if (courses.length === 0) {
		throw new Error('Nincs elérhető kurzus az adatbázisban!');
	}

	const applicationsData = Array.from({ length: 15 }).map(() => ({
		course_id: courses[Math.floor(Math.random() * courses.length)].id,
		price: Math.floor(Math.random() * 20000) + 5000,
	}));

	await prisma.applications.createMany({ data: applicationsData });
	console.log('15 véletlen applications rekord beszúrva!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});



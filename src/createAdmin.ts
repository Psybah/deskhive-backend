import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as inquirer from 'inquirer';

const prisma = new PrismaClient();

async function main() {
    try {
        const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Enter Admin email:',
        },
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter firstname:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter lastname:',
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter password:',
        }
        ]);


        // Hash the password
        const hashedPassword = await bcrypt.hash(userInput.password, 10);

        const Admin = await prisma.user.create({
            data: {
                email: userInput.email,
                firstName: userInput.firstName,
                lastName: userInput.lastName,
                password: hashedPassword,
                role: 'ADMIN',
                isVerified: true,
            },
        });

        console.log(Admin)

        console.log("ADMIN created successfully");
    } catch (error) {
        console.error('Error creating ADMIN:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

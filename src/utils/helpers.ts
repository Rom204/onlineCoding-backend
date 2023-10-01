import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const fetchCodeAllCodeProblems = async () => {
    try { 
        const codeProblems = await prisma.code.findMany();
        console.dir(codeProblems);
        return codeProblems;
    } catch (error) {
        console.log(error);
    }
};
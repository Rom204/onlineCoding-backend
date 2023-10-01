import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const fetchCodeAllCodeProblems = async () => {
    const codeProblems = await prisma.code.findMany();
    console.dir(codeProblems);
    return codeProblems;
};
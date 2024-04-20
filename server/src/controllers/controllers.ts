import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function createEmployee(req: Request, res: Response) {
  try {
    //Check if employee already exists
    let employee = await prisma.employee.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (employee) {
      res.status(409).send('Employee with this email already exists');
    } else {
      employee = await prisma.employee.create({ data: req.body });
      console.log(employee);
      res.status(200).send(employee);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating the employee.');
  }
}

export async function getEmployees(req: Request, res: Response) {
  try {
    const employees = await prisma.employee.findMany();
    res.send(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching employees');
  }
}

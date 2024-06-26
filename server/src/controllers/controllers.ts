import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

//Get employees, all if no queries, else search by query in url
export async function getEmployees(req: Request, res: Response) {
  const { search, dep, position } = req.query;
  if (dep) {
    try {
      const employees = await prisma.employee.findMany({
        where: {
          department: decodeURI(dep as string),
        },
      });
      res.send(employees);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching employees');
    }
  } else if (position) {
    try {
      const employees = await prisma.employee.findMany({
        where: {
          position: decodeURI(position as string),
        },
      });
      res.send(employees);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching employees');
    }
  } else if (search) {
    const str = (search as string).split(' ').join();
    try {
      const employees = await prisma.employee.findMany({
        orderBy: {
          _relevance: {
            fields: ['firstName', 'lastName', 'department', 'position'],
            search: str,
            sort: 'desc',
          },
        },
      });
      res.send(employees);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching employees');
    }
  } else {
    try {
      const employees = await prisma.employee.findMany();
      res.send(employees);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching employees');
    }
  }
}

export async function updateEmployee(req: Request, res: Response) {
  const { id } = req.params;
  const numId = parseInt(id);
  try {
    const employee = await prisma.employee.update({
      where: {
        id: numId,
      },
      data: req.body,
    });
    res.status(200).send(employee);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).send('Employee with this ID does not exist');
    } else {
      console.error(error);
      res
        .status(500)
        .send(`An error occurred while updating employee with id ${numId}`);
    }
  }
}

export async function deleteEmployee(req: Request, res: Response) {
  const { id } = req.params;
  const numId = parseInt(id);
  try {
    await prisma.employee.delete({
      where: {
        id: numId,
      },
    });
    res.status(200).send('Employee deleted');
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).send('Employee with this ID does not exist');
    } else {
      console.error(error);
      res
        .status(500)
        .send(`An error occurred while deleting employee with id ${numId}`);
    }
  }
}

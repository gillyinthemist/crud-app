import { PlusIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import { addEmployee } from '../services/api-service';
import { Employee } from '../utils/types';

interface Props {
  reload: () => void;
}

const formState: Employee = {
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  salary: '',
  department: '',
};

export default function AddEmployeeModal({ reload }: Props) {
  const [modalData, setModalData] = useState(formState);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  async function handleSubmit() {
    onClose();

    await addEmployee(modalData);
    reload();
  }
  function handleClose() {
    onClose();
    setModalData(formState);
  }

  return (
    <>
      <Button onPress={onOpen}>
        New employee
        <PlusIcon width={25} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new employee
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="First name"
                  isRequired
                  name="firstName"
                  type="text"
                  label="First Name"
                  value={modalData.firstName}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }))
                  }
                />
                <Input
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Last name"
                  isRequired
                  value={modalData.lastName}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }))
                  }
                />

                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  isRequired
                  value={modalData.email}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
                <Input
                  name="position"
                  type="text"
                  label="position"
                  placeholder="Position"
                  isRequired
                  value={modalData.position}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      position: e.target.value,
                    }))
                  }
                />
                <Input
                  name="salary"
                  type=""
                  label="Salary"
                  placeholder="Salary"
                  isRequired
                  value={modalData.salary.toString()}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      salary: e.target.value,
                    }))
                  }
                />
                <Input
                  name="department"
                  type="text"
                  label="Department"
                  placeholder="Department"
                  isRequired
                  value={modalData.department}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      department: e.target.value,
                    }))
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" onPress={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

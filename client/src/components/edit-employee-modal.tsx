import { PencilIcon } from '@heroicons/react/24/outline';
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
import { useEffect, useState } from 'react';
import { updateEmployee } from '../services/api-service';
import { Employee } from '../utils/types';
import { Key } from '@react-types/shared';

interface Props {
  reload: () => void;
  selectedKeys: Iterable<Key> | 'all' | undefined;
  employee: Employee;
}

export default function EditEmployeeModal({
  reload,
  selectedKeys,
  employee,
}: Props) {
  const [modalData, setModalData] = useState(employee);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    setModalData(employee);
  }, [employee]);
  async function handleUpdate() {
    onClose();
    await updateEmployee(modalData);
    reload();
  }
  function handleClose() {
    onClose();
  }

  return (
    <>
      <Button onPress={onOpen} isDisabled={!selectedKeys ? true : false}>
        Edit <PencilIcon width={20} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Employee
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
                <Button color="primary" type="submit" onPress={handleUpdate}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

export default function FilterButtons() {
  return (
    <div className="flex items-center gap-3 flex-row">
      <p>Filter:</p>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Position</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem>Full Stack Developer</DropdownItem>
          <DropdownItem>Forward Metrics Administrator</DropdownItem>
          <DropdownItem>Director</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Department</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownItem>DX</DropdownItem>
          <DropdownItem>Sports</DropdownItem>
          <DropdownItem>Home</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

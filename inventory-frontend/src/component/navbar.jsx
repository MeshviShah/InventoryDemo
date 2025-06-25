import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import {
  AppShell,
  NavLink,
  Title,
  Text,
  Group,
  ScrollArea,
  Box,
  ActionIcon,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

export default function NavbarLayout() {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Group mb="md">
            <Title order={4} c="dimmed">Inventory App</Title>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea} mx="-md" px="md">
          <Box py="md">
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb="sm">
              Dashboards
            </Text>
            <NavLink
              label="Products"
              active
               leftSection={<FontAwesomeIcon icon={faBoxOpen} />}
              onClick={() => navigate('/Products')}
            />
          </Box>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        {/* Fixed mobile menu button */}
         <ActionIcon
          variant="subtle"
          size="lg"
          onClick={toggle}
          hiddenFrom="sm"
          style={{
            position: 'fixed',
            top: 16,
            right: 16, // Changed from left to right
            zIndex: 1000,
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </ActionIcon>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
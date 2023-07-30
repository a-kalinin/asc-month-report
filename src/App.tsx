import {
  AppShell, Flex, MantineProvider, Title,
} from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import React from 'react';

import Content from './components/Content/Content';
import themeOverride from './const/themeOverride';
import FormContextProvider from './context/FormContext';


function App() {
  return (
    <MantineProvider theme={themeOverride} withGlobalStyles withNormalizeCSS>
      <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}>
        <FormContextProvider>
          <AppShell
            header={(
              <Flex align="center">
                <Title order={2} m="md">
                  Отчет о проделанной работе
                </Title>
                <Title
                  color="dimmed"
                  m="md"
                  ml="auto"
                  order={4}
                >
                  Alma Services Company
                </Title>
              </Flex>
            )}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
          >
            <Content />
          </AppShell>
        </FormContextProvider>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;

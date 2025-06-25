import { notifications } from '@mantine/notifications';

export const notifySuccess = (message) => {
  notifications.show({
    title: 'Success',
    message,
    color: 'green',
  });
};

export const notifyError = (message) => {
  console.log("notification")
  notifications.show({
    title: 'Error',
    message,
    color: 'red',
  });
};

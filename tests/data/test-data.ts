const baseUrl = (
  process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com'
).replace(/\/+$/, '');

export const testData = {
  urls: {
    base: baseUrl,
    login: `${baseUrl}/web/index.php/auth/login`,
  },
  credentials: {
    username: process.env.TEST_USERNAME ?? 'Admin',
    password: process.env.TEST_PASSWORD ?? 'admin123',
  },
  newUser: {
    employeeSearchText: process.env.TEST_EMPLOYEE_SEARCH ?? 'joh',
    employeeName: process.env.TEST_EMPLOYEE_NAME ?? 'John Smith',
    username: process.env.TEST_NEW_USERNAME ?? 'john.smith',
    password: process.env.TEST_NEW_PASSWORD ?? 'Pdsfsdfa2348!',
    newUserName: 'john.smith1',
  },
};

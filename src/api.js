export const login = credentials =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          token: '123456',
          user: {
            name: 'Bruno',
            email: 'dev@brunobertolini.com',
          },
        },
      })
    }, 3000)
  })

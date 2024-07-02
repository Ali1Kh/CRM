import { z } from 'zod';

export const formSchema = z
  .object({
    passwordConfirm: z.string(),
    password: z
      .string()
      .min(8, 'Password must be of atleast 8 characters.')
      .superRefine((password, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
        const containsSpecialChar = (ch: string) =>
          /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
        let countOfUpperCase = 0,
          countOfLowerCase = 0,
          countOfNumbers = 0,
          countOfSpecialChar = 0;
        for (let i = 0; i < password.length; i++) {
          let ch = password.charAt(i);
          if (!isNaN(+ch)) countOfNumbers++;
          else if (containsUppercase(ch)) countOfUpperCase++;
          else if (containsLowercase(ch)) countOfLowerCase++;
          else if (containsSpecialChar(ch)) countOfSpecialChar++;
        }
        if (countOfLowerCase < 1)
          checkPassComplexity.addIssue({
            code: 'custom',
            message: 'Password does not have atleast 1 lowercase character.',
          });
        if (countOfUpperCase < 1)
          checkPassComplexity.addIssue({
            code: 'custom',
            message: 'Password does not have atleast 1 uppercase character.',
          });
        if (countOfSpecialChar < 1)
          checkPassComplexity.addIssue({
            code: 'custom',
            message: 'Password does not have atleast 1 special character.',
          });
        if (countOfNumbers < 1)
          checkPassComplexity.addIssue({
            code: 'custom',
            message: 'Password does not have atleast 1 number.',
          });
      }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['passwordConfirm'],
      });
    }
  });

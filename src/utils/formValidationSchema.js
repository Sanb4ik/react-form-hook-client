import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Project name required'),
  description: yup
    .string()
    .required('Description required')
    .max(50, 'Max length of description - 50 chars'),
  priority: yup.string().required(),
  status: yup.string().required(),
});

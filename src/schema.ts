import * as Yup from 'yup';

export interface Values {
  title: string;
  date: moment.Moment | null;
  timeRange: [moment.Moment, moment.Moment] | null;
  participants: string[];
  context: string;
  fileName: string;
}

export const initialValues: Values = {
  title: '',
  date: null,
  timeRange: null,
  participants: [],
  context: '',
  fileName: 'minutes.txt',
};

export const validationSchema = Yup.object({
  title: Yup.string(),
  date: Yup.string(),
  timeRange: Yup.array(),
  participants: Yup.array(),
  context: Yup.array(),
  fileName: Yup.string().required('Required'),
});

import * as Yup from 'yup';

export interface Values {
  title: string;
  date: moment.Moment | null;
  timeRange: [moment.Moment, moment.Moment] | null;
  participants: string;
  context: string;
}

export const initialValues: Values = {
  title: '',
  date: null,
  timeRange: null,
  participants: '',
  context: '',
};

export const validationSchema = Yup.object({
  title: Yup.string(),
  date: Yup.string(),
  timeRange: Yup.array(),
  participants: Yup.string(),
  context: Yup.array(),
});

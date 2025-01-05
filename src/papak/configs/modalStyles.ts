import { palettes } from './palettes';

export const modalStyles = {
  header: {
    marginBottom: 16,
    padding: '16px 24px',
    borderBottom: `1px solid ${palettes.gray[300]}`,
  },
  content: {
    padding: 0,
  },
  body: {
    padding: '24px 24px 0px 24px',
  },
  footer: {
    padding: '16px 24px',
    marginTop: 16,
    marginLeft: '-24px',
    marginRight: '-24px',
    borderTop: `1px solid ${palettes.gray[300]}`,
  },
};

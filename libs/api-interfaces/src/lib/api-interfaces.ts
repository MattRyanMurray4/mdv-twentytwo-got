export interface Character {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
}
export const emptyCharacter = {
  id: '',
  firstName: '',
  lastName: '',
  fullName: '',
  title: '',
  family: '',
  image: '',
  imageUrl: '',
};

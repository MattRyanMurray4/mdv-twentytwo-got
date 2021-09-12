export interface Character {
  $int32: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
}
export const emptyCharacter = {
  $int32: '',
  firstName: '',
  lastName: '',
  fullName: '',
  title: '',
  family: '',
  image: '',
  imageUrl: '',
};

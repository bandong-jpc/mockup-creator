export interface IProperty {
  key: string;
  id: string;
  value: string;
  class: string;
  style: string;
  typeObj: string;
  type: string;
  content?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  name?: string;
  link1?: string;
  link2?: string;
  link3?: string;
  checked?: string;
  tblRows?: number;
  tblCols?: number;
  tblArrayRow?: any;
  tblArrayCol?: any;
  tblContent?: [][];
  links?: number;
  linksArray?: any;
  linkValue?: string;
  linkContent?: [];
  updateCallback?: (row, col) => void;
}

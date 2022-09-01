import { FormGroup } from '@angular/forms';

export interface SingleForm {
  id: number;
  name: string;
  values: FormGroup<any>;
}

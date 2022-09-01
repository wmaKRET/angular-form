import { FormGroup } from '@angular/forms';

interface Description {
  marketingName: string;
  technicalName: string;
  description: string;
}

interface Conditions {
  portal: string;
  type: string;
  benefitAmount: string;
  startDate: string;
  finishDate: string;
  pricing: string;
  combinePromotions: boolean;
  backPromotion: boolean;
}

export interface FormValues {
  description: Description;
  conditions: Conditions;
}

export interface FormObj {
  id: number;
  name: string;
  values: FormGroup<any>;
}

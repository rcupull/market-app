export type PaymentPlanType = 'free' | 'beginner' | 'professional' | 'company';
export type PaymentPlanStatus = 'current' | 'validatingPurchase' | 'historical';

export interface PaymentPlan {
  type: PaymentPlanType;
  price: number; //CUP
  trialTime: number | null; // days for free plan
  //
  maxBussinessByUser: number;
  maxPostsByBussiness: number;
  maxImagesByPosts: number;
  maxImagesByBusinessBanner?: number;
}

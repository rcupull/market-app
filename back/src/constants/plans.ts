import { PaymentPlan, PaymentPlanType } from "../types/general";

const freePlan: PaymentPlan = {
  type: "free",
  price: 0,
  trialTime: null,
  maxBussinessByUser: 2,
  maxPostsByBussiness: 20,
  maxImagesByPosts: 3,
  maxImagesByBusinessBanner: 1,
};

const beginnerPlan: PaymentPlan = {
  type: "beginner",
  price: 300,
  trialTime: 30,
  maxBussinessByUser: 2,
  maxPostsByBussiness: 100,
  maxImagesByPosts: 5,
  maxImagesByBusinessBanner: 3,
};

const professionalPlan: PaymentPlan = {
  type: "professional",
  price: 1000,
  trialTime: 30,
  maxBussinessByUser: 5,
  maxPostsByBussiness: 300,
  maxImagesByPosts: 7,
  maxImagesByBusinessBanner: 5,
};

const companyPlan: PaymentPlan = {
  type: "company",
  price: 2000,
  trialTime: 30,
  maxBussinessByUser: 10,
  maxPostsByBussiness: 500,
  maxImagesByPosts: 10,
  maxImagesByBusinessBanner: 10,
};

export const paymentPlans: Record<PaymentPlanType, PaymentPlan> = {
  free: freePlan,
  beginner: beginnerPlan,
  professional: professionalPlan,
  company: companyPlan,
};

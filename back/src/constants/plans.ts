import { PaymentPlan, PaymentPlanType } from "../types/general";

const freePlan: PaymentPlan = {
  type: "free",
  price: 0,
  trialTime: null,
  maxBussinessByUser: 1,
  maxPostsByBussiness: 5,
  maxImagesByPosts: 1,
  maxImagesByBusinessBanner: 1,
};

const beginnerPlan: PaymentPlan = {
  type: "beginner",
  price: 200,
  trialTime: 30,
  maxBussinessByUser: 5,
  maxPostsByBussiness: 200,
  maxImagesByPosts: 1,
  maxImagesByBusinessBanner: 3,
};

const professionalPlan: PaymentPlan = {
  type: "professional",
  price: 1000,
  trialTime: 30,
  maxBussinessByUser: 5,
  maxPostsByBussiness: 1000,
  maxImagesByPosts: 1,
  maxImagesByBusinessBanner: 10,
};

const companyPlan: PaymentPlan = {
  type: "company",
  price: 2000,
  trialTime: 30,
  maxBussinessByUser: 20,
  maxPostsByBussiness: 5000,
  maxImagesByPosts: 10,
  maxImagesByBusinessBanner: 20,
};

export const paymentPlans: Record<PaymentPlanType, PaymentPlan> = {
  free: freePlan,
  beginner: beginnerPlan,
  professional: professionalPlan,
  company: companyPlan,
};

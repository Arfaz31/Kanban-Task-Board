import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import {
  setCurrentStep,
  setUserInfo,
  setOrganizationInfo,
  setSelectedPlan,
  completeOnboarding,
} from "../redux/slices/onboardingSlice";

interface FormData {
  name: string;
  email: string;
  workspaceName: string;
  plan: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.onboarding);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      workspaceName: "",
      plan: "",
    },
  });

  const watchedValues = watch();

  const handleNext = (data: FormData) => {
    if (currentStep === 1) {
      dispatch(setUserInfo({ name: data.name, email: data.email }));
      dispatch(setCurrentStep(2));
    } else if (currentStep === 2) {
      dispatch(setOrganizationInfo({ workspaceName: data.workspaceName }));
      dispatch(setCurrentStep(3));
    } else if (currentStep === 3) {
      dispatch(setSelectedPlan(data.plan));
      dispatch(completeOnboarding());
      toast.success("Welcome! Your account has been set up successfully.");
      setTimeout(() => navigate("/"), 1000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          watchedValues.name &&
          watchedValues.email &&
          !errors.name &&
          !errors.email
        );
      case 2:
        return watchedValues.workspaceName && !errors.workspaceName;
      case 3:
        return watchedValues.plan;
      default:
        return false;
    }
  };

  const progress = ((currentStep - 1) / 2) * 100;

  const plans = [
    { id: "free", name: "Free", price: "$0/month" },
    { id: "pro", name: "Pro", price: "$19/month" },
    { id: "enterprise", name: "Enterprise", price: "$49/month" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(handleNext)}>
          {/* Step 1: User Info */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Welcome! Let's get started
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    })}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Organization Info */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Setup your workspace
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workspace Name
                </label>
                <input
                  {...register("workspaceName", {
                    required: "Workspace name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter workspace name"
                />
                {errors.workspaceName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.workspaceName.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Plan Selection */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Choose your plan
              </h2>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`block border rounded-lg p-4 cursor-pointer transition-all ${
                      watchedValues.plan === plan.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      {...register("plan", {
                        required: "Please select a plan",
                      })}
                      type="radio"
                      value={plan.id}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">
                        {plan.name}
                      </h3>
                      <span className="text-lg font-bold text-blue-600">
                        {plan.price}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isStepValid()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 3 ? "Complete Setup" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;

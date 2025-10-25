import { useRouteError, Link } from "react-router-dom";
import { MdHome, MdRefresh } from "react-icons/md";

interface RouteError {
  statusText?: string;
  message?: string;
  status?: number;
}

const ErrorPage = () => {
  const error = useRouteError() as RouteError;

  const getErrorDetails = () => {
    if (error?.status === 404) {
      return {
        code: "404",
        title: "Page Not Found",
        description:
          "The page you're looking for doesn't exist or has been moved.",
      };
    }

    return {
      code: "Error",
      title: "Something Went Wrong",
      description:
        error?.statusText ||
        error?.message ||
        "An unexpected error occurred. Please try again.",
    };
  };

  const { code, title, description } = getErrorDetails();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-200 mb-2">{code}</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3
                     bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     transition-colors duration-200 font-medium"
          >
            <MdHome size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3
                     border-2 border-gray-300 text-gray-700 rounded-lg
                     hover:border-gray-400 hover:bg-gray-50
                     transition-colors duration-200 font-medium"
          >
            <MdRefresh size={20} />
            Refresh Page
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-sm text-gray-400">
          If this problem persists, please contact support.
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

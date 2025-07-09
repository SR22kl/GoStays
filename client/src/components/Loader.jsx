import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loader = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [nextUrl]);

  return (
    <div className="flex items-center justify-center md:min-h-screen min-h-[85vh]">
      {/* Spinner element */}
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-20 mt-30 md:mt-20"></div>
    </div>
  );
};

export default Loader;

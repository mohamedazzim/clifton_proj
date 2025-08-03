import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { BackToTopButton } from "../components/BackToTopButton";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Navigation />
      <div className="flex items-center justify-center pt-32 pb-20 px-5">
        <Card className="w-full max-w-md mx-4 glass glass-enhanced backdrop-blur-xl shadow-2xl border border-white/20">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 items-center justify-center text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              The page you're looking for doesn't exist.
            </p>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Go Home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      <BackToTopButton />
    </div>
  );
}

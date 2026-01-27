import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-100/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-100/50 rounded-full blur-[100px] -z-10" />

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2 text-sm">Sign in to your account</p>
        </div>
        <div className="
          [&_button[type='submit']]:!bg-indigo-600 
          [&_button[type='submit']]:!text-white 
          [&_button[type='submit']]:font-bold
          [&_button[type='submit']]:hover:!bg-indigo-700
          [&_input]:!text-slate-900
          [&_input]:!bg-white
          [&_input]:!border-slate-200
          [&_label]:!text-slate-700
        ">
           <SignIn/>
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {

      const params = useSearchParams();

      const handleGoogleSignIn = async () => {
            const result = await signIn('google', { callbackUrl: params.get("callbackUrl") || "/", redirect: false });

            if (result?.ok) {
                  toast.success('Signed in successfully!');
            } else {
                  toast.error('Failed to sign in with Google.');
            }
      }

      return (
            <div>
                  <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
                        <FcGoogle className="text-lg" />
                        Sign in with Google
                  </button>
            </div>
      );
};

export default GoogleButton;